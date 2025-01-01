import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
export default function Google({ informParent }) {
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential; // Extracting the token
    // console.log(credentialResponse); // Logging for debugging
    try {
      const response = await axios.post("/api/v1/googleLogin", {
        idToken: token, // Sending the token to backend
      }); // API endpoint

      // Passing the backend response to informParent
      informParent(response);
    } catch (error) {
      console.error("Error during Google Login:", error); // Handle any errors
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId="358381434775-9rcjh3e3bcg18022g8hphv09av00dkll.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}
