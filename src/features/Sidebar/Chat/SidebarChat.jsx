import "./SidebarChat.css";
import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { setRoom } from "@features/Chat/chatSlice";
import { useDispatch } from "react-redux";
import { getRoomName } from "@utils/room";

export default function SidebarChat({ archived, room }) {
  const dispatch = useDispatch();
  return !archived ? (
    <>
      <ListItem
        className="sidebarChat"
        component={ListItemButton}
        id={room.id}
        onClick={() => dispatch(setRoom(room))}
      >
        <ListItemAvatar className="sidebarChat__avatar">
          <Avatar src={room.photoURL} />
        </ListItemAvatar>
        <ListItemText
          className="sidebarChat__info"
          primary={room.name}
          secondary="Last message..."
        />
      </ListItem>
      <Divider />
    </>
  ) : (
    <>
      <ListItemButton>
        <ListItemIcon className="sidebarChat__archiveIcon">
          <ArchiveOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Archived" />
      </ListItemButton>
      <Divider />
    </>
  );
}
