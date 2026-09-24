import Link from "next/link";
import NavbarContainer from "@/Componants/NavbarContainer";

export default function NotFound() {
  return (
    <>
      <NavbarContainer />

      <main className="mx-auto flex min-h-[70vh] w-full max-w-[1280px] flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-oswald text-8xl font-bold leading-none text-accent sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-oswald text-2xl font-bold uppercase tracking-wide">
          Page not found
        </h1>
        <p className="mt-2 max-w-sm text-sm text-base-content/60">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary mt-8 rounded-full text-xs">
          Back to workouts
        </Link>
      </main>
    </>
  );
}