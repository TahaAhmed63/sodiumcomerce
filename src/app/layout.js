import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/store/ReduxProvider";
import MiniCart from "@/Components/mincart/MiniCart";
import 'bootstrap/dist/css/bootstrap.min.css';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sodium Fashion Shop",
  description: "Sodium Fashion Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
           <Providers>
                    <Header/>
        {children}
        <MiniCart /> 
        <Footer/>
        </Providers>

      </body>
    </html>
  );
}
