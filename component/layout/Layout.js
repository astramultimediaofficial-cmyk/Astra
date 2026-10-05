"use client";

import FooterSection from "../footer/FooterSection";
import HomeNavbar from "../home/HomeNavbar";
import ScrollToTopButton from "../utils/ScrollToTopButton";

const Layout = ({ children, mainClassName = "" }) => {
  return (
    <div className="astra-site">
      <HomeNavbar logo="/images/logo.png" />
      <main className={`astra-site__main ${mainClassName}`.trim()}>
        {children}
      </main>
      <ScrollToTopButton style="" />
      <FooterSection />
    </div>
  );
};

export default Layout;
