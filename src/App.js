import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useState } from 'react';
const app = initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({})
  const GoogleProvider = new GoogleAuthProvider();
  const GitProvider = new GithubAuthProvider();
  const FbProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        setUser(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        console.log(errorCode, errorMessage, email)
      });
  }

  const handleGitSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, GitProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  const handleFbSignIn = () => {

    const auth = getAuth();
    signInWithPopup(auth, FbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // ...
        setUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage )
      });

  }
  const { displayName, email, photoURL } = user
  const styleButons = {
    padding:'10px',
    margin:'10px',
    backgroundColor:'#FA3E3E',
    border:'none',
    color:'white',
    fontSize:'17px',
    cursor:'pointer'
  }
  return (
    <div style={{textAlign:'center', marginTop:'30px'}}>
      <button style={styleButons} onClick={handleGoogleSignIn}>Google Sign In </button>
      <button style={styleButons} onClick={handleGitSignIn}>Github sign in</button>
      <button style={styleButons} onClick={handleFbSignIn}>Facebook Sign In</button>
      <div>
        <h3>{displayName}</h3>
        <p>{email}</p>
        <img src={photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
