import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/dbConnect";
import Department from "@/models/department.model";

export const metadata = {
  title: "Departments | City University",
  description:
    "Explore the various academic departments at City University, offering specialized programs in science, technology, arts, business, and more.",
};

export default async function Departments() {
  await dbConnect();

  const departments = await Department.find({});

  return (
    <div className="padding width">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold">Departments</h1>
        <p className="text-lg italic text-red-800">
          Explore our diverse range of academic departments.
        </p>
      </div>

      {!departments || departments.length === 0 ? (
        <div className="p-4 text-center italic text-xl pb-10">
          Departments not found
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {departments.map((item) => (
            <li
              key={item._id}
              className="border border-gray-200 overflow-hidden shadow hover:shadow-lg transition duration-200"
            >
              <Link href={`/departments/${item.slug}`} passHref>
                <div className="block h-full">
                  <div className="relative bg-gray-100 h-44 w-full">
                    {item.icon?.url ? (
                      <Image
                        src={item.icon.url}
                        alt={item.name || "Department"}
                        layout="fill"
                        objectFit="contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold italic text-red-800 text-lg line-clamp-1">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
