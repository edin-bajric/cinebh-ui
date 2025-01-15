import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../store";
import { useEffect } from "react";

type ProtectedRouteProps = {
  openLoginModal: () => void;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ openLoginModal }) => {
  const { userToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!userToken) {
      openLoginModal();
    }
  }, [userToken, openLoginModal]);

  return userToken ? <Outlet /> : null;
};

export default ProtectedRoute;
