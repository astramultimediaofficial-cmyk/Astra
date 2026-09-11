import CategorySection from "@/component/category/CategorySection";
import EventSection from "@/component/event/EventSection";
import FooterSection from "@/component/footer/FooterSection";
import HomeHero from "@/component/home/HomeHero";
import HomeNavbar from "@/component/home/HomeNavbar";
import VideoModal from "@/component/modal/VideoModal";
import TestimonialSection from "@/component/testimonial/TestimonialSection";
import ScrollToTopButton from "@/component/utils/ScrollToTopButton";
import WorkSection from "@/component/work/WorkSection";

export const metadata = {
  title: "Astra Multimedia | Home (Legacy)",
  description: "Excellence in digital education from the experts.",
};

export default function HomeLegacy() {
  return (
    <div className="home-premium astra-site">
      <HomeNavbar logo="images/logo.png" />
      <HomeHero />
      <div id="home-content" className="home-premium__content">
        <CategorySection />
        <EventSection section="tf__event mt_95" startIndex={0} endIndex={4} />
        <WorkSection />
        <TestimonialSection />
        <FooterSection />
      </div>
      <VideoModal />
      <ScrollToTopButton style="" />
    </div>
  );
}
