import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      flash: "",
      open: false,
      redirect: false,
      redi:false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  onChange(e) {
    switch (e.target.name) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  }

  RedirectAfterLogin(){
    const redi = this.state.redi;
 if (!redi){
    window.location.href = '/profile'
 }
  }

  //submit the form
  handleSubmit(event) {
    event.preventDefault();
    fetch(SERVER_ADDRESS + "/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ flash: res.flash, open: true }, this.RedirectAfterLogin()),
        (err) => this.setState({ flash: err.flash, open: true }),
      ); 
  }

  render() {
    return (
      <>
        <h1>Sing in!</h1>
        <form onSubmit={this.handleSubmit}>
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
          <div className="button">
            <Button
              type="submit"
              title="s'enregistrer"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={this.state.open}
              message={this.state.flash}
              autoHideDuration={2000}
              onClose={() => this.setState({ open: false })}
            />
          </div>
        </form>
        <Link to="/signup">Sign Up</Link>
      </>
    );
  }
}

export default SignIn;
