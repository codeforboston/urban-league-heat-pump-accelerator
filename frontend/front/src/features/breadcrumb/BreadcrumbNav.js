import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { selectBreadcrumbs, setBreadcrumbs } from "./breadcrumbSlice";

export const BreadcrumbNav = () => {
  const dispatch = useDispatch();

  // Make shallow copy of links to modify here
  const links = [...useSelector(selectBreadcrumbs)];

  // Clicking a previous breadcrumb pops links in list until matching the previous breadcrumb
  const handleClick = (url) => {
    while (links.at(-1)?.url !== url && links.length) {
      links.pop();
    }
    dispatch(setBreadcrumbs(links));
  };

  const params = useParams();
  console.log(params);

  return (
    <Stack m="10px">
      <Breadcrumbs separator=">">
        {links.map((link, index) =>
          index === links.length - 1 ? (
            <Typography
              textTransform={"uppercase"}
              fontWeight={"bold"}
              key={`breadcrumb-${link.description}`}
            >
              {link?.description}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={link.url}
              sx={{ textTransform: "uppercase" }}
              onClick={() => handleClick(link.url)}
              key={`breadcrumb-${link.description}`}
            >
              {link?.description}
            </Link>
          )
        )}
      </Breadcrumbs>
    </Stack>
  );
};
