import { getUserByUID } from "@api/user";

export const getRoomData = async (room, currentUser) => {
  let id = room.id;
  let roomData = room.data();
  let { name, photoURL } = await getRoom(roomData, currentUser);
  return Object.assign(roomData, { id, name, photoURL });
};

export const getRoom = async (room, currentUser) => {
  if (room) {
    if (!room.isPrivate) {
      return {
        name: room.name,
        photoURL: room.photoURL
      };
    } else {
      let other_user = await getOtherUserInRoom(room, currentUser);
      if (other_user) {
        return {
          name: other_user.name,
          photoURL: other_user.photoURL
        };
      }
    }
  }
  return { name: "Private Room", photoURL: "" };
};

export const getOtherUserInRoom = async (room, currentUser) => {
  let members = [...room.members].filter((member) => member != currentUser.uid);
  let other_user = await getUserByUID(members[0]);
  return other_user;
};
