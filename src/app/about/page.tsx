import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { PageHero } from "@/components/page/Hero";
import AboutContainer from "@/components/about/Container";

export const metadata: Metadata = {
  title: "About Brennan's Wave | BrennansWave.com",
  description:
    "Brennan's Wave is a man-made whitewater park on the Clark Fork River in downtown Missoula, Montana. Built in 2006 in memory of kayaker Brennan Guth. Features two year-round waves for kayakers, surfers, and paddleboarders.",
  openGraph: {
    title: "About Brennan's Wave | BrennansWave.com",
    description:
      "Learn about Brennan's Wave — location, purpose, features, and river recreation in Missoula, Montana.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <PageHero title="About Brennan's Wave" description="Learn about Brennan's Wave — location, purpose, features, and river recreation in Missoula, Montana." />
        <AboutContainer />
      </main>
      <Footer />
    </>
  );
}
