import React from "react";
import { View } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
  const isAuth = false;
  const loading = false;

  return isAuth ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
