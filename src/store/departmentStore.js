import { create } from "zustand";
import updateState from "@/lib/updateState";
import { toast } from "sonner";

const initialState = {
  create: false,
  get: false,
  delete: false,
};

const useDepartmentStore = create((set) => ({
  departments: [],
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
          departments: [result?.payload, ...state.departments],
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

  getDepartmentsHandler: async () => {
    updateState(set, "get", {
      loading: true,
      success: false,
      error: false,
    });
    try {
      const res = await fetch("/api/admin/department");
      if (res.ok) {
        const result = await res.json();
        updateState(set, "get", { loading: false, success: true });
        set({ departments: result?.payload });
      } else {
        const errorData = await res.json();
        updateState(set, "get", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to get departments");
      }
    } catch (error) {
      updateState(set, "get", { loading: false, error: true });
      toast.error(error.message || "Failed to get departments");
    }
  },

  removeDepartmentHandler: async (id) => {
    updateState(set, "delete", {
      loading: true,
      success: false,
      error: false,
    });

    try {
      const res = await fetch("/api/admin/department", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const result = await res.json();
        const updatedDept = result.payload;

        updateState(set, "delete", { loading: false, success: true });

        set((state) => ({
          departments: state.departments.map((department) =>
            department._id === updatedDept._id ? updatedDept : department
          ),
        }));

        toast.success(
          result?.message || "Department status updated successfully"
        );
      } else {
        const errorData = await res.json();
        updateState(set, "delete", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to update department status");
      }
    } catch (error) {
      updateState(set, "delete", { loading: false, error: true });
      toast.error(error.message || "Failed to update department status");
    }
  },
}));

export default useDepartmentStore;
