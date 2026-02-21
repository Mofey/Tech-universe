import { useEffect, useState } from "react";
import type { Planet } from "../types/ml";

type Props = {
  planet: Planet | null;
  foundationTitle: string;
  onClose: () => void;
};

export function PlanetDetailModal({ planet, foundationTitle, onClose }: Props) {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setStarted(false);
    setSelected(null);
  }, [planet?.id]);

  if (!planet) return null;
  const isCorrect = selected === planet.quiz.correct;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <section
        className="relative max-h-[80vh] w-full max-w-[600px] overflow-y-auto rounded-2xl border border-cyan-300/40 bg-slate-950 p-8 shadow-[0_0_60px_rgba(0,150,255,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-red-300/40 bg-red-300/10 text-xl text-red-400 transition hover:scale-110 hover:bg-red-300/20"
          onClick={onClose}
        >
          x
        </button>

        <div className="mb-5 flex items-center gap-5">
          <div
            className="h-20 w-20 rounded-full"
            style={{
              background: planet.gradient,
              boxShadow: `0 0 30px ${planet.glowColor}`,
            }}
          />
          <div>
            <h2 className="font-orbitron text-3xl" style={{ color: planet.color }}>
              {planet.name}
            </h2>
            <div className="text-sm text-slate-400">
              {planet.category} | {planet.difficulty}
            </div>
          </div>
        </div>

        <p className="mb-5 text-sm leading-7 text-slate-300">{planet.description}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {planet.concepts.map((concept) => (
            <span
              key={concept}
              className="rounded-full border border-violet-300/50 bg-violet-400/20 px-3 py-1 text-[11px] text-violet-200"
            >
              {concept}
            </span>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Object.entries(planet.stats).map(([key, value]) => (
            <div key={key} className="rounded-lg bg-white/5 p-3">
              <div className="mb-1 text-[11px] uppercase text-slate-400">{key}</div>
              <div className="h-2 overflow-hidden rounded bg-white/10">
                <div
                  className="h-full rounded"
                  style={{
                    width: `${value}%`,
                    background: `linear-gradient(90deg, ${planet.color}, ${planet.glowColor})`,
                  }}
                />
              </div>
              <div className="mt-1 font-orbitron text-lg" style={{ color: planet.color }}>
                {value}%
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5 rounded-lg border border-cyan-300/30 bg-cyan-950/40 p-4 font-mono text-sm text-emerald-300">
          <div className="mb-2 text-[11px] text-slate-400">KEY FORMULA</div>
          {planet.keyFormula}
        </div>

        <div className="mb-6 rounded-xl bg-cyan-950/40 p-5">
          <h3 className="mb-3 font-orbitron text-sm text-cyan-300">{foundationTitle}</h3>
          <div
            className="text-sm leading-7 text-slate-300"
            dangerouslySetInnerHTML={{ __html: planet.detailedMath }}
          />
        </div>

        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2 font-orbitron text-xs text-white transition hover:scale-105"
          onClick={() => {
            setStarted(true);
            setSelected(null);
          }}
        >
          Take the Challenge
        </button>

        {started && (
          <div className="mt-5 rounded-xl border border-cyan-300/40 bg-cyan-950/50 p-5">
            <h4 className="mb-3 text-cyan-300">Q: {planet.quiz.question}</h4>
            <div className="space-y-2">
              {planet.quiz.options.map((option, i) => {
                const correct = selected !== null && i === planet.quiz.correct;
                const incorrect = selected === i && i !== planet.quiz.correct;
                const locked = selected !== null;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-disabled={locked}
                    onClick={() => {
                      if (locked) return;
                      setSelected(i);
                    }}
                    className={`block w-full rounded-lg border p-3 text-left text-sm transition ${
                      correct
                        ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                        : incorrect
                          ? "border-red-400 bg-red-400/20 text-red-300"
                          : "border-cyan-300/30 bg-cyan-300/10 text-slate-200 hover:bg-cyan-300/20"
                    } ${locked ? "cursor-not-allowed" : ""}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <div
                className={`mt-4 rounded-lg border p-4 ${
                  isCorrect
                    ? "border-emerald-400 bg-emerald-400/15"
                    : "border-red-400 bg-red-400/15"
                }`}
              >
                <div
                  className={`mb-1 text-base ${isCorrect ? "text-emerald-300" : "text-red-300"}`}
                >
                  {isCorrect ? "Correct!" : "Not quite!"}
                </div>
                <div className="text-sm text-slate-300">{planet.quiz.explanation}</div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
