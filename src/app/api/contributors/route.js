import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Fetch dynamic data from GitHub with caching
    const [pullsRes, commitsRes] = await Promise.all([
      fetch('https://api.github.com/repos/MistryVishwa/BuildVerse/pulls?state=closed&per_page=100', { 
        next: { revalidate: 300 } // Cache for 5 minutes
      }),
      fetch('https://api.github.com/repos/MistryVishwa/BuildVerse/commits?per_page=100', { 
        next: { revalidate: 300 } // Cache for 5 minutes
      })
    ]);

    if (!pullsRes.ok) throw new Error('Failed to fetch pulls from GitHub API');
    if (!commitsRes.ok) throw new Error('Failed to fetch commits from GitHub API');

    const githubPulls = await pullsRes.json();
    const githubCommits = await commitsRes.json();

    const uniqueContributors = new Map(); // Maps username to contributor object
    const prsMap = {}; // Maps username to merged PR count
    const commitsMap = {}; // Maps username to commit count

    // Aggregate merged PRs
    for (const pr of githubPulls) {
      // Only count if it's actually merged
      if (pr.merged_at === null || !pr.user) continue;

      const username = pr.user.login.toLowerCase();
      prsMap[username] = (prsMap[username] || 0) + 1;
      
      if (!uniqueContributors.has(username)) {
        uniqueContributors.set(username, {
          id: pr.user.id,
          login: pr.user.login,
          avatar_url: pr.user.avatar_url,
          html_url: pr.user.html_url
        });
      }
    }

    // Aggregate Commits
    for (const c of githubCommits) {
      let username = null;
      
      if (c.author && c.author.login) {
        username = c.author.login.toLowerCase();
        if (!uniqueContributors.has(username)) {
          uniqueContributors.set(username, {
            id: c.author.id,
            login: c.author.login,
            avatar_url: c.author.avatar_url,
            html_url: c.author.html_url
          });
        }
      } else if (c.commit && c.commit.author) {
        // Fallback for unlinked emails (e.g. saidai-bhuvanesh)
        const nameMatch = c.commit.author.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        // Check if this matches any known PR author
        for (const knownUser of uniqueContributors.keys()) {
          const knownNormalized = knownUser.replace(/[^a-z0-9]/g, '');
          if (nameMatch.includes(knownNormalized) || knownNormalized.includes(nameMatch)) {
            username = knownUser;
            break;
          }
        }
      }

      if (username) {
        commitsMap[username] = (commitsMap[username] || 0) + 1;
      }
    }

    // 3. Scan local projects to count authored projects
    const projectsDir = path.join(process.cwd(), 'projects');
    const projectsMap = {}; // Maps github username to count

    if (fs.existsSync(projectsDir)) {
      const folders = fs.readdirSync(projectsDir);
      for (const folder of folders) {
        const jsonPath = path.join(projectsDir, folder, 'project.json');
        if (fs.existsSync(jsonPath)) {
          try {
            const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            if (data.author && data.author.github) {
              const username = data.author.github.toLowerCase();
              projectsMap[username] = (projectsMap[username] || 0) + 1;
            }
          } catch (e) {
            console.error('Error parsing project config', e);
          }
        }
      }
    }

    // 4. Aggregate data and calculate score
    const contributors = Array.from(uniqueContributors.values()).map((c) => {
      const username = c.login.toLowerCase();
      const projectsCount = projectsMap[username] || 0;
      const prsCount = prsMap[username] || 0;
      const commitsCount = commitsMap[username] || 0;
      
      // Basic scoring algorithm
      // Commits are worth 10 points, each published project is worth 50 points, each PR is worth 20 points
      const score = (commitsCount * 10) + (projectsCount * 50) + (prsCount * 20);

      return {
        id: c.id,
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        commits: commitsCount,
        projects: projectsCount,
        prs: prsCount,
        score: score
      };
    });

    // 5. Sort by score descending
    contributors.sort((a, b) => b.score - a.score);

    return NextResponse.json(contributors);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch contributors' }, { status: 500 });
  }
}
