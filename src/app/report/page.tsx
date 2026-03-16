

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PageHero } from "@/components/page/Hero";
import ReportContainer from "@/components/report/Container";
import { getCurrentUser, getCurrentUserAuthToken } from "@/app/actions/auth";

export default async function SurfReportPage() {
  const user = await getCurrentUser();
  const userAuthToken = await getCurrentUserAuthToken();
  return (
    <>
      <Header />
        <main>
          <PageHero title="Surf Report" description="View the current surf report for Brennan's Wave." />
          <ReportContainer user={user} userAuthToken={userAuthToken} />
        </main>
      <Footer />
    </>
  );
}