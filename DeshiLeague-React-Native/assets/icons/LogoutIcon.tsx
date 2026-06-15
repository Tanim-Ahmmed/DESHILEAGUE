import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LogoutIcon(props: any) {
  return (
    <Svg
      width={73}
      height={72}
      viewBox="0 0 73 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.75.25h22.5A11.25 11.25 0 0145.5 11.5v15h-3.75v-15a7.5 7.5 0 00-7.5-7.5h-22.5a7.5 7.5 0 00-7.5 7.5v48.75a7.5 7.5 0 007.5 7.5h22.5a7.5 7.5 0 007.5-7.5v-15h3.75v15A11.25 11.25 0 0134.25 71.5h-22.5A11.25 11.25 0 01.5 60.25V11.5A11.25 11.25 0 0111.75.25zM23 34h42.188L53 21.812 55.475 19 72.35 35.875 55.475 52.75 53 49.937 65.188 37.75H23V34z"
        fill="#C12B2B"
      />
    </Svg>
  )
}

export default LogoutIcon