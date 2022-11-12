import React from "react";
import "./ChatMessage.css";

export default function ChatMessage({
  chatMsg,
  timestamp,
  isGroup,
  senderName,
  isSendByMe
}) {
  return (
    <p
      className={`chatMessage ${
        isSendByMe ? " chat__receiver" : "chat__sender"
      }`}
    >
      {chatMsg}
      {isGroup && <span className="chat__name">{senderName}</span>}
      <span className="chat__timestamp">{timestamp}</span>
    </p>
  );
}
