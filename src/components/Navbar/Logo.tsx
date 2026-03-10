"use client"

export function AirflowLogo({ theme, className = "w-8 h-8" }: { theme: "light" | "dark", className?: string }) {
  return (
    <svg
      viewBox="0 2 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >

      <path
        d="M8 15C12 15 14 12 18 12C22 12 24 15 28 15C30 15 32 14 32 14"
        stroke={theme === "light" ? "black" : "white"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 25C12 25 14 22 18 22C22 22 24 25 28 25C30 25 32 24 32 24"
        stroke={theme === "light" ? "black" : "white"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M8 35C12 35 14 32 18 32C22 32 24 35 28 35C30 35 32 34 32 34"
        stroke={theme === "light" ? "black" : "white"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  );
}