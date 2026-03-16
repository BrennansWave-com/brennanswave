import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PageHero } from "@/components/page/Hero";
import ReportContainer from "@/components/report/Container";

export default function ReportPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Surf Report" description="View the current surf report for Brennan's Wave." />
        <ReportContainer />
      </main>
      <Footer />
    </>
  );
}