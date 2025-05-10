"use client";

import Table from "@/components/Table";
import useFacultyStore from "@/store/facultyStore";
import { useEffect, useState } from "react";
import { FaLock, FaUnlockKeyhole } from "react-icons/fa6";

export default function FacultyTable() {
  const { getFacultiesHandler, filterFaculties, isLoading } = useFacultyStore();
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    const fetchFaculties = async () => {
      await getFacultiesHandler();
    };
    fetchFaculties();
  }, []);

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderRow = (faculty, index) => {
    const isShow = showPasswords[faculty._id];

    return (
      <tr
        key={faculty._id}
        className={`text-sm border-b text-gray-600 ${
          index % 2 === 0 ? "bg-gray-100" : ""
        }`}
      >
        <td className="p-3">{faculty._id}</td>
        <td className="p-3 max-w-[20rem] text-nowrap font-medium italic truncate text-black">
          {faculty.name}
        </td>
        <td className="p-3 max-w-[20rem] text-nowrap truncate capitalize">
          {faculty.rank}
        </td>
        <td className="p-3 max-w-[20rem] text-nowrap truncate">
          {faculty.department?.name}
        </td>
        <td className="p-3">{faculty.email}</td>
        <td className="p-3">{isShow ? faculty.password : "••••••••"}</td>
        <td className="p-3 text-center align-middle">
          <button
            onClick={() => togglePasswordVisibility(faculty._id)}
            className="size-6 flex items-center justify-center rounded-full p-0.5
            cursor-pointer text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
            {isShow ? <FaUnlockKeyhole /> : <FaLock />}
          </button>
        </td>
      </tr>
    );
  };
  return (
    <>
      <Table
        headers={[
          "Id",
          "Name",
          "Rank",
          "Department",
          "email",
          "Password",
          "Actions",
        ]}
        data={filterFaculties}
        isLoading={isLoading.get}
        renderRow={renderRow}
      />
    </>
  );
}
