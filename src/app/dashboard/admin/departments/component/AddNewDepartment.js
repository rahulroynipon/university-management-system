"use client";

import Modal from "@/components/Modal";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";
import { Form, Formik } from "formik";
import { useState } from "react";
import { departmentSchema as validationSchema } from "@/schema/department.schema";
import ImageInputField from "@/components/ui/ImageInputField";

export default function AddNewDepartment() {
  const initialValues = {
    name: "",
    description: "",
    icon: "",
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold italic">
          Department <span> 0 </span>
        </h1>
        <Button
          onClick={onOpen}
          className="rounded-none mb-3 bg-transparent border border-red-700 text-red-700 hover:bg-red-700 text-sm hover:text-white"
        >
          Add New
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} title="Add New Department">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className="space-y-3 mt-5">
              <InputField name="name" label="Name" className="bg-gray-100" />
              <TextAreaField
                name="description"
                label="Description"
                className="bg-gray-100"
              />

              <ImageInputField
                name="icon"
                label="Icon"
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

                <Button type="submit" className="rounded-none text-sm">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
