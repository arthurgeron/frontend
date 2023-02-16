import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";

export const EventSettingsSubmit = "EventSettingsSubmit";
const Settings = () => {
  return !useIsMobile() ? (
    <div className="flex flex-col">
      <div className="px-32 border-b border-gray">
        <div className="border-x border-gray py-16 px-10">
          <h2 className="text-h2 text-white">Settings</h2>
        </div>
      </div>
      <div className="px-32">
        <div className="flex border-x border-gray h-full">
          <Sidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="m-5">
      <MobileWarning />
    </div>
  );
};

export default Settings;
