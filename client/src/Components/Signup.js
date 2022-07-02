import axios from "axios"
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";


function Signup(){
    

    const defaultValues = {
        email: "",
        password: "",
        username:"",
        contactno:"",
        description:""
    }
    const [formValues,setFormValues] = useState(defaultValues);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formValues.contactno.length!=10){
          alert("Size of contact number should be equal to 10")
          return
        }
        try {
          const record=await axios.post("http://localhost:5000/user/signup", { ...formValues });
          console.log("come")
          console.log(record)
          localStorage.setItem("firstLogin", true);
          localStorage.setItem("token",record.data.idToken)
          alert(record.data.message)
          if(record.data.message==="User Signup successfully"){
            window.location.href="/dashboard"
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
          <h4 style={{ padding: "30px" }}>Registration Form</h4>
              </center>
                <form onSubmit={handleSubmit}>
                 
                  <Grid container alignItems="center" justify="center" direction="column">
                    
            <TextField
  id="username"
  name="username"
  label="Username"
  type="text"
  required
  value={formValues.username}
  onChange={handleInputChange}
/>

     

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

<TextField
  id="contactno"
  name="contactno"
  label="Contact Number"
  type="number"
  required
  value={formValues.contactno}
  onChange={handleInputChange}
/>

<TextField
  id="description"
  name="description"
  label="User Detail"
  type="text"
  multiline
  rows={3}
  inputProps={{ maxLength: 50 }}
  required
  value={formValues.description}
  onChange={handleInputChange}
/>
<div style={{ padding: "30px" }}>
<Button variant="contained" color="primary" type="submit">
          Signup
        </Button>
        </div>
        </Grid>
        </form>
        <center>
        <a  href="/login">
            Already you have an account ? <b style={{ color: "blue" }}>Signin</b>
          </a>
          </center>
        </div>
    )
}

export default Signup;