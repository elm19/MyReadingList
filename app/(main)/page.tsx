

import HeroSection from "@/components/HeroSection";
import { getUser } from "../(auth)/actions";

export default async function Home() {
  const user = await getUser()
  return (
    <>
      {!user && <HeroSection />}
    </>
  );
}
