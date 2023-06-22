import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { selectBreadcrumbs, setBreadcrumbs } from "./breadcrumbSlice";

export const BreadcrumbNav = () => {
  const dispatch = useDispatch();
  const links = [...useSelector(selectBreadcrumbs)];

  const handleClick = (url) => {
    while (links.at(-1)?.url !== url && links.length) {
      links.pop();
    }
    dispatch(setBreadcrumbs(links));
  };

  return (
    <Stack justifyContent="center" alignItems="center" width="100%" mt="10px">
      <Breadcrumbs separator=">">
        {links.map((link, index) =>
          index === links.length - 1 ? (
            <Typography textTransform={"uppercase"} fontWeight={"bold"}>
              {link?.description}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={link.url}
              sx={{ textTransform: "uppercase" }}
              onClick={() => handleClick(link.url)}
            >
              {link?.description}
            </Link>
          )
        )}
      </Breadcrumbs>
    </Stack>
  );
};
