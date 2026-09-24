import type { Metadata } from "next";
import NavbarContainer from "@/Componants/NavbarContainer";
import MyPlanView from "@/Componants/MyplanViewShow/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan | FitLog",
};

export default function MyPlanPage() {
  return (
    <>
      <NavbarContainer />
      <MyPlanView />
    </>
  );
}