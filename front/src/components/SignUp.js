import React, { Component } from "react";
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mon@email.com",
      password: "monPassw0rd",
      name: "James",
      lastname: "Bond",
      passwordBis: "",
      flash:'',
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

      fetch(SERVER_ADDRESS +'/auth/signup', {
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
        <div className="container">
          <div className="container-signup">
            <h1>{JSON.stringify(this.state)}</h1>
            <form className="row g-3" onSubmit={this.handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  placeholder="Name"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLastName" className="form-label">
                  LastName
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  name="lastname"
                  placeholder="LastName"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPasswordBis" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPasswordBis"
                  name="passwordbis"
                  onChange={this.onChange}
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  S'enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
