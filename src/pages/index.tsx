import { NextPage } from "next";
import GreenButton from "@/components/common/template/green-button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../components/common/states/loading";

const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") router.push("/dashboard");
  }, [session]);

  if (session.status === "loading") return <Loading />;

  return (
    <div className="flex flex-col gap-10">
      <h1>Find REAL suggestions about your likes</h1>
      <p>
        Spotify Enhanced is a complement to Spotify that helps you find new
        music based on your tastes
      </p>
      <p>
        No music, no playlists. Just here to provide real informations about
        what you&apos;re listening
      </p>
      <GreenButton
        onClick={() => router.push("/api/auth/signin")}
        label="Sign up with Spotify"
      />
    </div>
  );
};
export default Home;
