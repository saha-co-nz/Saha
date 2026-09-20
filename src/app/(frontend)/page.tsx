import Footer from "@/src/components/common/Footer";
import Header from "@/src/components/common/Header";
import HomeCTA from "@/src/components/home/HomeCTA";
import HomeCredibility from "@/src/components/home/HomeCredibility";
import HomeClientEffects from "@/src/components/home/HomeClientEffects";
import HomeFeatureBand from "@/src/components/home/HomeFeatureBand";
import HomeHero from "@/src/components/home/HomeHero";
import HomeIntro from "@/src/components/home/HomeIntro";
import HomeTicker from "@/src/components/home/HomeTicker";
import HomeValuesStrip from "@/src/components/home/HomeValuesStrip";
import StartSmaller from "@/src/components/common/StartSmaller";

export default function HomePage() {
  return (
    <>
      <HomeClientEffects />
      <Header />
      <div className="page active" id="section-home">
        <HomeHero />
        <HomeTicker />
        <HomeCredibility />
        <HomeIntro />
        <HomeFeatureBand />
        <StartSmaller />
        <HomeValuesStrip />
        <HomeCTA />
      </div>
      <Footer />
    </>
  );
}
