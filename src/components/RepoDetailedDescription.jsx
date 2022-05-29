import React from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';

import {viewRepoList} from "../features/repository";

const RepoDetailedDescriptionContainer = styled.div`
    flex: 0.75;
    display: flex;
    padding: 0 25px; 
`;

const RepoImageContainer=styled.div`
    flex: 0.35;
    padding: 10vh 20px;
`;

const RepoDetailsContainer=styled.div`
    flex: 0.65;
    padding: 10vh 20px;
`;

const PlanButton = styled.button`
  color: #fff;
  background: #4abe28;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const RepoDetailedDescription = ({selectedRepo}) => {

  const dispatch=useDispatch();
  return (
    <RepoDetailedDescriptionContainer style={{ flex: "0.75" }}>
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
        <h4>Categories</h4>
      </RepoImageContainer>
      <RepoDetailsContainer>
        <i class="fas fa-arrow-left" onClick={() => dispatch(viewRepoList())}></i>
        <div>Application</div>
        <div>{selectedRepo.name}</div>
        <PlanButton>Set up a plan</PlanButton>
        <div>{selectedRepo.description ? selectedRepo.description : ""}</div>
      </RepoDetailsContainer>
    </RepoDetailedDescriptionContainer>
  );
}

export default RepoDetailedDescription