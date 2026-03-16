import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PageHero } from "@/components/page/Hero";
import ReportContainer from "@/components/report/Container";

export default function ReportPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Surf Report" description="Receive a daily surf report for Brennan's Wave straight to your email inbox." backgroundImage="/images/brennans-wave-winter.jpg"/>
        <ReportContainer />
      </main>
      <Footer />
    </>
  );
}