import useRemoveEndText from "@/hooks/use-remove-end-text";
import SectionTitle from "../common/template/section-title";

const ArtistDescription = ({
  description,
  url,
}: {
  description: string;
  url: string;
}) => {
  const textWithoutEnd = useRemoveEndText(description);

  if (textWithoutEnd.length === 0) {
    return <></>;
  }

  return (
    <section className={"flex flex-col gap-4"}>
      <div className={"flex flex-wrap items-center justify-between"}>
        <SectionTitle>Description</SectionTitle>
        <small className={"text-justify text-sm hover:underline"}>
          <a target="_blank" href={url} rel="noopener noreferrer">
            Description provided by Last.fm
          </a>
        </small>
      </div>
      <article
        dangerouslySetInnerHTML={{
          __html: textWithoutEnd,
        }}
      />
    </section>
  );
};

export default ArtistDescription;
