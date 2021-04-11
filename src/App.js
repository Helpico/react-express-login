  
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"

function App() {
  return (
    <BrowserRouter>
      <header className="">
        <div className="">
          <h1 className="">Our Amazing App!</h1>
          <ul className="">
            <li className="">
              <NavLink to="/about" className="nav-link" activeClassName="active">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </header>

      <div className="">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>

      <footer className="">
        <p className="">
          <Link className="" to="/">
            Log In
          </Link>{" "}
          |{" "}
          <Link className="" to="/about">
            About Us
          </Link>
        </p>
      </footer>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))