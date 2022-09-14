import { getUserByUID } from "@api/user";

export const getMessageData = async (room, doc, currentUser) => {
  let id = doc.id;
  let messageData = doc.data();
  let { message, sentBy, timestamp } = messageData;
  let sentByUser = await getUserByUID(sentBy);
  let senderName = sentByUser.name;
  let isSendByMe = currentUser.uid === sentByUser.uid;
  let isGroup = !room.isPrivate;
  timestamp = new Date(timestamp?.toDate()).toUTCString();
  return { id, message, isGroup, isSendByMe, senderName, timestamp };
};
