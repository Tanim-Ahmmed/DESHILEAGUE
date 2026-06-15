import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IconProps {
  color?: string;
  size?: number;
}

function MultipulProfileIcons({ color = "#000", size = 25 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 26 27"
      fill="none"
    >
      <Path
        d="M13.982 10.957l.318 1.041a.713.713 0 00.842.489l1.055-.246a.96.96 0 01.915 1.591l-.74.799a.72.72 0 000 .976l.74.798a.96.96 0 01-.915 1.59l-1.055-.245a.713.713 0 00-.844.489l-.316 1.041a.954.954 0 01-1.829 0l-.318-1.041a.714.714 0 00-.843-.489l-1.055.246a.96.96 0 01-.915-1.591l.74-.797a.72.72 0 000-.977l-.74-.798a.96.96 0 01.915-1.59l1.055.245a.713.713 0 00.844-.49l.317-1.04a.954.954 0 011.83-.001z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.069 16.19a1.076 1.076 0 100-2.151 1.076 1.076 0 000 2.151zM13.069 4.891a1.883 1.883 0 100-3.766 1.883 1.883 0 000 3.766zM16.835 8.658a3.886 3.886 0 00-7.533 0M21.677 22.108a1.882 1.882 0 00.721-3.623 1.884 1.884 0 10-.72 3.623zM25.444 25.875a3.888 3.888 0 00-7.533 0M4.46 22.108a1.882 1.882 0 100-3.764 1.882 1.882 0 000 3.764zM8.227 25.875a3.887 3.887 0 00-7.533 0m15.657-2.69a10.271 10.271 0 01-6.564 0M17.64 4.354a10.238 10.238 0 015.523 10.76m-20.191 0a10.237 10.237 0 015.527-10.76"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default MultipulProfileIcons
