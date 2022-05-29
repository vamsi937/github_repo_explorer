import React from "react";
import { useSelector } from "react-redux";
import './App.css';
import List from "./components/List";
import SearchUser from "./components/SearchUser";
import UserInfo from "./components/UserInfo";
import RepoDetailedDescription from "./components/RepoDetailedDescription";

function App() {

  const repositoryInfo=useSelector(state=>state.repository);

  return (
    <div className="App">
      <SearchUser />
      <div style={{ display: "flex"}}>
        <UserInfo />
        {repositoryInfo?.showRepoDescription ? (
          <RepoDetailedDescription
            selectedRepo={repositoryInfo?.selectedRepo}
          />
        ) : (
          <List />
        )}
      </div>
    </div>
  );
}

export default App;
