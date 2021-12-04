import React, { Component } from "react";

import ParticlesBg from "particles-bg";
import { withStyles } from "@material-ui/core/styles";
//import Link from '@material-ui/core/Link';
import { connect } from "react-redux";
import { login } from "../actions/auth";

//import { Field, reduxForm } from 'redux-form';
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Link from "@material-ui/core/Link";
import Typography from "./modules/Typography";

import { Grid, Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 500,
  },
});

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogOpen: true,
      isSigOpen: false,
    };
  }

  showLoginBox() {
    this.setState({ isLogOpen: true, isSigOpen: false });
  }

  showRegisterBox() {
    this.setState({ isSigOpen: true, isLogOpen: false });
  }

  render() {
    if (this.props.isAuthenticated) {
      console.log("LANDING_isAuthenticated = " + this.props.isAuthenticated);
      return <Redirect to="/study" />;
    }
    const { classes } = this.props;
    return (
      <>
        <div className="center">
          <Grid container spacing={3}>
            <Grid item xs align="center">
              <Paper elevation={6} className={classes.paper}>
                <React.Fragment>
                  <Typography
                    variant="h3"
                    gutterBottom
                    marked="center"
                    align="center"
                  >
                    Sign {this.state.isLogOpen ? "In" : "Up"}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {this.state.isLogOpen && "Not a member yet? "}
                    <Link
                      href="#"
                      align="center"
                      underline="always"
                      onClick={
                        this.state.isSigOpen
                          ? this.showLoginBox.bind(this)
                          : this.showRegisterBox.bind(this)
                      }
                    >
                      {this.state.isSigOpen
                        ? "Already have an account?"
                        : "Sign Up here"}
                    </Link>
                  </Typography>
                </React.Fragment>
                {this.state.isLogOpen && <SignIn />}
                {this.state.isSigOpen && <SignUp />}
              </Paper>
            </Grid>
          </Grid>
        </div>

        <ParticlesBg type="square" bg={true} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Landing = connect(mapStateToProps, { login })(Landing);

export default withStyles(useStyles, { withTheme: true })(Landing);
