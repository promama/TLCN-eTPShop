import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { fetchVerify, reset } from "../slices/userSlice";

function PrivateRoutes() {
  const dispatch = useDispatch();
  const allowAccess = useSelector((state) => state.user.allowAccess);

  useEffect(() => {
    try {
      dispatch(fetchVerify());
    } catch (err) {
      dispatch(reset());
    }
  }, [dispatch]);
  return allowAccess ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
