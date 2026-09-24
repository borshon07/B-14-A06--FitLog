import Image from "next/image";
import logo from "@/Assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-100">
      <div className="footer mx-auto max-w-[1280px] items-center justify-center justify-items-center gap-3 px-6 py-8 text-center sm:footer-horizontal sm:justify-between sm:justify-items-start sm:text-left">
        <aside className="grid-flow-col items-center gap-2">
          <Image
            src={logo}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          <span className="font-oswald text-sm font-bold uppercase tracking-wider">
            FITLOG
          </span>
        </aside>

        <p className="text-xs font-medium text-base-content/60 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}