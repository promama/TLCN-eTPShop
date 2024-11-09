import { GoogleLogin } from "react-google-login";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchTestUser } from "../../slices/userSlice";

const clientId =
  "679762798993-no2af9mhhgofk87c36scuea6jnraarca.apps.googleusercontent.com";

function MyGoogleLogin() {
  const dispatch = useDispatch();
  const onSuccess = async (res) => {
    //dispatch hashing stuff
    const data = await dispatch(fetchTestUser()).unwrap();
    alert(data);
    console.log("Login success, current user: ", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("Login fail, res: ", res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedI={true}
      />
    </div>
  );
}

export default MyGoogleLogin;
