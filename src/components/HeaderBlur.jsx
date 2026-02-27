import { useEffect, useState } from "react";

export default function HeaderBlur() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-black/30 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
        <span className="font-bold text-lg tracking-tight text-white">Header Blur</span>
      </div>
    </header>
  );
}
