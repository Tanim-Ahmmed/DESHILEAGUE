import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CricketIcon(props : any) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.34 4.23l1.41 1.41L19 1.42 17.56 0l-4.22 4.23zM17.5 20a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM1.24 14.89l2.83 2.83a1.02 1.02 0 001.43 0l8.47-8.49a.996.996 0 000-1.41L11.14 5a.99.99 0 00-1.42 0l-8.48 8.47c-.39.4-.39 1.03 0 1.42z"
        fill="#898787"
      />
    </Svg>
  )
}

export default CricketIcon
