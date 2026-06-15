import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps {
  color?: string;
  size?: number;
}

function OrganizersProfileIcons({ color = "#000", size = 25 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M1.51 20.58c0-1.428.579-2.798 1.61-3.809a5.551 5.551 0 013.885-1.578h10.99c1.457 0 2.855.568 3.886 1.578a5.334 5.334 0 011.609 3.81c0 .714-.29 1.4-.805 1.904a2.776 2.776 0 01-1.942.79H4.258a2.776 2.776 0 01-1.943-.79 2.667 2.667 0 01-.805-1.904z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 9.806c2.276 0 4.121-1.808 4.121-4.04 0-2.231-1.845-4.04-4.121-4.04-2.276 0-4.121 1.809-4.121 4.04s1.845 4.04 4.121 4.04z"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

export default OrganizersProfileIcons
