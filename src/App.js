import logo from "./logo.svg";
import "./App.css";
import Users from "./components/User/Users";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/Searchbar/SearchBar";
import { EditAttributesOutlined } from "@mui/icons-material";
import AdminPanel from "./components/Adminpanel/AdminPanel";

const App = () => {
  const [user, setUser] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [debounce, setDebounce] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editUserId, setEditUserId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUser(response.data);
      setFilteredUsers(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error occured");
    }
  };

  const debounceSearch = (event, debounceTimeout) => {
    setLoading(true);
    if (debounce) {
      clearTimeout(debounce);
    }
    const debounceCall = setTimeout(() => {
      const searchResult = user.filter((item) => {
        console.log(item.name.toLowerCase());
        return (
          item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.email.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.role.toLowerCase().includes(searchItem.toLowerCase())
        );
      });
      if (event.target.value === "") {
        setUser(fetchData());
      }
      setUser(searchResult);
    }, debounceTimeout);
    setDebounce(debounceCall);
    setCurrentPage(1);
    setLoading(false);
  };

  const search = (e) => {
    setSearchItem(e.target.value);
    debounceSearch(e, 500);
  };

  const handleEdit = (id) => {
    const rowToEdit = filteredUsers.find((user) => user.id === id);
    setEditRowData(rowToEdit);
    setIsModalOpen(true);
  };

  const deleteSelectedUser = (id) => {
    setUser((prevUser) => prevUser.filter((user) => user.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <AdminPanel
        setUser={setUser}
        user={user}
        handleEdit={handleEdit}
        deleteSelectedUser={deleteSelectedUser}
        search={search}
      />
    </div>
  );
};

export default App;
