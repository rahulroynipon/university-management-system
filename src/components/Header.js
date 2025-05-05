"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import navItem from "@/data/navitem.json";
import useMobile from "@/hook/useMobile";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-7 md:px-16 lg:px-24 py-2 bg-white shadow sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} alt="City University logo" className="w-40" />
        </Link>

        {isMobile ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer"
          >
            <AiOutlineMenu className="text-red-800" />
          </button>
        ) : (
          ""
        )}

        {isMobile ? (
          <ul className="fixed"></ul>
        ) : (
          <nav>
            <ul className="flex gap-8">
              {navItem.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
