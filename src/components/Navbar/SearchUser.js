import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import {DebounceInput} from 'react-debounce-input';
import { Link } from 'react-router-dom';

export default function SearchUser(){
    const {userInfo} = useContext(UserContext);
    const [user, setUser] = useState("");
    const [userList,setUserList] = useState([]);
    const [showList, setShowList] = useState(false)
    
    if(user.length <3 && showList){
        setShowList(false)
    }
    
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    useEffect(()=>{
  
    const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${user}`, config)
    request.then(promisse =>setUserList(promisse.data.users))
    
}   ,[user]);

    userList.sort(function(x, y) {
    
    return (x.isFollowingLoggedUser === y.isFollowingLoggedUser)? 0 : x.isFollowingLoggedUser? -1 : 1;
    });

    return(
        <SearchUserBox showList={showList}> 
       <LenIcon><BsSearch color="#c6c6c6"/></LenIcon> 
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          type="text"
          onChange={event => {setUser(event.target.value); setShowList(true)}} placeholder="Search for people and friends"/>
          <ul>
        {
        userList.map(currentUser => {
            return(user.length >2?
            <Link to={`/user/${currentUser.id}`}><li key={`k${currentUser.id}`}><img src={currentUser.avatar}/><h1>{currentUser.username}</h1> <p>{currentUser.isFollowingLoggedUser?<span>• following</span>:null}</p></li></Link>
            : null)
        })
        }
        </ul>
        </SearchUserBox>
    )
}

const SearchUserBox = styled.span`
    width: 40vw;
    height: 45px;
    position: relative;
    font-family: 'Lato';
    input{
        width: 100%;
        height: 100%;
        background-color: #fff;
        color:#c6c6c6;
        border-radius: 8px;
        padding: 0 0 0 10px;
        
    }
    ul{
        width: 100%;
        height: 45px;
        font-size: 19px;
        overflow: scroll;
        height:${proops => proops.showList?  "60vh":"0vh"};
        
        img{
            width: 39px;
            height: 39px;
            object-fit: cover;
            border-radius: 50px;
            margin:10px;
        }
        h1{
            color: #515151;
        }
        p{
            color: #c5c5c5;
            margin: 0 0 0 10px;
        }
        li{
            width: 100%;
            height: 45px;
            background-color: #e7e7e7;
            font-size: 19px;
            display: flex;
            align-items: center;
        }
    }

    @media(max-width:1000px){
        width: 90vw;
        position: fixed;
        top: 82px;
        left:5vw;
        right: 5vw;
    }
`
const LenIcon = styled.div`
    position: absolute;
    top:10px;
    right: 10px;
`
