import SignUp from "./components/SignUp";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
// import logo from './homer.jpeg';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12} md={12} sm={11}>
            <Paper elevation={4} style={{ margin: 32 }}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  xs={12}
                  md={6}
                  sm={6}
                  style={{ textAlign: "center" }}
                >
                  <img
                    src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
                    alt="jiji"
                  />
                </Grid>
                <Grid item xs={12} md={6} sm={6} alignContent="center">
                  <SignUp />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
