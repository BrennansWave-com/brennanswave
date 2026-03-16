import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LoginFormCard } from "@/components/auth/LoginFormCard";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <LoginFormCard redirectTo="/report" />
      </main>
      <Footer />
    </>
  );
}
