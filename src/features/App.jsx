import "./App.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "@features/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import Chat from "@features/Chat";
import Banner from "@features/Banner";
import Login from "@features/Login";
import { showToast } from "@components/basicUISlice";
import BasicUI from "@components/BasicUI";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@service/firebase";
import { getUserByUID, createUser } from "@api/user";
import { getRoom } from "@features/Chat/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import NetDetector from "@features/NetDetector";
// Create App Level Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#008069"
    }
  }
});
export default function App() {
  const room = useSelector(getRoom);
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth, {
    onUserChanged: (user) => {
      if (user) {
        createUserIfNotExist(user).catch((error) => {
          console.log("Failed to create user");
          dispatch(
            showToast({
              message: error.message,
              type: "danger"
            })
          );
        });
      }
    }
  });
  if (error) {
    console.error(error);
  }

  const createUserIfNotExist = async (user) => {
    let userDoc = await getUserByUID(user.uid);
    if (!userDoc) {
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      };
      await createUser(userData);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <div className="app__body">
          <BasicUI />
          <NetDetector>
            {loading ? (
              <Login />
            ) : (
              <>
                {user ? (
                  <>
                    <Sidebar />
                    {room ? <Chat roomId={room} /> : <Banner />}
                  </>
                ) : (
                  <Login />
                )}
              </>
            )}
          </NetDetector>
        </div>
      </div>
    </ThemeProvider>
  );
}
