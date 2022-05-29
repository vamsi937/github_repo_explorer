import React from 'react'
import styled from "styled-components";
import { useDispatch } from 'react-redux';

import { viewRepoDescription } from '../features/repository';

const RepoItemContainer = styled.div`
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  height: auto;
  margin: 10px 0;
  cursor: pointer;
  min-width: 275px;
  :hover {
    // border: 1px solid #e1e1e1;
    // border-radius: 10px;
    // background: #f3ffff;
  }
`;

const RepoImgContainer=styled.div`
    flex: 0.2;
`;

const RepoImg=styled.img`
    object-fit: contain;
    height: 60px;
`;

const RepoInfoContainer = styled.div`
  flex: 0.8;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const RepoName = styled.div`
  text-decoration: none;
  color: #0076ce;
  font-size: 24px;
  word-break: break-word;
`;

const RepoDesc = styled.div`
  width: 100%;
  margin-top: 5px;
  word-break: break-word;
  font-size: 14px;
  color: #aaa;
`;

const RepoItem=({repo})=>{

  const dispatch=useDispatch();

    const showRepoDescriptionHelper = () => {
      dispatch(viewRepoDescription(repo));
    };


    return (
      <RepoItemContainer key={repo.note_id}>
        <RepoImgContainer>
            <RepoImg src={repo.owner.avatar_url} alt="avatar" />
        </RepoImgContainer>
        <RepoInfoContainer onClick={showRepoDescriptionHelper}>
          <RepoName>{repo.name}</RepoName>
          <RepoDesc>
            {repo.description?.slice(0,30)}{repo.description?.length>30?"...":""}
          </RepoDesc>
        </RepoInfoContainer>
      </RepoItemContainer>
    );
}

export default RepoItem;