import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1301,
    width: "100%",
    "& > * + *": {
      marginTop: 2,
    },
  },
});

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
};

export default Loader;
