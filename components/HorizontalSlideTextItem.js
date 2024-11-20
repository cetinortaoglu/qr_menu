import React from "react";

export default function HorizontalSlideTextItem({
  title,
  underline,
  onClickHandler,
  category,
}) {
  return (
    <div
      className={`inline-block px-3  border-b-2  ${
        underline && "border-b-hm-Normal"
      }`}
      onClick={() => onClickHandler()}
      key={category?.id}
    >
      <div className="cursor-pointer overflow-hidden rounded-lg bg-hm-Light transition-shadow duration-300 ease-in-out">
        <span>{title}</span>
      </div>
    </div>
  );
}
