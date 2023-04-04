import { useSelector } from "react-redux";
import { Navigate, redirect, Route } from "react-router-dom";

export const AuthenticatedRoute = ({ component }) => {
  const { authenticated } = useSelector((state) => state.login);
  if (!authenticated) {
    return <Navigate to='/surveyor' />
  }
  return component


}