import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { PageHero } from "@/components/page/Hero";
import ContactContainer from "@/components/contact/Container";

export const metadata: Metadata = {
  title: "Contact Brennan's Wave | BrennansWave.com",
  description:
    "Brennan's Wave is a man-made whitewater park on the Clark Fork River in downtown Missoula, Montana. Built in 2006 in memory of kayaker Brennan Guth. Features two year-round waves for kayakers, surfers, and paddleboarders.",
  openGraph: {
    title: "Contact Brennan's Wave | BrennansWave.com",
    description:
      "Contact Brennan's Wave — location, purpose, features, and river recreation in Missoula, Montana.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <PageHero title="Contact Brennan's Wave" description="Contact Brennan's Wave — location, purpose, features, and river recreation in Missoula, Montana." />
        <ContactContainer />
      </main>
      <Footer />
    </>
  );
}
