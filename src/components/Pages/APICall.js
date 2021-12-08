import React, { useState, useEffect } from 'react'
// import { NavLink } from "react-router-dom";
import Loading from '../Layout/Github-User-Card/Loading.js';
import GithubUserCards from "../Layout/Github-User-Card/Github-User-Card";

const APICall = () => {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
      try {
          const response = await fetch('https://api.github.com/users');
           setLoading(false);
          setUsers(await response.json());
      } catch (error) {
          setLoading(false);
          console.log("my error is "+ error);
      }
  }

  useEffect(() => {
      getUsers();
  }, []);

  if (loading) {
      return <Loading />
  }
  return (
    <>
          <GithubUserCards users={users}/>
    </>
  );
};

export default APICall;
