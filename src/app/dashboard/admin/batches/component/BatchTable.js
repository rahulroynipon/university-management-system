"use client";

import Modal from "@/components/Modal";
import Table from "@/components/Table";
import useBatchStore from "@/store/batchStore";
import { useEffect, useState } from "react";
import { RiExchange2Line } from "react-icons/ri";
import Button from "@/components/ui/Button";

function BatchTable() {
  const { batches, getBatchesHandler, removeBatchHandler, isLoading, isError } =
    useBatchStore();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const onOpenDelete = (dept) => {
    setSelectedBatch(dept);
    setIsOpenDelete(true);
  };

  const onCloseDelete = () => {
    setIsOpenDelete(false);
    setSelectedBatch(null);
  };

  const deleteHandler = async () => {
    if (isLoading.delete && !isError.delete) return;
    await removeBatchHandler(selectedBatch?._id);
    onCloseDelete();
  };

  useEffect(() => {
    const fetchBatches = async () => {
      await getBatchesHandler();
    };

    fetchBatches();
  }, []);

  const renderRow = (batch, index) => (
    <tr
      key={batch._id}
      className={`text-sm border-b text-gray-600 ${
        index % 2 === 0 ? "bg-gray-100" : ""
      }`}
    >
      <td className="p-3">{batch._id}</td>
      <td className="p-3 max-w-[20rem] text-nowrap font-medium italic truncate text-black">
        {batch.name}
      </td>
      <td className="p-3 max-w-[20rem] text-nowrap truncate">
        {batch.department?.name}
      </td>
      <td className="p-3">{batch.number}</td>
      <td className="p-3 ">{batch.year}</td>
      <td className="p-3 text-xs">
        {batch.public ? (
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
          onClick={() => onOpenDelete(batch)}
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
        headers={[
          "Id",
          "Name",
          "Department",
          "Batch",
          "Year",
          "Status",
          "Actions",
        ]}
        data={batches}
        isLoading={isLoading.get}
        renderRow={renderRow}
      />

      <Modal
        title="Update Status"
        onClose={onCloseDelete}
        isOpen={isOpenDelete}
      >
        <div className="text-center my-10">
          <h3 className="text-lg font-semibold italic break-all">
            {selectedBatch?.name}
          </h3>
          <p className="text-sm text-gray-600">
            Are you sure you want to{" "}
            <span className="font-semibold italic">
              {selectedBatch?.public ? "private" : "public"}
            </span>{" "}
            this batch?
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
              : selectedBatch?.public
              ? "Private"
              : "Public"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default BatchTable;
