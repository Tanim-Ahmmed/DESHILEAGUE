import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

interface IconProps {
  color?: string;
  size?: number;
}

function CreatePlusCircle({ color = "#000", size = 25 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 27"
      fill="none"
    >
      <G clipPath="url(#clip0_1487_7075)" fill={color}>
        <Path d="M14.01 27C6.554 27 .51 20.956.51 13.5S6.554 0 14.01 0s13.5 6.044 13.5 13.5A13.5 13.5 0 0114.01 27zm0-25.313c-6.524 0-11.812 5.29-11.812 11.813 0 6.524 5.288 11.813 11.812 11.813 6.524 0 11.813-5.29 11.813-11.813A11.812 11.812 0 0014.01 1.687z" />
        <Path d="M19.916 12.656h-5.062V7.594h-1.688v5.062H8.104v1.688h5.062v5.062h1.688v-5.062h5.062v-1.688z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1487_7075">
          <Path fill="#fff" transform="translate(.51)" d="M0 0H27V27H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CreatePlusCircle