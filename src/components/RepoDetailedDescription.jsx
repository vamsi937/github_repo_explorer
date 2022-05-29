import React from 'react';
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux';

import {viewRepoList} from "../features/repository";

const RepoDetailedDescriptionContainer = styled.div`
  flex: ${(props) => (props.showRepoDescription ? 1 : 0)};
  display: flex;
  height: calc(100vh - 50px);
  position: relative;
`;

const RepoImageContainer=styled.div`
    flex: 0.25;
    padding: 10vh 20px;
`;

const RepoDetailsContainer=styled.div`
    flex: 0.75;
    padding: 10vh 20px;
`;

const PlanButton = styled.button`
  color: #fff;
  background: #4abe28;
  padding: 15px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
  border-radius: 5px;
  :hover {
    background: #46ae27;
  }
`;

const RepositoryName=styled.div`
  font-size:48px;
  font-weight: bolder;
  margin: 15px 0;
`;

const LanguageBadge = styled.div`
  border: 1px solid red;
  color: #e28c00;
  border: 1px solid #e28c00;
  padding: 5px;
  width: fit-content;
  border-radius: 5px;
  background: #faffae;
  cursor: pointer;
`;

const RepoDetailedDescription = ({selectedRepo}) => {

  const {showRepoDescription}=useSelector(state=>state.repository);

  const dispatch=useDispatch();
  return (
    <RepoDetailedDescriptionContainer showRepoDescription={showRepoDescription}>
      <RepoImageContainer>
        <div style={{ textAlign: "center" }}>
          <img
            src={selectedRepo?.owner.avatar_url}
            alt={`repo_img_${selectedRepo.node_id}`}
            style={{
              width: "auto",
              height: "150px",
              margin: "10px 0",
            }}
          />
        </div>
        <div style={{ fontWeight: "bold", color: "#666" }}>
          <i class="fas fa-certificate" style={{ color: "green" }}></i> Verified
          by Github
        </div>
        <br />
        <p>
          Github confirms that the app meets this{" "}
          <span style={{ color: "#0076ce" }}>
            requirements for verifications
          </span>
        </p>
        <br />
        <LanguageBadge>{selectedRepo?.language}</LanguageBadge>
        <h4>Categories</h4>
      </RepoImageContainer>
      <RepoDetailsContainer>
        <i className="fas fa-arrow-left" style={{position:"absolute",top:"10px",right:"10px",fontSize:"20px",cursor:"pointer"}} onClick={() => dispatch(viewRepoList())}></i>
        <div style={{color:"#999",fontWeight:"bold"}}>Application</div>
        <RepositoryName>{selectedRepo.name}</RepositoryName>
        <PlanButton>Set up a plan</PlanButton>
        <div>{selectedRepo.description ? selectedRepo.description : ""}</div>
      </RepoDetailsContainer>
    </RepoDetailedDescriptionContainer>
  );
}

export default RepoDetailedDescription