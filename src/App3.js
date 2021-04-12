  
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import Axios from "axios"
import Cookies from 'js-cookie'                             // cookie 

function App() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [secret, setSecret] = useState("")
  
  useEffect(() => {
    document.title = "Login Page | The Test App"; 
  }, [])

  if (document.cookie.includes('logged')) {
    async function reRender(e) {
      const response = await Axios.get("/secret")
      response.data

      // ... fire the axios get request
    }
  }

  // Getting authenticated user's data from backend
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await Axios.post("/secret", { userEmail, userPassword })
    setSecret(response.data)
  }

  // On successfull loggin in
  if (secret.status === "success") {
 
    Cookies.set("logged", secret.status);                   // cookie

    // LogOut component
    const Logout = () => {
      setSecret({email: "", password: ""});
      Cookies.remove("logged");                             // cookie
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
          <div>
            <button type="submit">Log In</button>
          </div>
    </form> 
    </div>    
  )
}

ReactDOM.render(<App />, document.getElementById("app"))