import React from "react";
import Sidebar from "./Sidebar";
import { Helmet } from 'react-helmet';

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Helmet>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
        />
      </Helmet>
      <Sidebar />
      <div className=" flex-1  text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;
