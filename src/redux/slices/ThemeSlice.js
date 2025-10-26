import { createSlice } from "@reduxjs/toolkit";
import { lightTheme, darkTheme} from "../../assets/theme/theme";
const getStartupTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('themeMode') || 'light';
  }
  return 'light';
};

const startupState = {
  mode: getStartupTheme(),
  colors: getStartupTheme() === "dark" ? darkTheme : lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: startupState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = (state.mode === 'light') ? 'dark' : 'light';
      state.colors = (state.mode === 'dark') ? darkTheme : lightTheme;

      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', state.mode);
      }
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;