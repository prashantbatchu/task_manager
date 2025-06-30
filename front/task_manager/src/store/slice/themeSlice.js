import {createSlice} from '@reduxjs/toolkit';

const ThemeState = {
    isDark: Boolean,
};
const initialState = {
    isDark: localStorage.getItem('theme') === 'dark' 
};
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
        },
        // setTheme: (state, action) => {
        //     state.isDark = action.payload === 'dark';
        //     localStorage.setItem('theme', action.payload);
        // }
    }
});


export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;


