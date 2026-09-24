import Image from "next/image";
import logo from "@/Assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-page pb-8 pt-[33px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          <span className="font-oswald text-sm font-bold uppercase leading-5 tracking-[0.7px] text-fg">
            FITLOG
          </span>
        </div>

        <p className="text-center text-xs font-medium leading-4 text-muted sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}