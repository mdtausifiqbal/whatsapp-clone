import "./ChatFooter.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { getRoom } from "@features/Chat/chatSlice";
import db, { auth } from "@service/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ChatFooter() {
  const dispatch = useDispatch();
  const room = useSelector(getRoom);
  const [user, loading, error] = useAuthState(auth);
  const [msg, setMsg] = useState("");
  const sendMessage = (event) => {
    event.preventDefault();
    addDoc(collection(doc(db, "rooms", room.id), "messages"), {
      message: msg,
      sentBy: user.uid,
      timestamp: serverTimestamp(),
      deletedFor: []
    })
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
    setMsg("");
  };
  return (
    <div className="chat__footer">
      <IconButton>
        <EmojiEmotionsOutlinedIcon />
      </IconButton>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <Box
        className="chat__footerInput"
        component="form"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }} onClick={sendMessage}>
          Send a message
        </button>
      </Box>
      <IconButton>
        <MicIcon />
      </IconButton>
    </div>
  );
}
