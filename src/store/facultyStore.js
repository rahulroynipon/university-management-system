import updateState from "@/lib/updateState";
import { toast } from "sonner";
import { create } from "zustand";

const initialState = {
  create: false,
  get: false,
  delete: false,
};

const useFacultyStore = create((set, get) => ({
  faculties: [],
  filterFaculties: [],
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  addFacultyHandler: async (data) => {
    updateState(set, "create", { loading: true, success: false, error: false });

    try {
      const res = await fetch("/api/admin/faculty", {
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
          faculties: [result?.payload, ...state.faculties],
        }));
        toast.success(result?.message || "Faculty created successfully");
      } else {
        const errorData = await res.json();
        updateState(set, "create", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to create faculty");
      }
    } catch (error) {
      updateState(set, "create", { loading: false, error: true });
      toast.error(error.message || "Failed to create faculty");
    }
  },

  getFacultiesHandler: async () => {
    updateState(set, "get", { loading: true, success: false, error: false });
    try {
      const res = await fetch("/api/admin/faculty");
      if (res.ok) {
        const result = await res.json();
        updateState(set, "get", { loading: false, success: true });
        set({ faculties: result?.payload });
      } else {
        const errorData = await res.json();
        updateState(set, "get", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to get faculties");
      }
    } catch (error) {
      updateState(set, "get", { loading: false, error: true });
      toast.error(error.message || "Failed to get faculties");
    }
  },

  filterFacultiesHandler: (query) => {
    if (!query) return set({ filterFaculties: get().faculties });
    set((state) => ({
      filterFaculties: state.faculties.filter(
        (faculty) => faculty.department._id === query
      ),
    }));
  },

  searchFacultiesHandler: (query) => {
    if (!query || !query?.searchBy) return;

    const searchText = query.searchText.toLowerCase();
    const searchBy = query.searchBy;

    set((state) => ({
      filterFaculties: state.faculties.filter((faculty) => {
        const fieldValue = faculty[searchBy];
        return (
          typeof fieldValue === "string" &&
          fieldValue.toLowerCase().startsWith(searchText)
        );
      }),
    }));
  },
}));

export default useFacultyStore;
