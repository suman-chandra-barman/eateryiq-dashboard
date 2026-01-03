import { TUser } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

// Helper function to get initial state from localStorage
const getInitialState = (): TAuthState => {
  if (typeof window !== "undefined") {
    try {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        return JSON.parse(storedAuth);
      }
    } catch (error) {
      console.error("Error loading auth from localStorage:", error);
    }
  }
  return {
    user: null,
    token: null,
  };
};

const initialState: TAuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      // Store token in cookie for middleware access
      if (typeof document !== "undefined") {
        document.cookie = `token=${action.payload}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`; // 7 days
      }
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state));
      }
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Remove token cookie
      if (typeof document !== "undefined") {
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
