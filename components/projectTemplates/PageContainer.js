import React from "react";

export default function PageContainer({ children, theme }) {
  return (
    <div
      style={{
        backgroundColor: theme?.website?.bgColor,
        color: theme?.website?.fontColor,
        fontSize: `${theme?.website?.fontSize}px`,
        fontFamily: theme?.website?.fontStyle,
      }}
    >
      {children}
    </div>
  );
}
