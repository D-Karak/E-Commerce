import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleRoutes = ({ children,allowedRoles }) => {
    const {user}= useContext(AuthContext);
    return user&& allowedRoles.includes(user.user.role) ? children : <Navigate to="/signin"/>;
}

export default RoleRoutes;