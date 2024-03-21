import React from "react";
import Button from "components/Button";
import { IconCircleRemoveWhite, IconPencil } from "icons";
import { EventSettingsSubmit } from "../Settings";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const Footer = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    window.dispatchEvent(new CustomEvent(EventSettingsSubmit));
  };

  const onCancel = () => {
    navigate(PATHS.PROFILE);
  };

  return (
    <div className="sticky bottom-0 bg-bg lg:px-32 border-t border-gray">
      <div className="flex lg:border-x lg:border-gray">
        <div className="lg:w-[320px] lg:border-r lg:border-gray" />
        <div className="gap-3 p-4 flex flex-1 lg:px-10 lg:py-5 lg:gap-2.5">
          <Button className="flex-1" onClick={onSubmit}>
            SAVE CHANGES <IconPencil />
          </Button>
          <Button className="flex-1 btn-secondary" onClick={onCancel}>
            CANCEL <IconCircleRemoveWhite />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
