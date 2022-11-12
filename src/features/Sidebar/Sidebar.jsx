// Import custom module
import "./Sidebar.css";
import db, { auth } from "@service/firebase";
import StartChat from "@features/StartChat";
import { setDialogOpen } from "@features/StartChat/startChatSlice";
import SidebarChat from "@features/Sidebar/Chat";
import SidebarMorePopup from "@features/Sidebar/MorePopup";
import roomsData from "@data/rooms.json";
import { setRooms, getRooms } from "./sidebarSlice";

// Import Material UI Components
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";

// Import React related library
import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { getRoomData } from "@utils/room";

export default function Sidebar() {
  // usState objects here
  const rooms = useSelector(getRooms);
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  const [user, loading, error] = useAuthState(auth, {
    onUserChanged: (user) => {}
  });
  // call after mounting component
  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      where("members", "array-contains", user.uid)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        Promise.all(
          snapshot.docs.map(async (doc) => {
            return await getRoomData(doc, user);
          })
        ).then((rooms) => {
          dispatch(setRooms(rooms));
          // console.log(rooms);
        });
      },
      (error) => {
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, []);

  // handlers

  const openOptionsMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchor(null);
  };

  return (
    <>
      <StartChat />
      <div className="sidebar">
        <div className="sidebar__header">
          <Avatar src={user.photoURL} />
          <div className="sidebar__headerRight">
            <Tooltip title="Status">
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Start New Chat">
              <IconButton onClick={() => dispatch(setDialogOpen(true))}>
                <ChatIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="More">
              <IconButton onClick={openOptionsMenu}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <SidebarMorePopup
              anchorEl={anchor}
              handleClosePopup={handleClosePopup}
            />
          </div>
        </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlinedIcon />
            <input type="text" placeholder="Search or start new chat" />
          </div>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </div>
        <List className="sidebar__chats">
          <SidebarChat archived />
          {rooms.map((room) => (
            <SidebarChat key={room.id} room={room} />
          ))}
        </List>
      </div>
    </>
  );
}
