import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconsProps {
    color : string;
    size ?: number;
}

function MyTournamentIcon({ color , size = 25 } : IconsProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 23"
      fill="none"
    >
      <Path
        d="M6.053 2.285h12.985s-1.081 16.29-6.493 16.29c-2.641 0-4.252-3.888-5.208-7.864-1-4.165-1.284-8.426-1.284-8.426z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.038 2.285s1.132-1.207 2.073-1.228c1.843-.042 2.184 1.228 2.184 1.228.36.75.65 2.696-1.082 4.494-1.731 1.798-3.67 3.37-4.459 3.932M6.053 2.285s-1.18-1.221-2.144-1.228c-1.843-.015-2.184 1.228-2.184 1.228-.361.75-.65 2.696 1.082 4.494a36.864 36.864 0 004.53 3.932m.881 11.234c0-2.247 4.328-3.37 4.328-3.37s4.328 1.123 4.328 3.37H8.218z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default MyTournamentIcon
