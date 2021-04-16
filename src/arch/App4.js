import React, {useState} from "react";
import ReactDOM from "react-dom"
import Axios from "axios"

// Login
const LoginForm = (props) => {
  return(
  <div>
    <h2>LOGINFORM!</h2>
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" onChange={e => setEmail(e.target.value)} />
      </label>
      <button type="submit">Log in</button>
    </form>
  </div>
)
};


function App3() {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");

  const status = false;
   
  async function handleSubmit(e) {
    e.preventDefault()
    const response = await Axios.post("/login", { email });
    setSecret(response.data);
  }

  return(
    <div>
      <h3>Cookie Setup</h3>
      {(status) ? (<Dashboard />) : (<LoginForm status={LoginForm} />)}
    </div>
  )
}



//Dashboard
const Dashboard = () => {
  return(
    <div>
      <h2>DASHBOARD!</h2>
      <button>Log out</button>
    </div>
  )
};

ReactDOM.render(<App3 />, document.getElementById("app"))
