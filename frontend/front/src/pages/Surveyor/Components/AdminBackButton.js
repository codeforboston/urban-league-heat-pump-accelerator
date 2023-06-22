import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectBreadcrumbs } from "../../../features/breadcrumb/breadcrumbSlice";
export const AdminBackButton = ({ url, description }) => {
  const thereAreBreadcrumbs = useSelector(selectBreadcrumbs).length;
  return thereAreBreadcrumbs ? (
    <></>
  ) : (
    <Button
      component={Link}
      to={url}
      sx={{ mt: "10px", gap: "5px", justifyContent: "center" }}
    >
      <ArrowBack />
      All {description}
    </Button>
  );
};
