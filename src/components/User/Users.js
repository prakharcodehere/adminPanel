import axios from "axios";
import React, { useState } from "react";
import "./Users.css";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";


import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const Users = ({ user ,handleEdit, key,checked, selectUser,deleteUser}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (event) => {
    setIsModalOpen(true)
    setUserData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
    
  };
 



  return (
    <>
   
        <tbody>
          <tr key={key}  className={ checked ? 'selected-row' : 'normal-row'}>
            <td>
              <input type="checkbox" checked={checked} onClick={selectUser}/>
            </td>
            
            <td> {userData.username}</td>
            <td>{userData.email}</td>
            <td>{userData.role}</td>
            <td>
              <div>
                <button className="actionButton" onClick={handleChange}>  
                <CreateTwoToneIcon/>
                </button>
                <button className="actionButton"  >
                 <DeleteTwoToneIcon onClick={() => deleteUser(user.id)}/>
                </button>
              </div>
            </td> 

    
       



          </tr>
        </tbody>

        {isModalOpen && (
         <div className="modal-content">
        
        
         <input className="input" placeholder="name" name="username"  value={userData.username} onChange={handleChange}/>
         <input className="input"  placeholder="enter email"  name="email" value={userData.email} onChange={handleChange}/>
         <input className="input" placeholder="enter role" name="role" value={userData.role} onChange={handleChange}/>
         <button className="btnInput" onClick={() => setIsModalOpen(false)}>Close</button>
       </div>
      )}

    </>
  );
};

export default Users;
