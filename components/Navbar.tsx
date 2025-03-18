'use client';

import Image from 'next/image';
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image 
              src="/assets/logo.jpg" 
              alt="Diet Planner Icon" 
              width={24}
              height={24}
            className="object-contain"
          />
            <span className="text-contrast text-2xl font-bold">Simple Diet Planner</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/vgnshiyer/simple-diet-planner/issues" target="_blank">
            <FaGithub className="text-contrast text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
