export type PlanetStats = {
  power: number;
  versatility: number;
  learning: number;
};

export type PlanetQuiz = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Planet = {
  id: string;
  name: string;
  size: number;
  x: number;
  y: number;
  color: string;
  gradient: string;
  glowColor: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  stats: PlanetStats;
  concepts: string[];
  keyFormula: string;
  detailedMath: string;
  quiz: PlanetQuiz;
};

export type UniverseConfig = {
  universe_title: string;
  welcome_message: string;
};

export type Universe = {
  id: string;
  title: string;
  message: string;
  planets: Planet[];
};
