import { Link } from "react-router-dom"

export default function Login() {

  return (
    <main>
      <h2>Login page</h2>
      <form action="">
        <label htmlFor="uname">Username:</label>  <br/>
        <input type="text" id="uname" name="uname"/> <br/>
        <label htmlFor="password">Password:</label>  <br/>
        <input type="text" id="password" name="password"/> <br/>
        <input type="submit" value="Submit"></input>
        <Link to={"/register"}>
          <button>Create Account</button>
        </Link>
      </form>
    </main>
  )

}