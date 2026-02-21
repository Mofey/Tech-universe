import type { Planet } from "../types/ml";

type Props = {
  planets: Planet[];
  playerLeft: number;
  playerTop: number;
};

export function MiniMap({ planets, playerLeft, playerTop }: Props) {
  return (
    <aside className="absolute bottom-[90px] right-5 z-20 h-[150px] w-[150px] overflow-hidden rounded-full border border-cyan-300/30 bg-slate-950/90">
      {planets.map((planet) => (
        <span
          key={`${planet.id}-dot`}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${planet.x * 1.5 - 25}%`,
            top: `${planet.y * 1.5 - 25}%`,
            background: planet.color,
            boxShadow: `0 0 5px ${planet.color}`,
          }}
        />
      ))}
      <span
        className="absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_#00ff88]"
        style={{ left: `${playerLeft}%`, top: `${playerTop}%` }}
      />
    </aside>
  );
}
