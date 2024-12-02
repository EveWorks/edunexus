import axios from "@/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTopic = createAsyncThunk(
  "chat/createTopic",
  async (request: any, thunkAPI) => {
    try {
      const { topic, callback } = request;
      const payload = {
        topic_name: topic,
      };
      const response: any = await axios.post("/topic/createtopic", payload);
      if (response?.topics?.id) {
        if (callback) {
          callback(response?.topics?.id);
        }
        return response?.topics;
      }
      return {};
    } catch (e) {
      console.log("redux | createTopic func got error => ", e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getTopicList = createAsyncThunk(
  "chat/getTopicList",
  async (request: any, thunkAPI) => {
    try {
      const { limit, page, callback } = request;
      const url = `/topic/gettopic?limit=${limit}&page=${page}`;
      const response: any = await axios.get(url);
      if (response?.result?.data?.length > 0) {
        if (callback) {
          callback();
        }
        return response?.result;
      }
      return {};
    } catch (e) {
      console.log("redux | getTopicList func got error => ", e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  topicList: [] as any,
  topicListCount: 0 as number,
  listLoader: false as boolean,
};

export const chats = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    clearTopicList: (state, action) => {
      state.topicList = [];
      state.topicListCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTopic.pending, (state, action) => {
      state.listLoader = true;
    });
    builder.addCase(createTopic.fulfilled, (state, action) => {
      state.topicList = action.payload;
      state.listLoader = false;
    });
    builder.addCase(getTopicList.pending, (state, action) => {
      state.listLoader = true;
    });
    builder.addCase(getTopicList.fulfilled, (state, action) => {
      if (
        state.topicList?.length > 0 &&
        action.payload?.pagination?.currentPage != 1
      ) {
        state.topicList = [...state.topicList, ...action.payload.data];
      } else {
        state.topicList = action.payload.data;
      }
      state.topicListCount = action.payload?.pagination?.totalPages || 0;
      state.listLoader = false;
    });
  },
});

export const { clearTopicList } = chats.actions;
export default chats.reducer;
