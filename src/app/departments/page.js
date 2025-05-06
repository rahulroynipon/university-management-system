import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Departments | City University",
  description:
    "Explore the various academic departments at City University, offering specialized programs in science, technology, arts, business, and more.",
};

export default function Departments() {
  return (
    <div className="padding">
      <div className="mx-auto text-center">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <p className="text-lg italic text-red-800">
          Explore our diverse range of academic departments.
        </p>
      </div>

      <div className="my-10 md:px-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (item, index) => (
            <li key={index} className="text-lg">
              <div className="">
                {/* <Image className="border" /> */}
                <div className="p-4">
                  <Link href="#">Department Name</Link>
                  <p className="text-sm text-gray-500">Department Head</p>
                  <p>descriptions</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
