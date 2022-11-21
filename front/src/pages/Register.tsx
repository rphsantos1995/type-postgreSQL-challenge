import React  from 'react';
import { Link } from 'react-router-dom';
export default function Register() {

  return (
    <main>
      <h2>Register page</h2>
      <form action="">
        <label htmlFor="uname">Username:</label>  <br/>
        <input type="text" id="uname" name="uname"/> <br/>
        <label htmlFor="password">Password:</label>  <br/>
        <input type="text" id="password" name="password"/> <br/>
        <input type="submit" value="Submit"></input>
        <Link to={"/login"}>
          <button>I'm an user</button>
        </Link>
      </form>
    </main>
  )

}