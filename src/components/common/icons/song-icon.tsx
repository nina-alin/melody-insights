import * as React from "react";
import { SVGAttributes } from "react";
const SongIcon = (properties: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 192 192"
    {...properties}
  >
    <path
      fill="white"
      d="m102 22 2.523-5.444A6 6 0 0 0 96 22h6Zm49.868 63.65a6 6 0 1 0 8.264 8.7l-8.264-8.7ZM96 22v112h12V22H96Zm3.477 5.444c20.118 9.323 37.8 21.15 47.911 32.54 5.078 5.72 7.786 10.816 8.452 14.992.599 3.753-.349 7.232-3.972 10.674l8.264 8.7c6.377-6.058 8.804-13.454 7.559-21.264-1.178-7.386-5.532-14.54-11.329-21.07-11.639-13.11-30.957-25.783-51.839-35.46l-5.046 10.888ZM96 134c0 16.569-13.431 30-30 30v12c23.196 0 42-18.804 42-42H96Zm-30 30c-16.569 0-30-13.431-30-30H24c0 23.196 18.804 42 42 42v-12Zm-30-30c0-16.569 13.431-30 30-30V92c-23.196 0-42 18.804-42 42h12Zm30-30c16.569 0 30 13.431 30 30h12c0-23.196-18.804-42-42-42v12Z"
    />
  </svg>
);
export default SongIcon;