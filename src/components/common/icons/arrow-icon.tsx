import { SVGAttributes } from "react";

import { Direction } from "@/components/dashboard/track-carousel";

type ArrowIconProps = {
  direction: Direction;
  properties?: SVGAttributes<SVGElement>;
};

// icon managing the carousel of top tracks
const ArrowIcon = ({ direction, properties }: ArrowIconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    id={direction === Direction.Left ? "swiper-back" : "swiper-forward"}
    stroke="currentColor"
    strokeWidth={3}
    viewBox="0 0 24 24"
    width={150}
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <path
      className="hover:cursor-pointer hover:stroke-spotify-primary"
      d={
        direction === Direction.Left
          ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      }
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowIcon;
