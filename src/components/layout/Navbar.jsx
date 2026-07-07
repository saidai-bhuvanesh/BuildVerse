"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Projects", path: "/projects" },
  { name: "Contribute", path: "/#contribute" },
  { name: "Add Project", path: "https://github.com/MistryVishwa/BuildVerse/issues" },
  { name: "Contributors", path: "/contributors" },
  { name: "FAQ", path: "/faq" },
  { name: "About", path: "/#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="BuildVerse Logo" style={{ width: 28, height: 28, borderRadius: 6 }} />
          <span className="text-gradient">BuildVerse</span>
        </Link>

        <nav className={styles.desktopNav}>
          {navLinks.map((link) => {
            const isHashLink = link.path.includes('#');
            const isActive = pathname === link.path || (pathname === '/' && isHashLink);
            
            const linkProps = {
              key: link.path,
              className: `${styles.navLink} ${pathname === link.path ? styles.active : ""}`,
              ...(link.path.startsWith('http') && { target: "_blank", rel: "noreferrer" })
            };

            if (isHashLink) {
              return (
                <a href={link.path} {...linkProps}>
                  {link.name}
                </a>
              );
            }

            return (
              <Link 
                href={link.path}
                {...linkProps}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div layoutId="navbar-indicator" className={styles.activeIndicator} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <a href="https://github.com/MistryVishwa/BuildVerse" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <FaGithub size={18} />
            <span>Github</span>
          </a>
          
          <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={styles.mobileNav}
        >
          {navLinks.map((link) => {
            const isHashLink = link.path.includes('#');
            if (isHashLink) {
              return (
                <a 
                  key={link.path} 
                  href={link.path}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </motion.div>
      )}
    </header>
  );
}
