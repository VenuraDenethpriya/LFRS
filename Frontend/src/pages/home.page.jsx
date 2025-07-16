import Hero from "@/Hero";
import AboutUs from "@/AboutUs";
import SubSection from "@/SubSection";
import Questions from "@/Questions";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function HomePage() {
  const { user, isLoaded } = useUser(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role === "admin") {
      navigate("/dashboard");
    }
  }, [isLoaded, user, navigate]);

  // Prevent showing homepage while redirect is happening
  if (isLoaded && user?.publicMetadata?.role === "admin") {
    return null;
  }

  return (
    <>
      <Hero />
      <SubSection />
      <AboutUs />
      <Questions />
    </>
  );
}

export default HomePage;
