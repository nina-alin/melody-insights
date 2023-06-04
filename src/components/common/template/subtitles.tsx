import React from "react";
import Link from "next/link";

type SubtitlesProps = {
  items: string[];
  baseUrl: string;
};

const Subtitles = ({ items, baseUrl }: SubtitlesProps) => {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <span className="hover:underline">
            <Link href={`${baseUrl}/${item}`}>{item}</Link>
          </span>

          {index < items.length - 1 && <span>{",\u00A0"}</span>}
        </React.Fragment>
      ))}
    </>
  );
};

export default Subtitles;
