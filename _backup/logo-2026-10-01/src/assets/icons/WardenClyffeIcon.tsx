import Image from "next/image";
import * as React from "react";
import { memo } from "react";
import WardenClyffeLogo from "@/assets/wardenclyffe.svg";

type Props = {
  size?: number;
  className?: string;
};
function WardenClyffeIcon({ size = 16, className }: Props) {
  return (
    <Image
      src={WardenClyffeLogo}
      alt={"Wardenclyffe Icon"}
      width={size}
      className={className}
    />
  );
}

export default memo(WardenClyffeIcon);
