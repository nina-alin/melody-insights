import { SVGAttributes } from "react";

const ArrowRightIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      fill="none"
      width={25}
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

export default ArrowRightIcon;
