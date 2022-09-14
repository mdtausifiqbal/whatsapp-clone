import "./Login.css";
import logo from "@assets/WhatsApp.png";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "@service/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="login">
      <img src={logo} alt="logo" className="login__logo" />
      <h1 className="login__title">Login to WhatsApp</h1>
      {loading ? (
        <CircularProgress color="success" />
      ) : (
        <Button
          startIcon={<GoogleIcon />}
          variant="contained"
          onClick={() => signInWithGoogle()}
        >
          SIGN IN WITH GOOGLE
        </Button>
      )}
    </div>
  );
}
