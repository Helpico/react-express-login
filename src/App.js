  
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import Axios from "axios"

function App() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [secret, setSecret] = useState("")
      
  useEffect(() => {
    document.title = "Login Page | The Test App";
  }, [])

  // Getting authenticated user's data from backend
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await Axios.post("/secret", { userEmail, userPassword })
    setSecret(response.data)
  
  }
 
  if (secret.status === "success") {
    // Login Form on successfull loggin in
    
    // LogOut component
    const Logout = () => {
      setSecret({email: "", password: ""});
    }
    
    return (
          <div className="">
            <h2>Welcome, <small>{secret.client.email}!</small></h2>
            <h2>Your secret password is: <small>{secret.client.password}</small>.</h2>
            <button onClick={Logout}>Logout</button>
        </div>
      )
  }
 
  // Initial default empty Login Form
  return (
    <div className="">
      <h2>Please, log in!</h2>
      <form onSubmit={handleSubmit}> 
          {secret.status === "failure" && <div><h4>That is incorrect. Try again.</h4></div>}
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
      <div>Use anyone to log in with a password of <i><b>client</b></i></div>
      <div>After logging in, go to the page: "/login" and reload</div> 
    </div>    
  )
}

ReactDOM.render(<App />, document.getElementById("app"))