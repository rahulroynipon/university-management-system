import updateState from "@/lib/updateState";
import { toast } from "sonner";
import { create } from "zustand";
import { is } from "./../../.next/server/chunks/346";

const initialState = {
  login: false,
};

const useAuthStore = create((set) => ({
  user: {},
  message: { login: "" },
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  addUser: (user) => set({ user: user }),
  removeUser: () => set({ user: {} }),

  loginHandler: async (data) => {
    updateState(set, "login", { loading: true, success: false, error: false });
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
        updateState(set, "login", { loading: false, success: true });
        toast.success(result?.message || "Login success");
      } else {
        const errorData = await res.json();
        updateState(set, "login", { loading: false, error: true });
        toast.error(errorData?.message || "Login failed");
      }
    } catch (error) {
      updateState(set, "login", { loading: false, error: true });
      toast.error(error.message || "Login failed");
    }
  },
}));

export default useAuthStore;
