import { createSlice } from "@reduxjs/toolkit";

// Load saved role from localStorage
const getStartupRole = () => {
  if (typeof window !== "undefined") {
    const role = localStorage.getItem("role");
    
    // Check if session has expired (60 minutes)
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - parseInt(loginTime);
      const minutesPassed = timeDiff / (1000 * 60);
      
      if (minutesPassed > 60) {
        // Session expired, clear all data
        localStorage.removeItem("role");
        localStorage.removeItem("user_info");
        localStorage.removeItem("loginTime");
        return null;
      }
    }
    
    return role || null;
  }
  return null;
};

const getStartupUserInfo = () => {
  if (typeof window !== "undefined") {
    try {
      const userInfo = localStorage.getItem("user_info");
      return userInfo ? JSON.parse(userInfo) : {};
    } catch (error) {
      console.error("Error parsing user_info:", error);
      return {};
    }
  }
  return {};
};

const initialState = {
  currRole: getStartupRole(),
  userInfo: getStartupUserInfo()
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      const role = action.payload;
      state.currRole = role;
      localStorage.setItem("role", role);
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user_info", JSON.stringify(action.payload));
    },

    clearAuth: (state) => {
      state.currRole = null;
      state.userInfo = {};

      localStorage.removeItem("role");
      localStorage.removeItem("user_info");
      localStorage.removeItem("loginTime");
    }
  }
});

export const { setRole, setUserInfo, clearAuth } = authSlice.actions;
export default authSlice.reducer;