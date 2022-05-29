import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import styled from "styled-components";
import { getRepositories, loadRepositories } from '../features/repository';

import RepoItem from './RepoItem';

export const ListContainer = styled.div`
  flex: 0.75;
  display: flex;
  flex-wrap: wrap;
  background: #fcfcfc;
  justify-content: center;
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding: 0 2.5vw;
`;


export const ItemContainer = styled.div`
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

export const ImgContainer = styled.div`
  flex: 0.2;
`;

export const Img = styled.img`
  object-fit: contain;
  height: 60px;
`;

export const InfoContainer = styled.div`
  flex: 0.8;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

export const InfoName = styled.div`
  text-decoration: none;
  color: #0076ce;
  font-size: 24px;
  word-break: break-word;
`;



const List = () => {

  const dispatch=useDispatch();

  const { repos, userFollowers, listViewType, searchedUsersDict } = useSelector(
    (state) => state.repository
  );

  return (
    <ListContainer>
      {listViewType === "repository" && (
        <>
          {repos.length ? (
            <>
              {repos.map((repo) => (
                <RepoItem key={repo.node_id} repo={repo} />
              ))}
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              Please enter a valid username in the Search bar at the top.
            </div>
          )}
        </>
      )}
      {listViewType === "followers" &&
        userFollowers.map((follower) => (
          <ItemContainer key={follower.id}>
            <ImgContainer>
              <Img
                src={follower.avatar_url}
                alt={`avatar_${follower.node_id}`}
              />
            </ImgContainer>
            <InfoContainer
              onClick={() => {
                if (searchedUsersDict?.[follower.login]) {
                  dispatch(loadRepositories(searchedUsersDict[follower.login]));
                } else {
                  dispatch(getRepositories({ searchTerm: follower.login }));
                }
              }}
            >
              <InfoName>{follower.login}</InfoName>
            </InfoContainer>
          </ItemContainer>
        ))}
    </ListContainer>
  );
}

export default List