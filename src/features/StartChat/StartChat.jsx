import "./StartChat.css";
import InputDialog from "@components/InputDialog";
import { useSelector, useDispatch } from "react-redux";
import { getDialogOpen, setDialogOpen } from "./startChatSlice";
import { showToast, showLoading } from "@components/basicUISlice";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import db, { auth } from "@service/firebase";
import { getRooms } from "@features/Sidebar/sidebarSlice";
import { useAuthState } from "react-firebase-hooks/auth";

export default function StartChat() {
  const openDialog = useSelector(getDialogOpen);
  const rooms = useSelector(getRooms);
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth, {
    onUserChanged: (user) => {}
  });

  const toggleDialog = (open) => dispatch(setDialogOpen(open));

  const startNewChat = (input) => async (dispatch) => {
    let email = input.trim();
    if (email.includes("@")) {
      toggleDialog(false);
      dispatch(showLoading(true));
      //Perform a query to fetch user uid using email
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      let userSnapshots = await getDocs(userQuery);
      if (userSnapshots.docs.length > 0) {
        let userDoc = userSnapshots.docs[0].data();
        let other_uid = userDoc.uid;

        // Check if user is already started a chat with other user

        let filteredRooms = rooms.filter(
          (room) => room.isPrivate && room.members.includes(other_uid)
        );

        if (filteredRooms.length > 0) {
          dispatch(
            showToast({ message: "Your are already initiated chat with him" })
          );
        } else {
          let roomData = {
            isPrivate: true,
            members: [other_uid, user.uid]
          };
          let docData = await addDoc(collection(db, "rooms"), roomData);
          dispatch(
            showToast({
              message: `Private Room created successfully`,
              type: "success"
            })
          );
        }
        dispatch(showLoading(false));
      } else {
        let error = new Error("No user found with given email id");
        throw error;
      }
    } else {
      let error = new Error("Please enter valid email address");
      error.name = "ValidationError";
      throw error;
    }
  };

  return (
    <InputDialog
      config={{
        id: "new-chat-dialog",
        title: "Start new chat",
        message: "Enter your friends email address to start chat with him",
        onClose: () => {
          toggleDialog(false);
        },
        textfield: {
          id: "email",
          type: "email",
          placeholder: "Enter email id"
        },
        positive: {
          label: "Start Chat",
          callback: (email) => {
            dispatch(startNewChat(email))
              .then(() => {})
              .catch((error) => {
                dispatch(showLoading(false));
                toggleDialog(false);
                if (error.name === "ValidationError") {
                  dispatch(
                    showToast({
                      message: error.message,
                      type: "warning"
                    })
                  );
                } else {
                  dispatch(
                    showToast({
                      message: error.message,
                      type: "error"
                    })
                  );
                }
              });
          }
        },
        negative: {
          label: "Cancel",
          callback: () => {
            toggleDialog(false);
          }
        }
      }}
      open={openDialog}
    />
  );
}
