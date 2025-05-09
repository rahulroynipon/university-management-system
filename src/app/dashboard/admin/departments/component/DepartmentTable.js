"use client";

import useDepartmentStore from "@/store/departmentStore";
import Table from "@/components/Table";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { RiExchange2Line } from "react-icons/ri";

function DepartmentTable() {
  const {
    getDepartmentsHandler,
    removeDepartmentHandler,
    departments,
    isLoading,
    isError,
  } = useDepartmentStore();

  const [selectedDept, setSelectedDept] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const onOpenDelete = (dept) => {
    setSelectedDept(dept);
    setIsOpenDelete(true);
  };

  const onCloseDelete = () => {
    setIsOpenDelete(false);
    setSelectedDept(null);
  };

  const deleteHandler = async () => {
    if (isLoading.delete && !isError.delete) return;
    await removeDepartmentHandler(selectedDept?._id);
    onCloseDelete();
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      await getDepartmentsHandler();
    };
    fetchDepartment();
  }, []);

  const renderRow = (dept, index) => (
    <tr
      key={dept._id}
      className={`text-sm border-b text-gray-600 ${
        index % 2 === 0 ? "bg-gray-100" : ""
      }`}
    >
      <td className="p-3">{dept._id}</td>
      <td className="p-3">
        <img
          src={dept.icon.url}
          alt={dept.name}
          className="w-12 h-6 object-contain"
        />
      </td>
      <td className="p-3 max-w-[20rem] text-nowrap font-medium italic truncate text-black">
        {dept.name}
      </td>
      <td className="p-3 max-w-[20rem] line-clamp-1 text-nowrap truncate">
        {dept.description}
      </td>
      <td className="p-3 text-xs">
        {dept.public ? (
          <span className="text-green-800 bg-green-200 px-2 py-1 rounded-full">
            Public
          </span>
        ) : (
          <span className="text-red-800 bg-red-200 px-2 py-1 rounded-full">
            Private
          </span>
        )}
      </td>
      <td className="p-3">
        <button
          onClick={() => onOpenDelete(dept)}
          className="size-6 flex items-center justify-center rounded-full p-0.5
            cursor-pointer text-gray-600 hover:bg-gray-200 transition-colors duration-200"
        >
          <RiExchange2Line className="text-lg" />
        </button>
      </td>
    </tr>
  );
  return (
    <>
      <Table
        headers={["ID", "Icon", "Name", "Description", "Status", "Actions"]}
        data={departments}
        renderRow={renderRow}
        isLoading={isLoading.get}
      />

      {/* delete modal */}
      <Modal
        title="Update Status"
        onClose={onCloseDelete}
        isOpen={isOpenDelete}
      >
        <div className="text-center my-10">
          <h3 className="text-lg font-semibold italic break-all">
            {selectedDept?.name}
          </h3>
          <p className="text-sm text-gray-600">
            Are you sure you want to{" "}
            <span className="font-semibold italic">
              {selectedDept?.public ? "private" : "public"}
            </span>{" "}
            this department?
          </p>
        </div>

        <div className="flex justify-center w-full">
          <Button
            onClick={onCloseDelete}
            className="mr-3 rounded-none bg-transparent border border-red-700 text-red-700 hover:bg-red-700 text-sm hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="rounded-none text-sm"
            onClick={deleteHandler}
            disabled={isLoading.delete}
          >
            {isLoading.delete
              ? "Updating..."
              : selectedDept?.public
              ? "Private"
              : "Public"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DepartmentTable;
