import {
  pushBreadcrumb,
  selectBreadcrumbsExist,
  setBreadcrumbs,
} from "../features/breadcrumb/breadcrumbSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useGoToBreadcrumb = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return function (type, data) {
    //   Set params
    let url;
    let description;
    switch (type) {
      case "assignment":
        url = `/admin/assignment/assignProfile/${
          data?.assignment_id || data?.id
        }`;
        description = `assignment ${data?.assignment_id || data?.id}`;
        break;
      case "home":
        url = `/admin/home/homeProfile/${data?.id}`;
        description = `${data?.street_number} ${data?.street_name} ${
          data?.unit_number ? "#" + data.unit_number : ""
        }`;
        break;
      case "user":
        url = `/admin/user/userProfile/${data?.row.user_id}`;
        description = `${data?.row.firstname} ${data.row.lastname}`;
        break;
      case "surveyEdit":
        url = `/admin/survey/edit/${data.id}`;
        description = `Survey ${data.id}`;
        break;
      default:
        url = data.url;
        description = data.description || type;
        break;
    }

    //   Push breadcrumb and navigate to page
    dispatch(
      pushBreadcrumb({
        url,
        description,
      })
    );
    navigate(url);
  };
};

export const useInitBreadcrumbs = (breadcrumbs, overwrite) => {
  const dispatch = useDispatch();
  const thereAreBreadcrumbs = useSelector(selectBreadcrumbsExist);

  useEffect(() => {
    if (!thereAreBreadcrumbs || overwrite) {
      dispatch(setBreadcrumbs(breadcrumbs));
    }
  }, [dispatch, breadcrumbs, thereAreBreadcrumbs, overwrite]);
};
