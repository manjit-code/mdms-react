import { createSlice } from "@reduxjs/toolkit";

const lightTheme = {
    background: '#ffffff',
    text: '#121212',
    primaryButtonBg: '#007bff',
    primaryButtonText: '#ffffff',
    submitButtonBg: '#28a745',
    submitButtonText: '#ffffff',
    deleteButtonBg: '#dc3545',
    deleteButtonText: '#ffffff',
    addButtonBg: '#17a2b8',
    addButtonText: '#ffffff',
}


const darkTheme = {
    background: '#121212',
    text: '#ffffff',
    primaryButtonBg: '#6c757d',
    primaryButtonText: '#ffffff',
    submitButtonBg: '#218838',
    submitButtonText: '#ffffff',
    deleteButtonBg: '#c82333',
    deleteButtonText: '#ffffff',
    addButtonBg: '#138496',
    addButtonText: '#ffffff',
}


const getStartupTheme = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('themeMode') || 'light';
    }
    return 'light';
}

const startupState = {
    mode: getStartupTheme(),
    colors: getStartupTheme() === "dark" ? darkTheme : lightTheme
}
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