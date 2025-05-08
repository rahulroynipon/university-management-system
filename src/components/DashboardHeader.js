"use client";

import useAuthStore from "@/store/authStore";
import Image from "next/image";
import { useEffect } from "react";
import avatarPlaceholder from "@/assets/avatar-placeholder.jpg";

function DashboardHeader() {
  const { user, getUserHandler } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      await getUserHandler();
    };

    fetchUser();
  }, []);

  return (
    <header className="flex justify-between w-full items-center space-x-10">
      <h1 className="text-xl font-medium italic text-nowrap">
        <span className="capitalize">{user?.role}</span> Dashboard
      </h1>
      <div className="flex items-center gap-2">
        <Image
          src={user?.avatar?.url || avatarPlaceholder}
          alt="user"
          priority
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="leading-4">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
