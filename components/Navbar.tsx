'use client';

import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-contrast text-2xl font-bold">Diet Tracker</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/vgnshiyer" target="_blank">
            <FaGithub className="text-contrast text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
