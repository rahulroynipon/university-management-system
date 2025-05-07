"use client";

import adminNav from "@/data/adminNav.json";
import teacherNav from "@/data/teacherNav.json";
import studentNav from "@/data/studentNav.json";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import ActiveLink from "./ui/ActiveLink";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutHandler, getUserHandler, isSuccess, isLoading } =
    useAuthStore();

  const role = useMemo(() => {
    const segments = pathname.split("/");
    if (segments[1] === "dashboard" && segments.length >= 3) {
      return segments[2];
    }
    return null;
  }, [pathname]);

  const navItems = useMemo(() => {
    if (role === "admin") return adminNav;
    if (role === "teacher") return teacherNav;
    if (role === "student") return studentNav;
    return [];
  }, [role]);

  const logout = async () => {
    await logoutHandler();
  };

  useEffect(() => {
    if (isSuccess.logout) {
      router.push("/login");
    }
  }, [isSuccess]);

  useEffect(async () => {
    await getUserHandler();
  }, []);

  return (
    <nav className="h-full flex flex-col justify-between">
      <ul>
        {navItems?.map((item, index) => (
          <li key={index}>
            <ActiveLink
              href={item.link}
              className="block px-10 py-3 hover:bg-black/10 transition-colors duration-200"
              activeClassName="text-red-600 bg-red-100 hover:bg-red-100 border-r-4"
            >
              {item.name}
            </ActiveLink>
          </li>
        ))}
      </ul>

      <button
        onClick={logout}
        disabled={isLoading.logout}
        className="cursor-pointer border-r-4 border-black/50 px-10 py-3 text-left mb-5 bg-black/5 hover:bg-black/10 hover:border-black transition-colors duration-200"
      >
        {isLoading.logout ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
}
