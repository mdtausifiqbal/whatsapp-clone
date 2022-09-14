import "./ChatBody.css";
import ChatMessage from "@features/Chat/Body/Message/ChatMessage";
import db, { auth } from "@service/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { getRoom, getMessages, setMessages } from "@features/Chat/chatSlice";
import { useEffect } from "react";
import { getMessageData } from "@utils/chat";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ChatBody() {
  const dispatch = useDispatch();
  const room = useSelector(getRoom);
  const messages = useSelector(getMessages);
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    let roomRef = doc(db, "rooms", room.id);
    let q = query(collection(roomRef, "messages"), orderBy("timestamp", "asc"));
    let unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        Promise.all(
          snapshot.docs.map(
            async (doc) => await getMessageData(room, doc, user)
          )
        ).then((messages) => {
          dispatch(setMessages(messages));
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, [room]);
  return (
    <div className="chat__body">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          chatMsg={msg.message}
          timestamp={msg.timestamp}
          isSendByMe={msg.isSendByMe}
          isGroup={msg.isGroup}
          senderName={msg.senderName}
        />
      ))}
    </div>
  );
}
