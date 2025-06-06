"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/Modal";
import { batchSchema as validationSchema } from "@/schema/batch.schema";
import { Form, Formik } from "formik";
import InputField from "@/components/ui/InputField";
import useBatchStore from "@/store/batchStore";
import DropdownField from "@/components/ui/Dropdown";
import SelectFilter from "@/components/ui/SelectFilter";
import useOptionStore from "@/store/optionStore";

export default function AddNewBatch() {
  const initialValues = {
    name: "",
    department: "",
  };

  const {
    addBatchHandler,
    isLoading,
    isSuccess,
    isError,
    batches,
    filterBatchesHandler,
    filterBatches,
  } = useBatchStore();

  const { getDeptOptionsHandler, deptOptions } = useOptionStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = async () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    if (isLoading.create && !isError.create) return;
    await addBatchHandler(values);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      await getDeptOptionsHandler();
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    filterBatchesHandler();
  }, [batches]);

  useEffect(() => {
    if (isSuccess.create) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold italic">
          Total Batches <span>{filterBatches.length} </span>
        </h1>

        <div className="space-x-3">
          <SelectFilter
            options={deptOptions}
            onChange={(e) => filterBatchesHandler(e.target.value)}
            placeholder="Filter by department"
          />

          <Button
            onClick={onOpen}
            className="rounded-none mb-3 bg-transparent border border-red-700 text-red-700 hover:bg-red-700 text-sm hover:text-white"
          >
            Add New
          </Button>
        </div>
      </div>

      <Modal title="Add New Batch" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-3 mt-5">
              <InputField name="name" label="Name" className="bg-gray-100" />

              <DropdownField
                name="department"
                label="Department"
                options={deptOptions?.filter((option) => option.public)}
                className="bg-gray-100"
              />

              <div className="flex justify-end mt-5">
                <Button
                  onClick={onClose}
                  type="button"
                  className="mr-3 rounded-none bg-transparent border border-red-700 text-red-700 hover:bg-red-700 text-sm hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading.create}
                  className="rounded-none text-sm"
                >
                  {isLoading.create ? "Creating..." : "Create"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
