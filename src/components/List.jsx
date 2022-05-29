import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import styled from "styled-components";
import { getRepositories } from '../features/repository';

import RepoItem from './RepoItem';

const ListContainer = styled.div`
  flex: 0.75;
  display: flex;
  flex-wrap: wrap;
  background: #fcfcfc;
  justify-content: center;
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding: 0 2.5vw;
`;


const ItemContainer = styled.div`
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

const ImgContainer = styled.div`
  flex: 0.2;
`;

const Img = styled.img`
  object-fit: contain;
  height: 60px;
`;

const InfoContainer = styled.div`
  flex: 0.8;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const InfoName = styled.div`
  text-decoration: none;
  color: #0076ce;
  font-size: 24px;
  word-break: break-word;
`;



const List = () => {

  const dispatch=useDispatch();

  const { repos, userFollwers, listViewType } = useSelector(
    (state) => state.repository
  );

  return (
    <ListContainer>
      {listViewType === "repository" &&
        repos.map((repo) => <RepoItem key={repo.node_id} repo={repo} />)}
      {listViewType === "followers" &&
        userFollwers.map((follower) => (
          <ItemContainer key={follower.id}>
            <InfoContainer>
              <InfoName
                onClick={() => {
                  dispatch(getRepositories({ searchTerm: follower.login }));
                }}
              >
                {follower.login}
              </InfoName>
            </InfoContainer>
            <ImgContainer>
              <Img
                src={follower.avatar_url}
                alt={`avatar_${follower.node_id}`}
              />
            </ImgContainer>
          </ItemContainer>
        ))}
    </ListContainer>
  );
}

export default List