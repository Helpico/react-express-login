import React, { useEffect, useState } from "react"
import Axios from "axios"
import About from "./About"
import { Link } from "react-router-dom"

function Home() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [secret, setSecret] = useState("")

    
  useEffect(() => {
    document.title = "Login Page | The Test App";
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await Axios.post("/secret", { userEmail, userPassword })
    setSecret(response.data)
  
  }
 
  if (secret.status === "success") {
    return (
          <div className="">
            <h2>Your email: {secret.client.email}</h2>
            <h2>Your password: {secret.client.password}</h2>
        </div>
      )
  }
  


  return(
    <div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
      {secret.status === "failure" && <div><h2>That is incorrect. Try again.</h2></div>}
        <label>
          <p>User's Email</p>
          <input type="text" onChange={e => setUserEmail(e.target.value)} />
        </label>
        <label>
          <p>User's Password</p>
          <input type="text" onChange={e => setUserPassword(e.target.value)} />
        </label>
        
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Home