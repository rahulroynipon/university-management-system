import Link from "next/link";
import Image from "next/image";

export default function Departments() {
  return (
    <div className="padding">
      <div className="mx-auto text-center">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <p className="text-lg">
          Explore our diverse range of academic departments.
        </p>
      </div>

      <div className="my-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {Array.from({ length: 6 }, (item, index) => (
            <li key={index} className="my-4 text-lg">
              <div>
                <Image />
                <Link href="#">Department Name</Link>
                <p className="text-sm text-gray-500">Department Head</p>
                <p>descriptions</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
