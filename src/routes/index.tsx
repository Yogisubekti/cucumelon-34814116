import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CollectionInfo } from "@/components/CollectionInfo";
import { Roadmap } from "@/components/Roadmap";
import { WhitelistForm } from "@/components/WhitelistForm";
import { OpenSeaCTA } from "@/components/OpenSeaCTA";
import { Footer } from "@/components/Footer";
import heroAsset from "@/assets/cuke-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cucumelon — Pixel Art NFT Collection" },
      {
        name: "description",
        content:
          "Cucumelon is a pixel-powered NFT collection of weird, expressive cucumber-melon characters. Explore traits and view the collection on OpenSea.",
      },
      { property: "og:title", content: "Cucumelon — Pixel Art NFT Collection" },
      {
        property: "og:description",
        content: "Fresh pixels. Weird characters. A pixel-art NFT collection on Robinhood Chain.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroAsset },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cucumelon — Pixel Art NFT Collection" },
      {
        name: "twitter:description",
        content: "Fresh pixels. Weird characters. A pixel-art NFT collection on Robinhood Chain.",
      },
      { name: "twitter:image", content: heroAsset },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CollectionInfo />
        <Roadmap />
        <WhitelistForm />
        <OpenSeaCTA />
      </main>
      <Footer />
    </div>
  );
}
