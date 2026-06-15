import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FilterIcon(props : any) {
  return (
    <Svg
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 1h14l-5 6.5V17l-4-4V7.5L1 1z"
        fill="#A1A4A8"
        fillOpacity={0.39}
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FilterIcon