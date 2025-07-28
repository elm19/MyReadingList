import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className=" min-h-screen ">{children}</main>
      <Footer />
    </div>
  );
}
