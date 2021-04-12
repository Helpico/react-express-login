import React, {useState} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

const AuthApi = React.createContext();


function App2() {

  const [auth, setAuth] = useState(false);

  return(
    <div>
      <AuthApi.Provider value={{auth, setAuth}}>
        <h1>Cookie Setup</h1>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthApi.Provider>
    </div>
  )
}


// Login
const Login = () => {
  return(
    <div>
      <h2>Log in to proceed!</h2>
      <button>Log in</button>
    </div>
  )
};

//Dashboard
const Dashboard = () => {
  return(
    <div>
      <h2>Welcome to the account!</h2>
      <button>Log out</button>
    </div>
  )
};

const Routes = () => {
  const Auth = React.useContext(AuthApi);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" auth={Auth.auth} component={Dashboard} />
    </Switch>
  )
};

ReactDOM.render(<App2 />, document.getElementById("app"))
