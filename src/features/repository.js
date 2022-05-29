import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialStateValue={
    repos:[],
    status:null,
    userDetails: null,
    showRepoDescription: false,
    selectedRepo: null,
    listViewType: "repository",
    userFollwers:[],
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
        console.log("fetching followers");
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
    },
    viewRepoList: (state, action) => {
      state.showRepoDescription = false;
    },
    loadRepositories: (state,action)=>{
      state.repos = action.payload;
      state.userDetails = action.payload[0]?.owner;
      state.showRepoDescription = false;
      state.listViewType = "repository";
    },
    loadFollowers: (state,action)=>{
      state.showRepoDescription = false;
      state.listViewType = "followers";
      state.userFollowers=action.payload;
    }
  },
  extraReducers: {
    [getRepositories.pending]: (state, action) => {
      state.staus = "loading";
    },
    [getRepositories.fulfilled]: (state, action) => {
      state.repos = action.payload;
      if(action.payload?.[0]){
        const user=action.payload[0].owner;
        state.userDetails = user;
        state.searchedUsersDict[user.login]=action.payload;
      }
      state.showRepoDescription = false;
      state.listViewType = "repository";
      state.status = "success";
    },
    [getRepositories.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getUserFollowers.pending]: (state, action) => {
      state.staus = "loading";
    },
    [getUserFollowers.fulfilled]: (state, action) => {
      // console.log(action);
      state.userFollwers = action.payload.data;
      state.status = "success";
      state.followersDict[action.payload.userName]=action.payload.data;
      state.showRepoDescription = false;
      state.listViewType = "followers";
    },
    [getUserFollowers.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { viewRepoDescription, viewRepoList, loadRepositories, loadFollowers } =
  repositorySlice.actions;

export default repositorySlice.reducer;
