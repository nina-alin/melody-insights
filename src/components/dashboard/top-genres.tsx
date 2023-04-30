import { useRouter } from "next/router";
import ClickableChip from "../common/template/clickable_chip";
import { GetUserTopItems } from "@/interface/user/user";

const TopGenres = ({ topArtists }: { topArtists: GetUserTopItems }) => {
  const router = useRouter();

  const uniqueGenres: string[] = [
    ...new Set<string>(topArtists.items.map((item) => item.genres).flat()),
  ];
  return (
    <section>
      <h2>Current favorites genres:</h2>
      <div className="flex flex-wrap gap-2">
        {uniqueGenres.map((genre) => (
          <ClickableChip
            key={genre}
            label={genre}
            onClick={() => router.push(`/genres/${genre}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default TopGenres;
