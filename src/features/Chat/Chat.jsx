import ChatHeader from "@features/Chat/Header";
import ChatBody from "@features/Chat/Body";
import ChatFooter from "@features/Chat/Footer";
import "./Chat.css";

export default function Chat() {
  return (
    <div className="chat">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}
