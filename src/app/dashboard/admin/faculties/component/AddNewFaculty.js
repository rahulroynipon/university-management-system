"use client";

import { useState, useEffect } from "react";
import { facultySchema as validationSchema } from "@/schema/faculty.schema";
import useOptionStore from "@/store/optionStore";
import Button from "@/components/ui/Button";
import SelectFilter from "@/components/ui/SelectFilter";
import Modal from "@/components/Modal";
import { Form, Formik } from "formik";
import InputField from "@/components/ui/InputField";
import DropdownField from "@/components/ui/Dropdown";
import TextAreaField from "@/components/ui/TextAreaField";
import useFacultyStore from "@/store/facultyStore";
import SearchFilter from "@/components/ui/SearchFilter";

const rankOptions = [
  {
    label: "Head of Department",
    value: "head of department",
  },
  {
    label: "Associate Professor",
    value: "associate professor",
  },
  {
    label: "Professor",
    value: "professor",
  },
  {
    label: "Lecturer",
    value: "lecturer",
  },
];

function AddNewFaculty() {
  const initialValues = {
    name: "",
    email: "",
    department: "",
    description: "",
    role: "faculty",
    rank: "lecturer",
  };
  const {
    addFacultyHandler,
    filterFacultiesHandler,
    filterFaculties,
    searchFacultiesHandler,
    faculties,
    isLoading,
    isSuccess,
    isError,
  } = useFacultyStore();
  const { getDeptOptionsHandler, deptOptions } = useOptionStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = async () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    if (isLoading.create && !isError.create) return;
    await addFacultyHandler(values);
  };

  useEffect(() => {
    filterFacultiesHandler();
  }, [faculties]);

  useEffect(() => {
    const fetchOptions = async () => {
      await getDeptOptionsHandler();
    };
    fetchOptions();
  }, []);

  return (
    <div>
      <div className="flex justify-between space-x-1.5">
        <h1 className="text-xl font-bold italic">
          Total Faculties <span>{filterFaculties.length} </span>
        </h1>

        <div className="flex items-center space-x-3 mb-3">
          <SearchFilter
            defaultValue="name"
            options={[
              { label: "Name", value: "name" },
              { label: "Email", value: "email" },
              { label: "Id", value: "_id" },
            ]}
            onChange={searchFacultiesHandler}
          />

          <SelectFilter
            options={deptOptions}
            onChange={(e) => filterFacultiesHandler(e.target.value)}
            placeholder="Filter by department"
          />

          <Button
            onClick={onOpen}
            className="rounded-none text-nowrap bg-transparent border border-red-700 text-red-700 hover:bg-red-700 text-sm hover:text-white"
          >
            Add New
          </Button>
        </div>
      </div>

      <Modal title="Add New Faculty" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-3 mt-5">
              <InputField name="name" label="Name" className="bg-gray-100" />
              <InputField name="email" label="Email" className="bg-gray-100" />

              <div className="flex space-x-3">
                <DropdownField
                  name="department"
                  label="Department"
                  options={deptOptions?.filter((option) => option.public)}
                  className="bg-gray-100"
                />

                <DropdownField
                  name="rank"
                  label="Rank"
                  options={rankOptions}
                  className="bg-gray-100"
                />
              </div>

              <TextAreaField
                name="description"
                label="Description"
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

export default AddNewFaculty;
