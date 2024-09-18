import React from "react";
import LogoFR from "../public/images/LogoFastrest.png";
import Image from "next/image";

export default function LogoFastrest() {
  return (
    <a target="_blank" href="https://begumyazilim.com.tr">
      <Image width="128" height="96" src={LogoFR} alt={`logo`} />
    </a>
  );
}
