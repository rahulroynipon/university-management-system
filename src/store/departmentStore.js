import { create } from "zustand";
import updateState from "@/lib/updateState";
import { toast } from "sonner";

const initialState = {
  create: false,
};

const useDepartmentStore = create((set) => ({
  department: [],
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  addDepartmentHandler: async (data) => {
    updateState(set, "create", { loading: true, success: false, error: false });
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("description", data?.description);
      formData.append("icon", data?.icon);

      const res = await fetch("/api/admin/department", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        updateState(set, "create", { loading: false, success: true });

        set((state) => ({
          department: [...state.department, result?.payload],
        }));

        toast.success(result?.message || "Department created successfully");
      } else {
        const errorData = await res.json();
        updateState(set, "create", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to create department");
      }
    } catch (error) {
      updateState(set, "create", { loading: false, error: true });
      toast.error(error.message || "Failed to create department");
    }
  },
}));

export default useDepartmentStore;
