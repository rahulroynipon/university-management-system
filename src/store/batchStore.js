import updateState from "@/lib/updateState";
import { create } from "zustand";
import { toast } from "sonner";

const initialState = {
  create: false,
  get: false,
  delete: false,
};

const useBatchStore = create((set, get) => ({
  batches: [],
  filterBatches: [],
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },


  addBatchHandler: async (data) => {
    updateState(set, "create", { loading: true, success: false, error: false });
    try {
      const res = await fetch("/api/admin/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        updateState(set, "create", { loading: false, success: true });
        set((state) => ({
          batches: [result?.payload, ...state.batches],
        }));
        toast.success(result?.message || "Batch created successfully");
      } else {
        const errorData = await res.json();
        updateState(set, "create", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to create batch");
      }
    } catch (error) {
      updateState(set, "create", { loading: false, error: true });
      toast.error(error.message || "Failed to create batch");
    }
  },
  getBatchesHandler: async () => {
    updateState(set, "get", { loading: true, success: false, error: false });
    try {
      const res = await fetch("/api/admin/batch");
      if (res.ok) {
        const result = await res.json();
        updateState(set, "get", { loading: false, success: true });
        set({ batches: result?.payload });
      } else {
        const errorData = await res.json();
        updateState(set, "get", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to get batches");
      }
    } catch (error) {
      updateState(set, "get", { loading: false, error: true });
      toast.error(error.message || "Failed to get batches");
    }
  },

  removeBatchHandler: async (id) => {
    updateState(set, "delete", {
      loading: true,
      success: false,
      error: false,
    });

    try {
      const res = await fetch("/api/admin/batch", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const result = await res.json();
        const updatedBatch = result.payload;

        updateState(set, "delete", { loading: false, success: true });

        set((state) => ({
          batches: state.batches.map((batch) =>
            batch._id === updatedBatch._id ? updatedBatch : batch
          ),
        }));

        toast.success(result?.message || "Batch deleted successfully");
      } else {
        const errorData = await res.json();
        updateState(set, "delete", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to delete batch");
      }
    } catch (error) {
      updateState(set, "delete", { loading: false, error: true });
      toast.error(error.message || "Failed to delete batch");
    }
  },

  filterBatchesHandler: (filterId) => {
    if (!filterId) return set({ filterBatches: get().batches });
    const batches = get().batches;
    const filteredBatches = batches.filter(
      (batch) => batch.department._id === filterId
    );
    set({ filterBatches: filteredBatches });
  },
}));

export default useBatchStore;
