"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/Modal";
import useOptionStore from "@/store/optionStore";
import { courseSchema as validationSchema } from "@/schema/course.schema";
import { Formik, Form } from "formik";
import InputField from "@/components/ui/InputField";
import DropdownField from "@/components/ui/Dropdown";

export default function AddNewCourse() {
  const initialValues = {
    name: "",
    code: "",
    credits: "",
    department: "",
  };

  const { getDeptOptionsHandler, deptOptions } = useOptionStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = async () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      await getDeptOptionsHandler();
    };
    fetchOptions();
  }, []);

  return (
    <div className="flex justify-between space-x-1.5">
      <h1 className="text-xl font-bold italic">
        Total Courses <span>{0} </span>
      </h1>

      <div className="flex items-center space-x-3 mb-3">
        <Button
          onClick={onOpen}
          className="rounded-none text-nowrap bg-transparent border border-red-700 text-red-700 hover:bg-red-700 text-sm hover:text-white"
        >
          Add New
        </Button>
      </div>

      <Modal title="Add New Course" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className="space-y-3 mt-5">
              <InputField
                name="name"
                label="Course Name"
                className="bg-gray-100"
              />
              <div className="flex space-x-3">
                <InputField
                  name="code"
                  label="Course Code"
                  className="bg-gray-100"
                />
                <InputField
                  name="credits"
                  label="Course Credits"
                  className="bg-gray-100"
                />
              </div>
              <DropdownField
                name="department"
                label="Department"
                className="bg-gray-100"
                options={deptOptions?.filter((d) => d.public)}
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
                  //   disabled={isLoading.create}
                  className="rounded-none text-sm"
                >
                  {/* {isLoading.create ? "Creating..." : "Create"} */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
