import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotificationIcon(props : any) {
  return (
    <Svg
      width={24}
      height={27}
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.75 19.25v-6.5c-.625.125-1.25.25-1.875.25h-.625v7.5H5.75v-8.75C5.75 8.25 8.5 5.5 12 5.5c.125-1.625.875-3 1.875-4.125C13.5.875 12.75.5 12 .5A2.507 2.507 0 009.5 3v.375C5.75 4.5 3.25 7.875 3.25 11.75v7.5l-2.5 2.5V23h22.5v-1.25l-2.5-2.5zm-11.25 5c0 1.375 1.125 2.5 2.5 2.5s2.5-1.125 2.5-2.5h-5zM23.25 6.125c0 2.375-2 4.375-4.375 4.375S14.5 8.5 14.5 6.125s2-4.375 4.375-4.375 4.375 2 4.375 4.375z"
        fill="#EAB50F"
      />
    </Svg>
  )
}

export default NotificationIcon