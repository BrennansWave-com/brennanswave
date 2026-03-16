import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";

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
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {/* Hero / intro */}
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Brennan&apos;s Wave
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Brennan&apos;s Wave is a popular, man-made whitewater park on the Clark Fork River in downtown Missoula, Montana, completed in 2006 to honor kayaker Brennan Guth. Located near Caras Park, it serves kayakers, surfers, and standup paddleboarders with two main features—a beginner-friendly wave and a more challenging main wave.
            </p>
          </section>
          {/* Key details */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Key Details
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-3">
                <span className="font-medium text-gray-800 shrink-0">Location:</span>
                <span className="text-gray-700">Downtown Missoula, Montana, adjacent to Caras Park.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-gray-800 shrink-0">Purpose:</span>
                <span className="text-gray-700">Built in memory of Brennan Guth, a world-class local kayaker who passed away in Chile in 2001.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-gray-800 shrink-0">Features:</span>
                <span className="text-gray-700">Two main, year-round surfing waves: &quot;Middle Brennan&apos;s&quot; (beginner, 900–3,500 cfs) and &quot;Main Brennan&apos;s&quot; (intermediate/expert, 3,500–6,000 cfs).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-gray-800 shrink-0">Infrastructure:</span>
                <span className="text-gray-700">The site includes improved access, an observation deck, and nearby seating, with renovations completed in 2025.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-gray-800 shrink-0">Usage:</span>
                <span className="text-gray-700">A hub for river recreation, especially in the evenings and during summer, and popular for both surfing and viewing.</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
