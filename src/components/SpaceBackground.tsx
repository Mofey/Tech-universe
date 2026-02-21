import { useMemo, type CSSProperties } from "react";

type Star = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: string;
  minOpacity: number;
  delay: string;
};

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: `${Math.random() * 3 + 2}s`,
    minOpacity: Math.random() * 0.3 + 0.1,
    delay: `${Math.random() * 5}s`,
  }));
}

type Props = {
  isMobile?: boolean;
};

export function SpaceBackground({ isMobile = false }: Props) {
  const stars = useMemo(() => makeStars(isMobile ? 140 : 320), [isMobile]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={
              {
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                animation: isMobile ? "none" : undefined,
                "--duration": star.duration,
                "--min-opacity": star.minOpacity,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div
        className={`pointer-events-none absolute left-[5%] top-[10%] h-[300px] w-[400px] rounded-full opacity-30 ${isMobile ? "blur-[35px]" : "blur-[60px]"}`}
        style={{ background: "radial-gradient(ellipse, rgba(138,43,226,0.4), transparent)" }}
      />
      <div
        className={`pointer-events-none absolute right-[10%] top-[60%] h-[350px] w-[350px] rounded-full opacity-30 ${isMobile ? "blur-[35px]" : "blur-[60px]"}`}
        style={{ background: "radial-gradient(ellipse, rgba(0,191,255,0.3), transparent)" }}
      />
      <div
        className={`pointer-events-none absolute bottom-[20%] left-[30%] h-[250px] w-[300px] rounded-full opacity-30 ${isMobile ? "blur-[35px]" : "blur-[60px]"}`}
        style={{ background: "radial-gradient(ellipse, rgba(255,105,180,0.25), transparent)" }}
      />
    </>
  );
}
