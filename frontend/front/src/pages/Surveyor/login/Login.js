import React from "react";
import Button from "@mui/material/Button";
import { Grid, Paper, Avatar, TextField, Checkbox } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setAuthenticated, setLogin } from "../../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const paperStyle = {
    padding: 40,

    display: "flex",
    flexDirection: "column",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "10px 0" };

  const errorStyles = {
    color: "rgb(239 68 68 / 1)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  };

  async function LoginForms(values) {
    if (!values) return;

    dispatch(
      setLogin({ userName: values.userName, password: values.password })
    );

    dispatch(setAuthenticated(true));
    reset();

    navigate("dashboard");
  }

  return (
    <Paper elevation={5} style={paperStyle}>
      <Grid align='center'>
        <Avatar style={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <h2>Login</h2>
      </Grid>

      <form onSubmit={handleSubmit(LoginForms)}>
        <TextField
          id='standard-basic'
          placeholder='Enter UserName'
          type='text'
          style={btnstyle}
          name='userName'
          fullWidth
          label='UserName'
          variant='standard'
          {...register("userName", {
            required: {
              value: true,
              message: "Please Enter UserName",
            },
          })}
        />
        <span style={errorStyles}>{errors?.userName?.message}</span>
        <TextField
          id='standard-basic'
          placeholder='Enter password'
          type='password'
          style={btnstyle}
          name='password'
          fullWidth
          label='Password'
          variant='standard'
          {...register("password", {
            required: {
              value: true,
              message: "Please Enter Password",
            },
          })}
        />
        <span style={errorStyles}>{errors?.password?.message}</span>
        <div style={{ marginTop: "5px" }}>
          <FormControlLabel
            control={<Checkbox name='checkedB' color='primary' />}
            label='Remember me'
          />
        </div>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          onClick={() => LoginForms}
          style={{
            btnstyle,
            borderRadius: "20px",
            marginTop: "20px",
          }}
          fullWidth
        >
          Login in
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
