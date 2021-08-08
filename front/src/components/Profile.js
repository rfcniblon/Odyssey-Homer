import React, { Component } from "react";
import { List, ListItemText, Button } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false,
      //   email: "",
      //   name: "",
      //  lastname: "",
      profile: {
        email: "homer.simpson@wildcodeschool.fr",
        name: "Homer",
        lastname: "Simpson",
      },
    };
  }

  render() {
    return (
      <>
 
        <h1>Profile</h1>
        <List>
          <ListItem>
            <ListItemText
              primary="email"
              secondary={this.state.profile.email}
            />
            <ListItemText primary="name" secondary={this.state.profile.name} />
            <ListItemText
              primary="lastname"
              secondary={this.state.profile.lastname}
            />
          </ListItem>
        </List>
          <a href="/signin"> 
          <Button
            type="button"
            title="s'enregistrer"
            variant="contained"
            // onClick={() => this.setState({redirect: true})}
            color="primary"
          >
            LogOut
          </Button>
        </a>  
      </>
    );
  }
}

export default Profile;
