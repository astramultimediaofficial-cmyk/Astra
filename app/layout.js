import { AstraProvider } from "@/context/AstraContext";
import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "@/public/css/style.css";
import "@/public/css/home-premium.css";
import "@/public/css/movie-carousel-3d.css";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <AstraProvider>
        <body>
          {children}
          <ToastContainer />
        </body>
      </AstraProvider>
    </html>
  );
}
