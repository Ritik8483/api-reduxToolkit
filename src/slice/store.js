import { configureStore } from "@reduxjs/toolkit";
import studentSlice from '../slice/sliceReducer.js';

export const store=configureStore({
    reducer:{
        studentReducer:studentSlice
    }
});

export default store;