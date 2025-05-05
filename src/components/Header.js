import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";

export default function Header() {
  return (
    <header className="px-7 md:px-16 lg:px-24 py-2 bg-white shadow">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} alt="City University logo" className="w-40" />
        </Link>
        <nav>{/* Add navigation items here */}</nav>
      </div>
    </header>
  );
}
