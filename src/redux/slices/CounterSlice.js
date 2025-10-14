import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {value: 0},
    reducers:{
        increament: (state) =>{
            // const {value} = state;
            // value += 1;

            state.value += 1;
        },
        decreament: (state) => {state.value -= 1},
        setValue: (state, action) =>{
            state.value = action.payload
        }
    }
});

export const {increament, decreament, setValue} = counterSlice.actions; // Named export
export default counterSlice.reducer; // default export