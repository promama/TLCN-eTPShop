import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { fetchVerify, reset } from "../slices/userSlice";

function PrivateRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allowAccess = useSelector((state) => state.user.allowAccess);

  const [access, setAccess] = useState(allowAccess);

  useEffect(() => {
    try {
      dispatch(fetchVerify());
      setAccess(!access);
    } catch (err) {
      setAccess(false);
      dispatch(reset());
      navigate("/signin");
    }
  }, [dispatch, navigate, setAccess, access]);
  return allowAccess ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
