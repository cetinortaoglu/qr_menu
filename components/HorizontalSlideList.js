import React from "react";

export default function HorizontalSlideList({ children }) {
  return (
    <div className="flex flex-col m-auto p-auto">
      <div className="flex overflow-x-scroll flex-shrink-0">
        <div className="flex flex-nowrap gap-x-1">{children}</div>
      </div>
    </div>
  );
}
