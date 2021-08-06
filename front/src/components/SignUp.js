import React, { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      passwordBis: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.afficheJson();
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

  //check if password and passwordbis are exactly the same
  checkPassword = (state) => {
    if (this.state.password === this.state.passwordBis) {
      this.afficheConsole();
    } else {
      console.log("password not ok");
    }
  };

  //submit the form
  handleSubmit(e) {
    e.preventDefault();
    this.checkPassword();
  }

  //display the json in the console
  afficheConsole() {
    const afficher = JSON.stringify(this.state);
    return console.log(afficher);
  }

  //display the json in the element H1
  afficheJson() {
    const affiche = JSON.stringify(this.state);
    return affiche;
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="container-signup">
            <h1>{this.afficheJson()}</h1>
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
