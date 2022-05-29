import React,{useState,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRepositories, loadRepositories, goToHomePage } from "../features/repository";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

const SearchContainer=styled.div`
    display: flex;
    height: 50px;
    background: #333;
    justify-content: space-between;
    color: #fff;
    align-items: center;
`;

const ApplicationName=styled.div`
  font-weight: bold;
  margin-left: 20px;
  cursor: pointer;
`;

const UsernameInput=styled.input`
    padding: 10px;
    border: 0.5px solid #ccc;
    height: 35px;
`;

const SearchButton=styled.button`
    background: black;
    color: #fff;
    padding: 0 10px;
    cursor:pointer;
    border: 1px solid #fff;
    height: 35px;
`;

const SearchUser = () => {

  const [search,setSearch] = useState('');
  const dispatch=useDispatch();
  const inputRef=useRef(null);
  const {searchedUsersDict}=useSelector(state=>state.repository);

  // const debouncedSearch=(cb,delay=500)=>{
  //   let timeout;
  //   return (...args)=>{
  //       clearTimeout(timeout);
  //       timeout = setTimeout(()=>{
  //           cb(...args);
  //       },delay);
  //   }
  // }

  // const searchHelper=debouncedSearch((text)=>{
  //     setSearch(text);
  // });

  const searchHandler=()=>{
    if(search.trim().length===0){
     toast.error("You cannot have an empty username!", {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
     });
      return;
    }else{
      if (searchedUsersDict[search]) {
        dispatch(loadRepositories(searchedUsersDict[search]));
      } else {
        dispatch(getRepositories({ searchTerm: search }));
      }
      setSearch("");
      inputRef.current.value = "";
    }
  }

  return (
    <>
      <SearchContainer>
        <ApplicationName onClick={()=>{
          dispatch(goToHomePage())
        }}>
          <i class="fab fa-github"></i> Repo Explorer
        </ApplicationName>
        <div>
          <UsernameInput
            placeholder="Enter Username"
            type="text"
            onChange={(e) => {
                setSearch(e.target.value);
            }}
            onKeyDown={(e)=>{
              if(e.keyCode===13){
                searchHandler();
              }
            }}
            value={search}
            ref={inputRef}
          />
          <SearchButton onClick={searchHandler}>
            <i class="fas fa-search"></i>
          </SearchButton>
        </div>
      </SearchContainer>
      <ToastContainer />
    </>
  );
}

export default SearchUser