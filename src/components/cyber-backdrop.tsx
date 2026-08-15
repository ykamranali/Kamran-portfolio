"use client";

/**
 * Ambient PCB-style texture + scanning sweep sitting behind the HTML
 * portfolio sections (Skills/Projects/Stats/Timeline/Contact). Pure
 * CSS/SVG — no extra WebGL cost — so it layers a "security console" feel
 * across the whole scroll without touching the 3D gallery render.
 */
export default function CyberBackdrop() {
  const circuitPattern =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 40H24M56 40H80M40 0V24M40 56V80' stroke='%2300E5FF' stroke-width='1' fill='none' opacity='0.55'/%3E%3Cpath d='M24 40h8v-8h8' stroke='%2300E5FF' stroke-width='1' fill='none' opacity='0.4'/%3E%3Cpath d='M56 40h-8v8h-8' stroke='%238A2EFF' stroke-width='1' fill='none' opacity='0.4'/%3E%3Ccircle cx='40' cy='40' r='2.5' fill='%2300E5FF' opacity='0.6'/%3E%3Ccircle cx='24' cy='40' r='1.5' fill='%2300E5FF' opacity='0.5'/%3E%3Ccircle cx='56' cy='40' r='1.5' fill='%238A2EFF' opacity='0.5'/%3E%3Ccircle cx='40' cy='24' r='1.5' fill='%2300E5FF' opacity='0.5'/%3E%3Ccircle cx='40' cy='56' r='1.5' fill='%238A2EFF' opacity='0.5'/%3E%3C/svg%3E";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* PCB circuit texture */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-screen"
        style={{ backgroundImage: `url("${circuitPattern}")`, backgroundSize: "80px 80px" }}
      />
      {/* Faint radial glows to break up the repetition */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#8A2EFF]/5 rounded-full blur-[160px]" />
      {/* Vertical scanning sweep, viewport-fixed so it's always active */}
      <div className="fixed inset-x-0 top-0 h-full">
        <div className="cyber-scanline absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-cyan-400/[0.06] to-transparent" />
      </div>
    </div>
  );
}
