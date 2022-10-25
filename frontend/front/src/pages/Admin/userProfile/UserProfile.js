import { Box, Typography, Button } from "@mui/material";
import React from 'react'
import { useParams } from "react-router-dom";
import UserData from "../../../dummyData/userTable.json";

const UserProfile = () => {
  const { uid } = useParams();
  const user = UserData.filter(user => user.uid === Number(uid))[0];

  return (
    <>
      <Box m={3}>
        <Typography variant='h2'>User Profile Page</Typography>
        <Typography variant='h3'>House ID: {uid}</Typography>
        <Typography variant='h2'>First Name: {user.firstName}</Typography>
        <Typography variant='h2'>Last Name: {user.lastName}</Typography>
        <Typography variant='h2'>Address: {user.address}</Typography>
        <Typography variant='h2'>City: {user.city}</Typography>
        <Typography variant='h2'>Zipcode: {user.zipcode}</Typography>
        <Typography variant='h2'>Account Type: {user.accountType}</Typography>
      </Box>
      <Box>
        <Button>Edit Profile</Button>
        <Button>Change Password</Button>
        <Button>Delete Profile</Button>
      </Box>
    </>
  )
}

export default UserProfile