import type { ReactNode } from "react";
import "./advice.css";

export default function AdviceLayout({ children }: { children: ReactNode }) {
  return <div className="advice">{children}</div>;
}
