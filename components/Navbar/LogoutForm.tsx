import React from "react";
import LogoutButton from "./LogoutButton";
import { logout } from "@/actions/logout";

const LogoutForm = () => {
  return (
    <form action={logout}>
      <LogoutButton />
    </form>
  );
};

export default LogoutForm;
