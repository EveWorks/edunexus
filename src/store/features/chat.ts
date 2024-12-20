import axios from "@/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

export const getConversationList = createAsyncThunk(
  "chat/getConversationList",
  async (request: any, thunkAPI) => {
    try {
      const { callback, userId } = request;
      const url = `/conversation/list_conversation?userId=${userId}`;
      const response: any = await axios.get(url);
      if (response?.data?.length > 0) {
        if (callback) {
          callback();
        }
        return response?.data;
      }
      return {};
    } catch (e) {
      console.log("redux | getConversationList func got error => ", e);
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

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (request: any, thunkAPI) => {
    const { id, limit, page, callback } = request;
    try {
      const response = await axios.get("/conversation/get_allmessage", {
        params: { conversation_id: id, limit, page },
      });

      if (callback) {
        callback();
      }

      return {
        messages: response.data.data || [],
        totalItems: response.data.pagination.totalItems || 0,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch messages"
      );
    }
  }
);

// Send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (request: any, thunkAPI) => {
    try {
      const { data } = request;
      const response: any = await axios.post("/conversation/sendmessage", data);
      if (response?.aiResponse && data?.audioCallback) {
        const audioSummary = response?.aiResponse?.messageObject.summary;
        const chatTitle = response?.aiResponse?.messageObject.title;
        const audioResponse = await data.audioCallback(audioSummary);
        if (audioResponse) {
          return {
            ...response?.aiResponse?.messageObject,
            chatTitle: chatTitle,
            conversationid: { id: data?.conversation_id },
          };
        }
      } else {
        console.error("redux | sendMessage func got error => ");
        toast.error("Error generating response, please try again");
        if (data.audioCallback) {
          data.audioCallback(false);
        }
        return {};
      }
    } catch (err: any) {
      toast.error("Error generating response, please try again");
      console.error("redux | sendMessage func got error => ", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to send message");
    }
  }
);

// create a new conversation
export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (request: any, thunkAPI) => {
    try {
      const { conversation_title, topicid, userid, callback } = request;
      const response: any = await axios.post("/conversation/new_conversation", {
        conversation_title,
        topicid,
        userid,
        callback,
      });
      if (response?.data && callback) {
        callback(response?.data?.id);
      }

      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Failed to send message");
    }
  }
);

// delete conversation
export const deleteConversation = createAsyncThunk(
  "chat/deleteConversation",
  async (request: any, thunkAPI) => {
    try {
      const { id, callback } = request;
      await axios.delete(`/conversation/remove_conversation/${id}`);
      if (callback) {
        callback();
      }

      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Failed to send message");
    }
  }
);

// get conversation detail
export const getConversationDetail = createAsyncThunk(
  "chat/getConversationDetail",
  async (request: any, thunkAPI) => {
    try {
      const { id, callback } = request;
      const response: any = await axios.get(
        `/conversation/get_conversation?conversation_id=${id}`
      );
      if (callback) {
        callback();
      }

      if (response?.data) {
        return response?.data;
      }

      return {};
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Failed to send message");
    }
  }
);

const initialState = {
  topicList: [] as any,
  topicListCount: 0 as number,
  conversationList: [] as any,
  conversationListCount: 0 as number,
  listLoader: false as boolean,
  chatDetail: {} as any,
  messages: [] as any,
  loading: false as boolean,
  msgLoading: false as boolean,
  error: "" as string | null,
  page: 1 as number,
  hasMore: true as boolean,
  totalItems: 0 as number,
  topicId: "" as string,
  audio: null as any,
};

export const chats = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    clearconversationList: (state, action) => {
      state.conversationList = [];
      state.conversationListCount = 0;
    },
    updateChatDetail: (state, action) => {
      state.chatDetail = action.payload.data;
    },
    resetChatDetail: (state, action) => {
      state.topicId = "";
      state.messages = [];
      state.loading = false;
      state.msgLoading = false;
      state.error = "";
      state.page = 1;
      state.hasMore = true;
      state.totalItems = 0;
      // state.chatDetail = {};
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMsgLoader: (state, action) => {
      state.msgLoading = false;
    },
    updateAudio: (state, action) => {
      state.audio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTopic.pending, (state, action) => {
      state.listLoader = true;
    });
    builder.addCase(createTopic.fulfilled, (state, action) => {
      if (state.conversationList?.length > 0) {
        state.conversationList = [...state.conversationList, action.payload];
      } else {
        state.conversationList = [action.payload];
      }
      state.conversationListCount = state.conversationListCount++;
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
    builder.addCase(getConversationList.pending, (state, action) => {
      state.listLoader = true;
    });
    builder.addCase(getConversationList.fulfilled, (state, action) => {
      state.conversationList = action.payload;
      state.conversationListCount = state.conversationList?.length || 0;
      state.listLoader = false;
    });
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const { messages, totalItems } = action.payload;
      if (state.messages?.length > 0) {
        state.messages = [...messages, ...state.messages];
      } else {
        state.messages = messages;
      }
      state.totalItems = totalItems;
      state.hasMore = messages.length > 0;
      state.loading = false;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(sendMessage.pending, (state) => {
      state.msgLoading = true;
      state.error = null;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const data = action.payload;
      console.log("data", data);
      if (data?.content) {
        state.messages.push(data);
      }
      if (data?.chatTitle != "") {
        state.conversationList = state.conversationList.map((item: any) => {
          if (item?.id === data?.conversationid.id) {
            item.conversation_title = data?.chatTitle;
          }
          return item;
        });
      }
      if (state?.chatDetail?.id === data?.id) {
        state.chatDetail.conversation_title = data?.chatTitle;
      }
      // state.msgLoading = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.msgLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createConversation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createConversation.fulfilled, (state, action) => {
      state.loading = false;
      state.chatDetail = action.payload;
    });
    builder.addCase(createConversation.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteConversation.fulfilled, (state, action) => {
      state.conversationList = state.conversationList?.filter(
        (item: any) => item.id !== action.payload
      );
    });
    builder.addCase(getConversationDetail.fulfilled, (state, action) => {
      state.chatDetail = action.payload;
    });
  },
});

export const {
  clearconversationList,
  updateChatDetail,
  addMessage,
  resetChatDetail,
  updateMsgLoader,
  updateAudio
} = chats.actions;
export default chats.reducer;
