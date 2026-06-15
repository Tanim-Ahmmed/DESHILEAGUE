import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

interface DollarIconProps {
  width?: number;
  height?: number;
  stroke?: string; 
}

function DollarIcon({
  width = 24,
  height = 24,
  stroke = "#EAB50F", 
  ...props
}: DollarIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_1232_14765)"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M12 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12 6.201 1.5 12 1.5z" />
        <Path d="M12 4a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z" />
        <Path d="M14.25 9.475s-.9-.69-2.25-.69m0 0c-1.125 0-2.25.689-2.25 1.607 0 2.296 4.5.918 4.5 3.215 0 .918-1.125 1.607-2.25 1.607-1.35 0-2.25-.689-2.25-.689M12 8.785V7.5m0 9v-1.285" />
      </G>
      <Defs>
        <ClipPath id="clip0_1232_14765">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default DollarIcon;
