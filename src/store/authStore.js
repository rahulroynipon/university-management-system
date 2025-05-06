import updateState from "@/lib/updateState";
import { toast } from "sonner";
import { create } from "zustand";

const initialState = {
  login: false,
};

const useAuthStore = create((set) => ({
  user: {},
  message: "",
  message: { login: "" },
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  addUser: (user) => set({ user: user }),
  removeUser: () => set({ user: {} }),

  loginHandler: async (data) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success(result?.message || "Login success");
      } else {
        const errorData = await res.json();
        toast.error(errorData?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  },
}));

export default useAuthStore;
