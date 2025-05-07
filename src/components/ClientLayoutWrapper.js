"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import useMobile from "@/hook/useMobile";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/dashboard");
  const isMobile = useMobile();

  return (
    <>
      <Toaster
        position={isMobile ? "top-center" : "bottom-right"}
        duration={3000}
        closeButton
        richColors
        gutter={8}
      />
      {!isHidden && <Header />}
      <main>{children}</main>
      {!isHidden && <Footer />}
    </>
  );
}
