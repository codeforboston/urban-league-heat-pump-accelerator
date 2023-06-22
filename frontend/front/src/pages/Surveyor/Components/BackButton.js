import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { ArrowBack } from "@mui/icons-material"
export const BackButton = ({url, description})=>{
    return <Button
      component={Link }
      to="/surveyor/dashboard"
      sx={{ mt: "10px", gap: "5px", justifyContent: "center" }}
    >
      <ArrowBack />
      Return to dashboard
    </Button>
}