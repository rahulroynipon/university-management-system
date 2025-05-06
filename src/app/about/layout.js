import ActiveLink from "@/components/ui/ActiveLink";

export const metadata = {
  title: "About | City University",
  description:
    "Learn more about City University's mission, vision, and values.",
  keywords: [
    "About City University",
    "City University mission",
    "City University vision",
    "City University values",
    "University culture",
    "Educational goals",
    "Higher education Bangladesh",
    "Academic excellence",
    "University history",
  ],
};

const aboutRoutes = [
  { name: "History", href: "/about" },
  { name: "Vision & Mission", href: "/about/vision-mission" },
  { name: "Convocation", href: "/about/convocation" },
  { name: "Campus Life", href: "/about/campus-life" },
];

export default function Layout({ children }) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 padding width">
      <nav className="w-full md:w-fit lg:w-[15rem]">
        <div className="h-10 bg-gray-200 border-b-2 border-red-700 mb-7"></div>
        <ul className="space-y-3 font-semibold">
          {aboutRoutes.map((route, index) => (
            <li key={index}>
              <ActiveLink
                href={route.href}
                className="text-gray-500 hover:text-black transition-colors duration-200"
                activeClassName="text-red-800 font-bold"
              >
                {route.name}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
