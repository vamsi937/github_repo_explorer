import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import styled from "styled-components";

import { getUserFollowers, loadFollowers, viewRepoList } from "../features/repository";

const UserInfoContainer = styled.div`
  flex: ${(props) => (props.showRepoDescription ? 0 : 0.25)};
  display: ${(props) => (props.showRepoDescription ? "none" : "flex")};
  justify-content: center;
  text-align: center;
  padding-top: 5vh;
  border-right: 0.5px solid #eee;
`;

const UserAvatarImg=styled.img`
  width:85%;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  :hover{
    transform: scale(1.05);
  }
`;

const UserDetailsHeader = styled.div`
  display: block;
  color: #000;
  margin: 10px 0;
`;

const ProfileName = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0;
`;

const ProfileUserName=styled.a`
text-decoration:none;
color: #555;
font0size: 20px;
`;

const FollowDetailsButton = styled.button`
  background: #fff;
  border: 1px solid #ccc;
  font-weight: bolder;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  :hover {
    background: #f9f9f9;
  }
`;

const UserInfo = () => {

  const [fetchedUserDetails,setFetchedUserDetails]=useState(null);

  const {
    userDetails: userInfo,
    followersDict,
    listViewType,
    showRepoDescription,
  } = useSelector((state) => state.repository);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(userInfo){
        console.log(userInfo);
        fetchUserDetailsHelper(userInfo.login);
    }
  },[userInfo])
  
  const fetchUserDetailsHelper = async (username) => {
    await fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFetchedUserDetails(data);
      })
      .catch((err) => console.log(err.message));
  };

  const showUserFollowers=async ()=>{
    if(followersDict?.[userInfo?.login]){
      dispatch(loadFollowers(followersDict?.[userInfo?.login]));
    }else{
      dispatch(getUserFollowers({ userName: userInfo.login }));
    }
  }

  const moveBackToRepoList=()=>{
    dispatch(viewRepoList());
  }

  return (
    <UserInfoContainer showRepoDescription={showRepoDescription}>
      {userInfo && fetchedUserDetails ? (
        <div style={{ position: "relative" }}>
          <UserAvatarImg src={userInfo.avatar_url} alt="avatar" />
          <UserDetailsHeader>
            <ProfileName>{fetchedUserDetails.name}</ProfileName>
            <ProfileUserName href={userInfo.html_url} target="_blank">
              {userInfo.login} <i class="fas fa-link"></i>
            </ProfileUserName>
          </UserDetailsHeader>
          <FollowDetailsButton
            onClick={
              listViewType === "repository"
                ? showUserFollowers
                : moveBackToRepoList
            }
          >
            {listViewType === "repository" ? (
              <>
                <i className="fas fa-user"></i>
                View {fetchedUserDetails?.followers} Followers{" "}
              </>
            ) : (
              <>
                <i className="fas fa-arrow-left"></i>
                Back to Repos
              </>
            )}
          </FollowDetailsButton>
          <div style={{ position: "absolute", bottom: "10px", left: "50px" }}>
            Joined on {new Date(fetchedUserDetails?.created_at).toDateString()}
          </div>
        </div>
      ) : (
       <div style={{textAlign:"center",display:"flex",alignItems:"center"}}>
         <h3>Welcome to the Github Repo Explorer</h3>
       </div>
      )}
    </UserInfoContainer>
  );
}

export default UserInfo