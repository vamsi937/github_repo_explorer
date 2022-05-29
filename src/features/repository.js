import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialStateValue={
    repos:[],
    status:null,
    userDetails: null,
    showRepoDescription: false,
    selectedRepo: null,
    listViewType: "repository",
    userFollowers:[],
    searchedUsersDict:{},
    followersDict:{},
};

export const getRepositories=createAsyncThunk(
    "repositories/getRepositories",
    async ({searchTerm})=>{
        return await fetch(`https://api.github.com/users/${searchTerm}/repos`)
        .then(response=>response.json());
    }
);

export const getUserFollowers=createAsyncThunk(
    "repositories/getUserFollowers",
    async ({userName})=>{
        return await fetch(`https://api.github.com/users/${userName}/followers`)
        .then(response=>response.json())
        .then(data=>{
          return {
            data,
            userName
          }
        })
    }
)

const repositorySlice = createSlice({
  name: "repository",
  initialState: initialStateValue,
  reducers: {
    viewRepoDescription: (state, action) => {
      state.showRepoDescription = true;
      state.selectedRepo = action.payload;
      state.listViewType="repository";
    },
    viewRepoList: (state, action) => {
      state.showRepoDescription = false;
      state.listViewType="repository";
    },
    loadRepositories: (state,action)=>{
      state.repos = action.payload;
      state.userDetails = action.payload[0]?.owner;
      state.showRepoDescription = false;
      state.listViewType = "repository";
      state.userFollowers=[];
      state.status="success";
    },
    loadFollowers: (state,action)=>{
      state.showRepoDescription = false;
      state.listViewType = "followers";
      state.status = "success";
      state.userFollowers=action.payload;
    },
    goToHomePage:(state,action)=>{
      state.repos=[];
      state.status="success";
      state.userDetails=null;
      state.showRepoDescription=false;
      state.selectedRepo=null;
      state.listViewType="repository";
      state.userFollowers=[];
    }
  },
  extraReducers: {
    [getRepositories.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRepositories.fulfilled]: (state, action) => {
      if (
        action.payload.length === 0 ||
        action.payload.message === "Not Found"
      ) {
        state.status = "failed";
        state.listViewType = "repository";
      } else {
        state.repos = action.payload;
        if (action.payload?.[0]) {
          const user = action.payload[0].owner;
          state.userDetails = user;
          state.searchedUsersDict[user.login] = action.payload;
        }
        state.userFollowers = [];
        state.showRepoDescription = false;
        state.listViewType = "repository";
        state.status = "success";
      }
    },
    [getRepositories.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getUserFollowers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserFollowers.fulfilled]: (state, action) => {
      // console.log(action);
      state.userFollowers = action.payload.data;
      state.status = "success";
      state.followersDict[action.payload.userName]=action.payload.data;
      state.showRepoDescription = false;
      state.listViewType = "followers";
    },
    [getUserFollowers.rejected]: (state, action) => {
      state.listViewType="repository";
      state.status = "failed";
    },
  },
});

export const {
  viewRepoDescription,
  viewRepoList,
  loadRepositories,
  loadFollowers,
  goToHomePage,
} = repositorySlice.actions;

export default repositorySlice.reducer;
