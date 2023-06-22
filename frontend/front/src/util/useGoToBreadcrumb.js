import { useDispatch } from "react-redux";
import { pushBreadcrumb } from "../features/breadcrumb/breadcrumbSlice";
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
          data.assignment_id || data.id
        }`;
        description = `assignment ${data.assignment_id || data.id}`;
        break;
      case "home":
        url = `/admin/home/homeprofile/${data.id}`;
        description = `${data?.street_number} ${data.street_name} ${
          data?.unit_number && "#" + data.unit_number
        }`;
        break;
      default:
        url = "/";
        description = "home";
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
