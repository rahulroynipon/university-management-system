import updateState from "@/lib/updateState";
import { toast } from "sonner";
import { create } from "zustand";

const initialState = {
  user: false,
  login: false,
  logout: false,
};

const useAuthStore = create((set) => ({
  user: {},
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

  logoutHandler: async () => {
    updateState(set, "logout", { loading: true, success: false, error: false });
    try {
      const res = await fetch("/api/auth/logout");
      if (res.ok) {
        const result = await res.json();
        updateState(set, "logout", {
          loading: false,
          success: true,
          user: null,
        });
        toast.success(result?.message || "Logout successfully");
      } else {
        const errorData = await res.json();
        updateState(set, "logout", { loading: false, error: true });
        toast.error(errorData?.message || "Logout failed");
      }
    } catch (error) {
      updateState(set, "logout", { loading: false, error: true });
      toast.error(error.message || "Logout failed");
    }
  },

  getUserHandler: async () => {
    updateState(set, "getUser", {
      loading: true,
      success: false,
      error: false,
    });
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const result = await res.json();

        updateState(set, "user", {
          loading: false,
          success: true,
          update: { user: result?.payload },
        });
      } else {
        const errorData = await res.json();
        updateState(set, "user", { loading: false, error: true });
        toast.error(errorData?.message || "Failed to fetch user");
      }
    } catch (error) {
      updateState(set, "user", { loading: false, error: true });
      toast.error(error.message || "Failed to fetch user");
    }
  },
}));

export default useAuthStore;
