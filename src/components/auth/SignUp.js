import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { register } from "../../actions/auth";

import { /*bindActionCreators, */ compose } from "redux";
import { withStyles } from "@material-ui/core/styles";

import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";

const useStyles = (theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
});

class SignUp extends Component {
  onSubmit = (formValues) => {
    this.props.register(formValues);
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/study" />;
    }
    const { classes } = this.props;
    return (
      <>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={classes.form}
        >
          <Field
            autoFocus
            component={RFTextField}
            autoComplete="username"
            fullWidth
            label="Username"
            name="username"
            required
          />
          <Field
            autoComplete="email"
            component={RFTextField}
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            required
          />
          <Field
            fullWidth
            component={RFTextField}
            required
            name="password"
            autoComplete="current-password"
            label="Password"
            type="password"
            margin="normal"
          />
          <FormButton className={classes.button} color="secondary" fullWidth>
            Sign Up
          </FormButton>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

SignUp = connect(mapStateToProps, { register })(SignUp);

export default compose(
  reduxForm({
    form: "registerForm",
  }),
  withStyles(useStyles, { withTheme: true })
)(SignUp);
