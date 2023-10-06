import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility, } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axiosService from "../../axios";


export default function RegisterCompany() {
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();


  const form = useForm({
    defaultValues: {
      companyName: "",
      ownerName: "",
      rollNo: '',
      ownerEmail: "",
      accessCode: Math.random().toString(36).slice(2)
    },
  });
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    try {
      const response = await axiosService.post('/train/register', data)
      if(response){
        const responseData = response.data
        data.clientSecret = responseData.clientSecret
        const localData = JSON.stringify(responseData)
        localStorage.setItem('userData', localData)
        const Token = await axiosService.post(
          "/train/auth",
          data
        )
        if(Token){
          console.log(Token);
          localStorage.setItem("accessToken", Token.data.access_token)
        }

      }
    } catch (error) {
      setErrorMessage(error.message)
    }

  };
  const isAccessTokenPresent = localStorage.getItem("accesstoken");
  if (isAccessTokenPresent) {
    return <Navigate to="/" />;
  }
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", color: "" }}
      bgcolor={"#f6f6ff"}
      display="flex"
      justifyContent="center"
      alignContent={"center"}
      minHeight={"60vh"}
    >
      <Grid
        item
        xs={12}
        sm={9}
        md={5}
        component={Paper}
        elevation={3}
        borderRadius={3}
      >
        <Box
          sx={{
            my: 7,
            mx: 9,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6" pb={4} color={"#38a1cb"}>
            Register Company
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Company Name"
              autoComplete="on"
              autoFocus
              {...register("companyName", {
                required: "Company name is required",
              })}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              type="text"
              label="owner Name"
              autoComplete="ownerName"
              {...register("ownerName", {
                required: "Owner name is required",
              })}
              error={!!errors.ownerName}
              helperText={errors.ownerName?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              type="text"
              label="Roll No"
              autoComplete="rollNo"
              {...register("rollNo", {
                required: "Roll No is required",
              })}
              error={!!errors.rollNo}
              helperText={errors.rollNo?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              type="text"
              label="Email"
              autoComplete="email"
              {...register("ownerEmail", {
                required: "Email is required",
              })}
              error={!!errors.ownerEmail}
              helperText={errors.ownerEmail?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              type="text"
              label="Access Code"
              disabled
              autoComplete="accessCode"
              {...register("accessCode", {
                required: "Access Code is required",
              })}
              error={!!errors.accessCode}
              helperText={errors.accessCode?.message}
            />
            <Typography color="#d91818" textAlign="center" fontWeight={300}>
              {errorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              disabled={sending}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: "3rem",
                background:
                  "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
              }}
            >
              {sending ? (
                <CircularProgress sx={{ color: "#fff" }} size={25} />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}