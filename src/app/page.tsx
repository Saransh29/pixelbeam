import { Footer } from "~/components/landing-page.tsx/footer";
import { HeroSectionOne } from "~/components/landing-page.tsx/hero";
import { NavbarComponent } from "~/components/landing-page.tsx/navbar";
import { FeaturesSectionDemo } from "~/components/ui/features";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <NavbarComponent>
        <div className="relative z-10 flex w-full flex-col">
          <HeroSectionOne />
          <FeaturesSectionDemo />
        </div>
        <div className="relative z-10 flex w-full items-center justify-center">
          <Footer />
        </div>
      </NavbarComponent>
    </main>
  );
}
