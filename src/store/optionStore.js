import updateState from "@/lib/updateState";
import { create } from "zustand";
import { toast } from "sonner";

const initialState = {
  dept: false,
};

const useOptionStore = create((set, get) => ({
  deptOptions: [],
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  getDeptOptionsHandler: async () => {
    const { deptOptions } = get();
    if (deptOptions.length > 0) return;
    updateState(set, "dept", { loading: true, success: false, error: false });
    try {
      const res = await fetch("/api/admin/department?type=options");
      if (res.ok) {
        const result = await res.json();
        updateState(set, "dept", { loading: false, success: true });
        set({ deptOptions: result?.payload });
      } else {
        const errorData = await res.json();
        updateState(set, "dept", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to get department options");
      }
    } catch (error) {
      updateState(set, "dept", { loading: false, error: true });
      toast.error(error.message || "Failed to get department options");
    }
  },
}));

export default useOptionStore;
