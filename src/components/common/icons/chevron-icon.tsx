import { SVGAttributes } from "react";

type ChevronIconProps = {
  isOpened: boolean;
  properties?: SVGAttributes<SVGElement>;
};

// icon for opening the dropdown for the genres
const ChevronIcon = ({ isOpened, properties }: ChevronIconProps) => (
  <svg
    aria-hidden="true"
    className={`hover:stroke-spotify-primary ${
      isOpened && "text-spotify-primary"
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    width={15}
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <path
      d={isOpened ? "M19.5 8.25l-7.5 7.5-7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronIcon;
