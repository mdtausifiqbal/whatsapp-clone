import "./ChatHeader.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { getRoom } from "@features/Chat/chatSlice";

export default function ChatHeader() {
  const room = useSelector(getRoom);
  return (
    <div className="chat__header">
      <Avatar src={room.photoURL} />
      <div className="chat__headerInfo">
        <Typography component="h3">{room.name}</Typography>
        <p>Last Seen at ...</p>
      </div>
      <div className="chat__headerRight">
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
        <IconButton id={"btn_more"}>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}
