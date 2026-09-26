import NavbarContainer from "@/Componants/NavbarContainer";
import HeroSection from "@/Componants/hero-banner";
import Library from "@/Componants/Library";

export default function HomePage() {
  return (
    <>
      <NavbarContainer />

      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="pt-8 sm:pt-12">
          <HeroSection />
        </div>

        <Library />
      </main>
    </>
  );
}
