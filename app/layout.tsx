
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./context/UserContext";
import Loader from "@/components/layout/Loader";
import { Toaster } from "@/components/ui/sonner";


const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} antialiased`}  >
        {/* SVG Web Background - fixed, full width, hero height */}
        < Toaster position="top-left" />

         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
                    <svg
          className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
          width="100vw"
          height="100vh"
          viewBox="0 0 1920 1080"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Vertical lines */}
          {Array.from({ length: 33 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 70}
              y1={0}
              x2={i * 50}
              y2={1080}
              stroke="#818cf8"
              strokeWidth="1"
              opacity="0.08"
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * 70}
              x2={1920}
              y2={i * 70}
              stroke="#818cf8"
              strokeWidth="1"
              opacity="0.08"
            />
          ))}
        </svg>
            <Loader />
            <UserProvider>
              
              {children}
              
            </UserProvider>

          
            
            
        </ThemeProvider>
      </body>
    </html>
  );
}
