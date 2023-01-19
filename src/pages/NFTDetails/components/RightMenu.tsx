import { IconBack } from "icons";
import React from "react";

const RightMenu = ({ children, title, className, footer }: { children: React.ReactNode; title: string; className?: string; footer?: JSX.Element }) => {
  return (
    <div className={`flex flex-col border-l border-gray transition-all duration-1000 ease-in-out ${className}`}>
      <div className="sticky z-20 h-fit top-[112px] flex border-b border-gray text-white p-5 text-head5 gap-x-5 bg-bg">
        <IconBack width="32px" height="32px" />
        {title}
      </div>
      <div className="flex flex-col px-10 py-5 gap-y-[10px] overflow-y-scroll no-scrollbar">{children}</div>

      {footer && <div className="sticky bottom-0 mt-auto w-full border-t border-gray bg-bg">{footer}</div>}
    </div>
  );
};

export default RightMenu;
