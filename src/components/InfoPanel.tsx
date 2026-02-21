import { useState } from "react";
import type { Universe } from "../types/ml";

type Props = {
  title: string;
  message: string;
  planets: number;
  explored: number;
  universes: Universe[];
  activeUniverseId: string;
  onChangeUniverse: (id: string) => void;
};

export function InfoPanel({
  title,
  message,
  planets,
  explored,
  universes,
  activeUniverseId,
  onChangeUniverse,
}: Props) {
  const [showTipsMobile, setShowTipsMobile] = useState(false);

  return (
    <aside className="absolute left-2 right-2 top-2 z-30 max-h-[calc(100dvh-8.5rem)] overflow-y-auto rounded-2xl border border-cyan-300/30 bg-slate-950/95 p-3 shadow-[0_0_40px_rgba(0,150,255,0.2)] backdrop-blur-xl sm:left-5 sm:right-auto sm:top-5 sm:z-20 sm:max-h-none sm:max-w-[380px] sm:p-5">
      <label className="mb-3 block">
        <span className="mb-1 block text-[11px] tracking-wide text-cyan-300">GALAXY</span>
        <select
          className="w-full rounded-lg border border-cyan-300/30 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
          value={activeUniverseId}
          onChange={(e) => onChangeUniverse(e.target.value)}
        >
          {universes.map((universe) => (
            <option key={universe.id} value={universe.id}>
              {universe.title}
            </option>
          ))}
        </select>
      </label>

      <h2 className="mb-2 font-orbitron text-base font-bold text-cyan-300 sm:mb-3 sm:text-lg">
        {title}
      </h2>
      <p className="mb-3 text-xs leading-5 text-slate-300 sm:mb-4 sm:text-sm sm:leading-6">
        {message}
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-cyan-400/10 p-3">
          <div className="font-semibold text-cyan-300">Planets</div>
          <div className="font-orbitron text-xl text-white">{planets}</div>
        </div>
        <div className="rounded-lg bg-violet-400/10 p-3">
          <div className="font-semibold text-violet-300">Explored</div>
          <div className="font-orbitron text-xl text-white">{explored}</div>
        </div>
      </div>

      <button
        type="button"
        className="mt-3 flex w-full items-center justify-between rounded-lg border border-cyan-300/30 bg-slate-900/70 px-3 py-2 text-xs text-cyan-300 sm:hidden"
        onClick={() => setShowTipsMobile((v) => !v)}
        aria-expanded={showTipsMobile}
      >
        <span>NAVIGATION TIPS</span>
        <span>{showTipsMobile ? "^" : "v"}</span>
      </button>

      <div
        className={`mt-3 overflow-y-auto border-t border-cyan-300/20 pt-3 sm:mt-4 sm:block sm:pt-4 ${
          showTipsMobile ? "block" : "hidden"
        }`}
      >
        <div className="mb-1 text-[11px] text-violet-300">NAVIGATION TIPS</div>
        <div className="text-xs leading-6 text-slate-400">
          Drag to pan the galaxy
          <br />
          Scroll or buttons to zoom
          <br />
          Click planets to explore
        </div>
      </div>
    </aside>
  );
}
