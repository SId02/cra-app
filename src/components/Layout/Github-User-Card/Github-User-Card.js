import React from 'react'
//import { NavLink } from "react-router-dom";
const GithubUserCards = ({users}) => {
    return (
        <>
        <div>
          <h2 className="p-5 text-center text-uppercase">List of GitHub Users</h2>
            <div className="container mt-5 mb-5">
                <div className="text-center row">   
                {
                        users.map((curElem) => {
                            const {id, avatar_url, login} = curElem;
                        return (
                              <div className="mt-5 col-lg-4" key={id}>
                                 <div className="p-3 mb-5 rounded shadow card bg-body">
                                      <div className="card-body">
                                            <img src={ avatar_url } class="rounded rounded-circle" width="140" height="140" alt="avatar" />
                                            <h5 class="card-title p-3">{login} </h5>
                                      </div>
                                </div>
                               </div>
                        )
                    })        

                }
                </div>
            </div>
            </div>
        </>
      
    )
}

export default GithubUserCards;

