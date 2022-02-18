import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth:400,
    padding:10,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  boton:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '30 30px',
    width: '100px',
    height:'20px',
    marginTop: '5px',
  },
  textinput:{

  },
  textField: {
    width: '25ch',
  },
});

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const classes = useStyles();

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin" && password === "test") {
      navigate("/list");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  const handleClickShowPassword = () => {
    setShow(!show);
    console.log(show)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card className={classes.root} >
    <form onSubmit={handleNavigation}>
      <h2>Hello from login page</h2>
      <div>
        <div>
          <InputLabel htmlFor="standard-adornment-username">Username</InputLabel>
          <Input
            id="standard-adornment-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            />
        </div>
      </div> 
      <button type="submit" className={classes.boton}>login</button>
    </form>
    </Card>
  );
};
