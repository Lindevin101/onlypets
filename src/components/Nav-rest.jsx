import React, { useState } from "react";
import "./Nav-rest.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavFeed = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageClick = () => {
    navigate("/"); //This should send me home but it isn't????:/
  };

  const handleSearch = () => {
    //This will send you to the searched user's profile page!!!!
    if (searchTerm.trim() !== "") {
      navigate(`/profile/${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-image-feed" onClick={handleImageClick}>
          <a href="/">
            <img src="images/pets.png" alt="pets-logo" className="logo-image" />
          </a>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavFeed;
