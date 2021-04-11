import React, { useEffect, useState } from "react"
import Axios from "axios"

function Home() {
  const [username, setUsername] = useState("")
  const [secret, setSecret] = useState("")

  useEffect(() => {
    document.title = "Home Page | Our Test App"
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await Axios.post("/secret", { username })
    setSecret(response.data)
  
  }
 
  if (secret.status === "success") {
    return (
      <div className="">
        <h2>{secret.message}</h2>
      </div>
    )
  }
  

  return(
    <div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
      {secret.status === "failure" && <div><h2>That is incorrect. Try again.</h2></div>}
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Home