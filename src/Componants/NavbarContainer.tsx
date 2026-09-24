"use client";

import Navbar from "@/Componants/Navbar";
import { usePlan } from "@/AllPlan/myplan";

export default function NavbarContainer() {
  const { planIds, savedIds } = usePlan();

  return <Navbar planCount={planIds.length} savedCount={savedIds.length} />;
}