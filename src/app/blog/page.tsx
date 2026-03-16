import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { PageHero } from "@/components/page/Hero";
import BlogContainer from "@/components/blog/Container";

export const metadata: Metadata = {
  title: "Blog | BrennansWave.com",
  description:
    "Read the latest news and updates about Brennan's Wave.",
  openGraph: {
    title: "Blog | BrennansWave.com",
    description:
      "Read the latest news and updates about Brennan's Wave.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <PageHero title="Blog" description="Read the latest news and updates about Brennan's Wave." />
        <BlogContainer />
      </main>
      <Footer />
    </>
  );
}
