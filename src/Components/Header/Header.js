import React from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Header({ user, signOut }) {
  return (
    <div className="header">
      <div className="header-left">
        <div onClick={signOut}>
          <Avatar className="header-avatar" alt={user.name} src={user.photo} />
        </div>
        <AccessTimeIcon />
      </div>
      <div className="header-search">
        <SearchIcon />
        <input placeholder="Search" />
      </div>
      <div className="header-right">
        <HelpOutlineIcon />
      </div>
    </div>
  );
}

export default Header;
