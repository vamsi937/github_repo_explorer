import React from 'react'
import styled from "styled-components";
import { useDispatch } from 'react-redux';

import { viewRepoDescription } from '../features/repository';
import { ListContainer , ItemContainer, ImgContainer, Img, InfoContainer, InfoName} from "./List";

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
      <ItemContainer key={repo.note_id}>
        <ImgContainer>
          <Img src={repo.owner.avatar_url} alt={`avatar_${repo.note_id}`} />
        </ImgContainer>
        <InfoContainer onClick={showRepoDescriptionHelper}>
          <InfoName>{repo.name}</InfoName>
          <RepoDesc>
            {repo.description?.slice(0, 30)}
            {repo.description?.length > 30 ? "..." : ""}
          </RepoDesc>
        </InfoContainer>
      </ItemContainer>
    );
}

export default RepoItem;