"use client";
import React from "react";
import Link from "next/link";
import { useAstraContext } from "@/context/AstraContext";
import { usePathname } from "next/navigation"; // Import usePathname

const SubNavlink = ({ href, children }) => {
  const { isMobileNavOpen, setIsMobileNavOpen } = useAstraContext();
  const pathname = usePathname(); // Get the current URL pathname

  const isActive = pathname === href;

  const handleLinkClick = () => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
    }
  };

  return (
    <Link
      href={href}
      className={isActive ? "active" : ""}
      onClick={handleLinkClick}
    >
      {children}
    </Link>
  );
};

export default SubNavlink;
