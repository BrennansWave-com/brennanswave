

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SurflineContainer } from "@/components/surfline/container";

export default function SurflinePage() {
  return (
    <>
      <Header />
        <main>
          <SurflineContainer />
        </main>
      <Footer />
    </>
  );
}