import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CollectionGrid } from "@/components/CollectionGrid";
import { About } from "@/components/About";
import { Traits } from "@/components/Traits";
import { CollectionInfo } from "@/components/CollectionInfo";
import { Roadmap } from "@/components/Roadmap";
import { OpenSeaCTA } from "@/components/OpenSeaCTA";
import { Footer } from "@/components/Footer";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <CollectionGrid />
        <About />
        <Traits />
        <CollectionInfo />
        <Roadmap />
        <OpenSeaCTA />
      </main>
      <Footer />
    </div>
  );
}
