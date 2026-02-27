import { useState, useRef, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import InteractiveGradientAI from "../components/InteractiveGradientAI";
import TopLoadingBar from "../components/TopLoadingBar";
import { LoadingBarProvider } from "../context/LoadingBarContext";

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loadingRef = useRef();

  const onMainScroll = useCallback((e) => {
    setScrolled(e.currentTarget.scrollTop > 8);
  }, []);

  return (
    <LoadingBarProvider loadingRef={loadingRef}>
      <div className="h-screen w-full text-text-primary flex overflow-hidden relative">
        <TopLoadingBar ref={loadingRef} />
        <InteractiveGradientAI />
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <Topbar scrolled={scrolled} />

          <main
            className="flex-1 overflow-auto p-6 scroll-smooth"
            onScroll={onMainScroll}
          >
            <div className="max-w-7xl mx-auto relative z-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </LoadingBarProvider>
  );
}
