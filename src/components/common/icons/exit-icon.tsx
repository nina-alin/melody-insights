import * as React from "react";
import { SVGAttributes } from "react";
const ExitIcon = (properties: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...properties}
  >
    <path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 7.636V4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-3.136M10 12h11m0 0-3-3.5m3 3.5-3 3.5"
    />
  </svg>
);
export default ExitIcon;
