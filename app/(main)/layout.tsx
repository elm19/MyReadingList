import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Separator } from "@radix-ui/react-separator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <Separator className="my-4" /> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
