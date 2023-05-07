import { getSession } from "next-auth/react";
import Center from "../../components/Center";
import Sidebar from "../../components/Sidebar";
import Player from "../../components/Player";
import { NextSeo } from "next-seo";

export default function Home() {
  const keywords = [
    "React",
    "Next.js",
    "Tailwind",
    "NextAuth",
    "Recoil",
    "Spotify API",
    "authentication",
    "middleware",
    "web development",
    "programming",
    "GitHub",
    "Vercel",
    "deployment",
    "front-end",
    "JavaScript",
    "HTML",
    "CSS",
    "control",
    "web wrapper",
    "premium account",
  ];

  return (
    <div className="">
      <NextSeo
        title="Spotify Clone"
        description="Small web wrapper for Spotify control"
        additionalMetaTags={[
          {
            property: "author",
            content: "Amr Fateem",
          },
          {
            name: "keywords",
            content: keywords,
          },
        ]}
      />
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
