"use client";

import { Formik, Form } from "formik";
import { loginSchema as validationSchema } from "@/schema/login.schema";
import InputField from "@/components/ui/InputField";
import { useEffect, useState } from "react";
import DropdownField from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
    role: "student",
  };

  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { loginHandler, isLoading, isSuccess } = useAuthStore();

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = async (values) => {
    if (isLoading.login) return;
    await loginHandler(values);
  };

  useEffect(() => {
    isSuccess.login && router.push("/dashboard");
  }, [isSuccess]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="max-w-sm w-full py-10 space-y-3">
          <InputField label="Email" name="email" />
          <DropdownField
            label="Role"
            name="role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "Student", value: "student" },
              { label: "Faculty", value: "faculty" },
            ]}
          />
          <div className="space-y-2">
            <InputField
              type={isShowPassword ? "text" : "password"}
              label="Password"
              name="password"
            />
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="show-password"
                onChange={toggleShowPassword}
                className="cursor-pointer"
              />
              <label htmlFor="show-password" className="cursor-pointer">
                Show password
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading.login}
            className="w-full mt-3"
          >
            {isLoading.login ? "Loging in..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
