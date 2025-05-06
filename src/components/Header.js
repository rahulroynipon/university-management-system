"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import navItem from "@/data/navitem.json";
import useMobile from "@/hook/useMobile";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Overlay from "./ui/Overly";
import { cn } from "@/lib/cn";
import ActiveLink from "./ui/ActiveLink";

export default function Header() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" bg-white shadow sticky top-0 z-50">
      <div className="flex items-center justify-between px-7 md:px-16 lg:px-32 py-2 width">
        <Link href="/">
          <Image
            src={Logo}
            alt="City University logo"
            priority
            className="w-40"
          />
        </Link>

        {isMobile ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer"
          >
            <AiOutlineMenu className="text-red-800" />
          </button>
        ) : null}

        <Overlay isOpen={isOpen && isMobile} onClose={() => setIsOpen(false)} />

        {isMobile ? (
          <nav
            className={cn(
              "fixed padding top-0 left-0 w-[15rem] sm:w-[20rem] h-screen bg-[#1F1F1F] text-white transition-transform duration-300 ease-in-out z-50",
              isOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <ul className="space-y-6 p-4">
              {navItem.map((item, index) => (
                <li key={index} onClick={() => setIsOpen(false)}>
                  <ActiveLink
                    href={item.link}
                    className="font-medium pb-1 text-lg"
                    activeClassName="border-b-4 border-red-800"
                  >
                    {item.name}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="flex gap-8">
              {navItem.map((item, index) => (
                <li key={index}>
                  <ActiveLink
                    href={item.link}
                    className="font-medium text-lg"
                    activeClassName="text-red-800"
                  >
                    {item.name}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
