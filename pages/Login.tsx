import { FC, useState, useEffect } from "react";
import { Input, Button } from "../components";
import styles from "../styles/Signup.module.scss";
import { auth } from "../constants/firebase";
import { Toast, Spinner } from "../components";
import { FaTimes, FaCheck, FaBomb } from "react-icons/fa";
import Router from "next/router";
import Link from "next/link";
import {motion} from 'framer-motion'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const Login: FC = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const clientId = '756499025800-b2fjci3tvanu0v56v94spscklspsh9kb.apps.googleusercontent.com';

  useEffect(() => {
   const initClient = async () => {
      await gapi.client.init({
         clientId: clientId,
         scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
}, []);

  const onSuccess = (res) => {
        console.log('success:', res);
    };
    
  const onFailure = (err) => {
        console.log('failed:', err);
    };
  
  const showSignupForm = () => {
    props.setShowForm(!props.showForm)
    props.setShowSignup(!props.showSignup)
  }

  const login = async (e, email, password) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      try {
        const res = await auth.signInWithEmailAndPassword(email, password);
        const _user = res.user;
        setUser(_user);
        setLoading(false);
        setShowToast(true);
        Router.push("/MainNav");
      } catch (err) {
        console.error(err);
        setShowToast(true);
        setTimeout(() => {
         setShowToast(false);
        }, 3000);
        alert(err)
        setLoading(false);
      }
    } else {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
    }
  };



  return (
    
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.1 }} 
      className={styles.login}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {showToast ? (
          <Toast
            msg={
              user
                ? "Login Successful!"
                : "error, incorrect username/password."
            }
            closeIcon={
              <FaTimes
                className={styles.close_icon}
                onClick={() => setShowToast(false)}
              />
            }
            icon={
              user ? (
                <FaCheck className={styles.icon} />
              ) : (
                <FaTimes className={styles.icon} />
              )
            }
          />
        ) : (
          ""
        )}
        {showWarning ? (
          <Toast
            msg={"Please Fill In All Credentials!"}
            icon={<FaBomb className={styles.icon} />}
            closeIcon={
              <FaTimes
                className={styles.close_icon}
                onClick={() => setShowWarning(false)}
              />
            }
          />
        ) : (
          ""
        )}
        <form action={props.action} className={styles.form}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <Input
              placeholder={"Password"}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <Button bg={loading ? '#fff' : ''} text={loading ? <Spinner /> : 'Login'} onClick={(e) => login(e, email, password)} />
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
          <Button bg={'#fff'} color={'red'} text={'Cancel'} onClick={() => props.setShowForm(!props.showForm)} />
          <p className={styles.login_url}>
            Don't have an account?{" "}
            <span className={styles.url} onClick={showSignupForm}>Signup here
            </span>
          </p>
        </form>
      </div>
    </div>
    </motion.div>
  );
};

export default Login;
