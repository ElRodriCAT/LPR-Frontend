import { useRef, useImperativeHandle, forwardRef, useState } from "react";

const TopLoadingBar = forwardRef((props, ref) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  useImperativeHandle(ref, () => ({
    start() {
      setVisible(true);
      setProgress(0);
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setProgress((p) => (p < 80 ? p + Math.random() * 7 + 2 : p));
      }, 120);
    },
    finish() {
      clearInterval(timer.current);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    },
    reset() {
      clearInterval(timer.current);
      setVisible(false);
      setProgress(0);
    },
  }));

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[3px] z-[9999] transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="bg-blue-500 h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

export default TopLoadingBar;
