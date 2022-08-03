import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoot } from "../global/global";

export const getStudentData = createAsyncThunk(
  "studentReducer/getStudentData",
  async () => {
    return fetch(apiRoot).then((resp) => resp.json());
    // return axios.get(apiRoot).then((resp)=>resp.json());
  }
);
export const addStudentInfo = createAsyncThunk(
  "studentReducer/addStudentInfo",
  async (values) => {
    return fetch(apiRoot, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((resp) => resp.json());
  }
);
export const deleteStudentData = createAsyncThunk(
  "studentReducer/deleteStudentData",
  async (id) => {
    return fetch(`${apiRoot}/${id}`, { method: "DELETE" }).then((resp) => {return {id:id}});
  }
);
export const getStudentInfo = createAsyncThunk(
    "studentReducer/getStudentInfo",
    async (id) => {
      return fetch(`${apiRoot}/${id}`).then(res => res.json()).then((res) => {return res});
    }
  );
export const editStudentInfo = createAsyncThunk(
  "studentReducer/editStudentInfo",
  async (values,id) => {
    return fetch(`${apiRoot}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((resp) => resp.json()).then((resp) => console.log('543',resp));
  }
);
const initialState = {
  studentArray: [],
  editStudent:{},
  loading: false,
};

const studentSlice = createSlice({
  name: "studentReducer",
  initialState: initialState,
  baseUrl: apiRoot,
  extraReducers: {
    [getStudentData.pending]: (state) => {
      state.loading = true;
    },
    [getStudentData.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentArray = action.payload;
    },
    [addStudentInfo.pending]: (state) => {
      state.loading = true;
    },
    [addStudentInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentArray = [action.payload];
    },
    [deleteStudentData.pending]: (state) => {
      state.loading = true;
    },
    [deleteStudentData.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentArray = state.studentArray.filter(
        (item) => item.id !== action.payload.id
      );
    },
    [getStudentInfo.pending]: (state) => {
    state.loading = true;
    },
    [getStudentInfo.fulfilled]: (state, action) => {
    state.loading = false;
    state.editStudent = action.payload;
    },
    [editStudentInfo.pending]: (state) => {
    state.loading = true;
    },
    [editStudentInfo.fulfilled]: (state, action) => {
    state.loading = false;
    state.studentArray=[action.payload];
    },
  },
});

export default studentSlice.reducer;
