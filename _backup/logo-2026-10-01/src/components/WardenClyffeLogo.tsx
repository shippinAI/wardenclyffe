import { cn } from "@utils/helpers";
import Image from "next/image";
import * as React from "react";
import WarbnClyffeLogoMark from "@/assets/wardenclyffe.svg";
import WardenClyffeLogoFull from "@/assets/wardenclyffe-full.svg";

type Props = {
  size?: "default" | "large";
  mobile?: boolean;
};

const sizes = {
  default: {
    desktop: 22,
    mobile: 30,
  },
  large: {
    desktop: 24,
    mobile: 40,
  },
};

export const WardenClyffeLogo = ({ size = "default", mobile = true }: Props) => {
  return (
    <>
      <Image
        src={WardenClyffeLogoFull}
        height={sizes[size].desktop}
        alt={"WardenClyffe Logo"}
        className={cn(mobile && "hidden md:block")}
      />
      {mobile && (
        <Image
          src={WardenClyffeLogoMark}
          width={sizes[size].mobile}
          alt={"WardenClyffe Logo"}
          className={cn(mobile && "md:hidden ml-4")}
        />
      )}
    </>
  );
};
