import React, { useState } from "react";
import SearchBar from "../Searchbar/SearchBar";
import Users from "../User/Users";
import "./AdminPanel.css";

import { HearingDisabledOutlined } from "@mui/icons-material";
import Pagination from "../Pagnation/Pagination";

const AdminPanel = ({ search, user,handleEdit,setUser,debounceSearch}) => {
  const [editingUser, setEditingUser] = useState(false);
  const [selectAllUser, setSelectAllUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectCheckbox, setSelectCheckbox] = useState([]);
 

  const handleSelectUser = (userId) => {
    let arr;
    if (selectCheckbox.includes(userId)) {
      arr = selectCheckbox.filter((user) => {
        return user !== userId;
      });
    } else {
      arr = [...selectCheckbox, userId];
    }

    setSelectCheckbox(arr);
  };


  const selectAll = () => {
    if (selectCheckbox.length !== 10) {
      setSelectAllUser(true);
      setSelectCheckbox(
        rowsToShow.map((user) => {
          return user.id;
        })
      );
    } else {
      setSelectAllUser(false);
      setSelectCheckbox([]);
    }
    
  };



  const deleteUser = (selectedUser) => {
    let userAfterDeletion = user.filter((person) => {
      return person.id !== selectedUser;
    });
    setUser(userAfterDeletion);
  };

  const deleteMultipleOrAll = () => {
    const updatedList = user.filter(
      (person) => !selectCheckbox.includes(person.id)
    );
    setUser(updatedList);
    
  };

  const [currentPage, setCurrentPage] = useState(1);


  const rowsInPage = 10;
  const pages = Math.ceil(user.length / rowsInPage);
  const lastIndex = currentPage * rowsInPage;
  const firstIndex = lastIndex - rowsInPage;

  const rowsToShow = user.slice(firstIndex, lastIndex);

  const goBack = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToFirst = () => {
    setCurrentPage(1);
  };

  const goToLast = () => {
    setCurrentPage(pages);
  };

  const goNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const pageButtons = () => {
    const buttons = [];
    for (let page = 1; page <= pages; page++) {
      buttons.push(
        <button
          className="pageButton"
          key={page}
          onClick={() => goToPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <SearchBar search={search} debounceSearch={debounceSearch}/>

      <table>
        <thead>
          <tr>
            <td>
              <input className="checkbox" type="checkbox"   checked={selectAllUser}
                  onClick={selectAll}></input>
            </td>

            <th>
              <strong>Name</strong>
            </th>
            <th>
              <strong>Email</strong>
            </th>
            <th>
              <strong>Role</strong>
            </th>
            <th>
              <strong>Actions</strong>
            </th>
          </tr>
        </thead>
      {user.length > 0 ?(
        <tbody>
          {rowsToShow.map((person) => {
            return (
              <Users
                 handleEdit={handleEdit}
                user={person}
                key={person.id}
                deleteUser={deleteUser}
                checked={selectCheckbox.includes(person.id)}
                selectUser={() => handleSelectUser(person.id)}
                deleteMultipleOrAll={deleteMultipleOrAll}
              />
            );
          })}
        </tbody>
      )  : <h5>no user in panel</h5>}
      </table>


      <Pagination
        user={user}
        rowsInPage={rowsInPage}
        rowsToShow={rowsToShow}
        pageButtons={pageButtons}
        goToFirst={goToFirst}
        goBack={goBack}
        goNext={goNext}
        goToLast={goToLast}
        currentPage={currentPage}
        deleteMultipleOrAll={deleteMultipleOrAll}
      />

    </div>
  );
};

export default AdminPanel;
