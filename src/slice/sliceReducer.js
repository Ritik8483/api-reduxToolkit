import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoot } from "../global/global";

export const getStudentData = createAsyncThunk(
  "studentReducer/getStudentData",
  async (enteries) => {
    return fetch(`${apiRoot}?_start=${enteries.initialEntry}&_end=${enteries.totalEnteries}`).then((resp) => resp.json());
    // return axios.get(apiRoot).then((resp)=>resp.json());
  }
);

export const getSortedData = createAsyncThunk(
  "studentReducer/getSortedData",
  async () => {
    return fetch(`${apiRoot}?_sort=${'id'}&_order=desc`).then((resp) => resp.json());
  }
);

export const getSearchedData = createAsyncThunk(
  "studentReducer/getSearchedData",
  async (searchValue) => {
    console.log('log',searchValue);
    return fetch(`${apiRoot}/?name=${searchValue}`).then((resp) => resp.json());
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
  async (valuesObject) => {
    console.log('VV',valuesObject);
    return fetch(`${apiRoot}/${valuesObject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valuesObject.inputValues),
    })
  }
);
const initialState = {
  studentArray: [],
  sortedArray:[],
  // searchedData:{},
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
    [getSortedData.pending]: (state) => {
      state.loading = true;
    },
    [getSortedData.fulfilled]: (state, action) => {
      state.loading = false;
      state.sortedArray = action.payload;
    },
    [getSearchedData.pending]: (state) => {
      state.loading = true;
    },
    [getSearchedData.fulfilled]: (state, action) => {
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
    state.studentArray=[...action.payload];
    },
  },
});

export default studentSlice.reducer;
