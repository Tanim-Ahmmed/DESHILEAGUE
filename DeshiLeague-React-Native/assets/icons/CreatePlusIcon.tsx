import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CreatePlusIcon(props : any) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.563.625H2.438A1.813 1.813 0 00.625 2.438v18.125a1.812 1.812 0 001.813 1.812h18.125a1.812 1.812 0 001.812-1.813V2.438A1.813 1.813 0 0020.562.625zm-2.72 11.781h-5.437v5.438a.906.906 0 11-1.812 0v-5.438H5.156a.906.906 0 110-1.812h5.438V5.156a.906.906 0 111.812 0v5.438h5.438a.906.906 0 110 1.812z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CreatePlusIcon