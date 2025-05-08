import DashboardNav from "./DashboardNav";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import DashboardHeader from "./DashboardHeader";
import DrawerLabel from "./DrawerLabel";

export default function DashboardLayoutWrapper({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-[15rem] flex flex-col gap-7 py-7 border-r border-gray-200">
        <div className="px-14">
          <Link href="/">
            <Image src={Logo} alt="City University logo" priority />
          </Link>
        </div>
        <DashboardNav />
      </div>
      <div className="flex-1 h-screen bg-[#f7f6f5] overflow-y-auto">
        <div className="sticky top-0 z-50 border-b border-gray-200 px-10 py-3 bg-white">
          <DashboardHeader />
        </div>
        <main className=" w-full px-10 py-5">
          <DrawerLabel />
          {children}
        </main>
      </div>
    </div>
  );
}
