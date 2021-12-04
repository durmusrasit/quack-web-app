import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "../../actions/auth";

import { /*bindActionCreators, */ compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import Typography from "../modules/Typography";

import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";

import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      successMsg: "",
    };
  }

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <Collapse in={error != ""}>
        {error && <Alert severity="error">{error}</Alert>}
      </Collapse>
    );
  };

  onSubmit = (formValues) => {
    this.props.login(formValues);
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
            autoComplete="username"
            autoFocus
            component={RFTextField}
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            required
            size="large"
          />
          <Field
            fullWidth
            size="large"
            component={RFTextField}
            required
            name="password"
            autoComplete="current-password"
            label="Password"
            type="password"
            margin="normal"
          />
          <Field
            name="non_field_errors"
            type="hidden"
            component={this.hiddenField}
          />
          <FormButton
            className={classes.button}
            size="large"
            color="secondary"
            fullWidth
          >
            Sign In
          </FormButton>
        </form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

SignIn = connect(mapStateToProps, { login })(SignIn);

/*export default reduxForm({
  form: 'loginForm'
})(SignIn);*/

export default compose(
  reduxForm({
    form: "loginForm",
  }),
  withStyles(useStyles, { withTheme: true })
)(SignIn);
