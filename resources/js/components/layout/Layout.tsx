import React, { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <div className="header">
      <h1>Laravel + React Changelog</h1>
    </div>
    <Header />
    <div className="container">{children}</div>
  </>
);
