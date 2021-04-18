import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import Cookies from 'js-cookie';
import { Layout } from 'antd';
import "./style.css";

const { Header } = Layout;

const Ant = () => {

  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [secret, setSecret] = useState("");
 



  useEffect(() => {
    let email = Cookies.get('simpletest')
    if (email) {
      setSecret({client:{ email, password: "client"}, status: "success"}) // to further eleborate on password to be dynamic
    } else {
      setSecret({client:{}, status: "failure"})
    }
    document.title = "Login Page | The Test App";
  }, [])

  // Getting authenticated user's data from backend
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await Axios.post("/secret", { userEmail, userPassword })
    setSecret(response.data)
  
  }
  
  // Load with authenticated status
  async function Logged(e) {
    e.preventDefault()
    const response = await Axios.get("/login", { })
    return response.data
  }
  
  // Removes the cookie (users' data upload impossible) & redirect to login page  
  async function Logout(e) {
    e.preventDefault()
    const response = await Axios.get("/logout", {email: "", password: ""})
    setSecret(response.data)
  }
 
  if (secret.status === "success") {
    // Login Form on successfull loggin in
    
    return (
          <div className="">
            <h2>Cookie: <small>{Cookies.get('simpletest')}!</small></h2>
            <h2>Welcome, <small>{secret.client.email}!</small></h2>
            <h2>Your secret password is: <small>{secret.client.password}</small>.</h2>
            <input type="hidden" name="_csrf" value="${req.csrfToken()}" /> 
            <button onClick={Logout}>Logout</button>
        </div>
      )
  }
 
  // Initial default empty Login Form
  return (
    <div className="">
      <Layout>
        <Header>
          <h1 className="title">Programming Test App</h1>
        </Header>
      </Layout>
    <h2>Please, log in!</h2>
      <form onSubmit={handleSubmit}> 
          {secret.status === "failure" && <div><h4>Email or password is incorrect.</h4></div>}
          <label>
            <p>Your email: </p>
            <input type="text" onChange={e => setUserEmail(e.target.value)} />
          </label>
          <label>
            <p>Your password: </p>
            <input type="text" onChange={e => setUserPassword(e.target.value)} />
          </label>
          <input type="hidden" name="_csrf" value="${req.csrfToken()}" />   
          <p>
            <button type="submit">Log In</button>
          </p>
      </form>
      <br></br>
      <div>There are three users in our database:
        <ol>
        <li><i>c1@example.com</i></li>
        <li><i>c2@example.com</i></li>
        <li><i>c3@example.com</i></li> 
        </ol>
      </div>
      <div>For simplicity, they share a common password of <i><b>client</b></i>.</div>
      <div>After loggin in, personal user's info is pulled out from DB.</div>
      <div>Reload of data from DB, based on caching, enabled.</div>
      <div>Ant.design styling is partly applied.</div>
    </div>    
  );
};

ReactDOM.render(<Ant />, document.getElementById("app"))



