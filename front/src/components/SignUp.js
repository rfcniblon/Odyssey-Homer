import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      lastname: "",
      passwordBis: "",
      flash: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    switch (e.target.name) {
      case "name":
        this.setState({ name: e.target.value });
        break;
      case "lastname":
        this.setState({ lastname: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "passwordbis":
        this.setState({ passwordBis: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      default:
        break;
    }
  }

  //submit the form
  handleSubmit(e) {
    if (this.state.password !== this.state.passwordBis) {
      console.log("Password non identique");
    } else {
      console.log(this.state);
      e.preventDefault();

      fetch(SERVER_ADDRESS + "/auth/signup", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then(
          (res) => this.setState({ flash: res.flash }),
          (err) => this.setState({ flash: err.flash })
        );
    }
  }

  render() {
    return (
      <>
        <h1>Sing up!</h1> 
        <form onSubmit={this.handleSubmit}>
        <label>Name</label>
          <TextField
            type="text"
            label="Name"
            id="inputName"
            name="name"
            title="name"
            onChange={this.onChange}
          />
           <label>LastName</label>
          <TextField
            type="text"
            title="lastname"
            label="lastname"
            id="inputLastName"
            name="lastname"
            onChange={this.onChange}
          />
           <label>Email</label>
          <TextField
            type="email"
            label="email"
            title="email"
            id="inputEmail"
            name="email"
            onChange={this.onChange}
          />
           <label>Password</label>
          <TextField
            type="password"
            label="password"
            id="inputPassword"
            name="password"
            title="password"
            onChange={this.onChange}
          />
           <label>Confirm Password</label>
          <TextField
            type="password"
            title="confirm_password"
            label="confirm password"
            id="inputPasswordBis"
            name="passwordbis"
            onChange={this.onChange}
          />
          <div className="button">
            <Button
              type="submit"
              title="s'enregistrer"
              variant="outlined"
              color="primary"
            >
              S'enregistrer
            </Button>
          </div>
        </form>
      </>
    );
  }
}

export default SignUp;
