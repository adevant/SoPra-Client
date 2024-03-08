import React from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import ProfilePage from "../../views/ProfilePage";
import PropTypes from "prop-types";

const ProfilePageRouter = () => {
  //console.log("Successful routerok");
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <Routes>
      
      <Route path="/" element={<Navigate to="/game" replace />}/>
      
      <Route path=":userId" element={<ProfilePage />} />

      <Route path="*" element={<Navigate to="/game" replace />} />
  
    </Routes>
    </div>
  );
};

ProfilePageRouter.propTypes = {
  base: PropTypes.string
};

export default ProfilePageRouter;