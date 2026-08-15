"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all bg-white/30 dark:bg-black/40 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-xl hover:scale-110"
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400 text-2xl drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
      ) : (
        <FaMoon className="text-blue-600 text-2xl drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
      )}
    </button>
  );
}
