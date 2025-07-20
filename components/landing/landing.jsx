import CallToAction from "./sections/CallToAction";
import Demo from "./sections/Demo";
import Features from "./sections/Fea";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Pricing from "./sections/Pricing";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Demo />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
