"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome } from "react-icons/fa";

function DrawerLabel() {
  const pathname = usePathname();

  const pathList = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    segments.splice(1, 1);
    return segments;
  }, [pathname]);

  return (
    <div>
      <ul className="flex items-center gap-2 text-gray-800 mb-4 font-medium">
        <li className="flex items-center gap-2">
          <FaHome />
          <span>/</span>
        </li>
        {pathList.map((path, index) => (
          <li key={index} className="flex items-center gap-2 capitalize">
            {path}
            {index !== pathList.length - 1 && <span>/</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrawerLabel;
