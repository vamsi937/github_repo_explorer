import React from "react";
import { useSelector } from "react-redux";
import './App.css';
import List from "./components/List";
import SearchUser from "./components/SearchUser";
import UserInfo from "./components/UserInfo";
import RepoDetailedDescription from "./components/RepoDetailedDescription";
import "react-toastify/dist/ReactToastify.css";
function App() {

  const repositoryInfo=useSelector(state=>state.repository);

  return (
    <div className="App">
      <SearchUser />
      <div style={{ display: "flex" }}>
        {repositoryInfo.status === "failed" ? (
          <div style={{display:"flex",justifyContent:"center",width:"100%",alignItems:"center",height:"calc(100vh - 50px)"}}>
            You have entered an invalid username 😥
          </div>
        ) : (
          <>
            <UserInfo />
            {repositoryInfo?.showRepoDescription ? (
              <RepoDetailedDescription
                selectedRepo={repositoryInfo?.selectedRepo}
              />
            ) : (
              <List />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
