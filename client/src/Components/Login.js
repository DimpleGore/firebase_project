import axios from "axios"
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";


function Login() {

  const defaultValues = {
    email: "",
    password: ""
  }

  const [formValues, setFormValues] = useState(defaultValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const record = await axios.post("http://localhost:5000/signin", { ...formValues });
      console.log("come")
      console.log(record)
      localStorage.setItem("firstLogin", true);
      localStorage.setItem("token", record.data.idToken)
      alert(record.data.message)
      if (record.data.message === "User Login successfully") {
        window.location.href = "/dashboard"
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  }

  const handleInputChange = (e) => {
    console.log("done")
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }


  return (
    <div>
      <center>
        <h4 style={{ padding: "30px" }}>Login Form</h4>
      </center>
      <form onSubmit={handleSubmit}>

        <Grid container alignItems="center" justify="center" direction="column">

          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            value={formValues.email}
            onChange={handleInputChange}
          />

          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            value={formValues.password}
            onChange={handleInputChange}
          />
          < div style={{ padding: "30px" }}>
            <Button variant="contained" color="primary" type="submit">
              Signin
            </Button>
          </div>
        </Grid>
      </form>
      <center>
        <a href="/">
          Create a account ? <b style={{ color: "blue" }}>Signup</b>
        </a>
      </center>
    </div>

  )
}

export default Login;