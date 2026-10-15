/**
 * Preloader de abertura: um contador 000→100 em Inter Tight cujo PESO sobe
 * junto com o número (hairline → black), uma régua de ticks e, no fim, um
 * painel azul que levanta com a frase "Tudo num só lugar." antes de sumir.
 * Adaptado do Weight Sweep Preloader, nas cores do Núcleo i9.
 *
 * Só na primeira visita da sessão. Com `prefers-reduced-motion`, não existe.
 * O `html.preloader` (posto por um script inline no layout) cobre a tela
 * antes de este componente montar, para o hero não piscar.
 */
import { useEffect, useState } from "react";

const CHAVE = "ni9-preloader";
const DURACAO = 1500;
const TICKS = 40;

const pad = (n: number) => String(Math.max(0, Math.min(100, Math.floor(n)))).padStart(3, "0");
const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

export default function Preloader() {
  const [ativo, setAtivo] = useState(false);
  const [pct, setPct] = useState(0);
  const [fase, setFase] = useState<"conta" | "painel" | "sai">("conta");

  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visto = false;
    try {
      visto = sessionStorage.getItem(CHAVE) === "1";
    } catch {
      /* sem storage: mostra uma vez e segue */
    }
    if (reduzido || visto) {
      document.documentElement.classList.remove("preloader");
      return;
    }
    setAtivo(true);
    try {
      sessionStorage.setItem(CHAVE, "1");
    } catch {
      /* ignora */
    }
  }, []);

  useEffect(() => {
    if (!ativo) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (agora: number) => {
      const k = Math.min(1, (agora - t0) / DURACAO);
      setPct(ease(k) * 100);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setFase("painel");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ativo]);

  useEffect(() => {
    if (fase === "painel") {
      const t = setTimeout(() => setFase("sai"), 1100);
      return () => clearTimeout(t);
    }
    if (fase === "sai") {
      document.documentElement.classList.remove("preloader");
      const t = setTimeout(() => setAtivo(false), 700);
      return () => clearTimeout(t);
    }
  }, [fase]);

  if (!ativo) return null;

  const peso = Math.round(100 + 800 * (pct / 100));
  const acesos = Math.round((pct / 100) * TICKS);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] overflow-hidden bg-navy text-white transition-opacity duration-700 ${fase === "sai" ? "pointer-events-none opacity-0" : ""}`}
    >
      <div className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-fg sm:inset-x-10">
        <span className="flex items-center gap-2">
          <img src="/marca/nucleo-i9-horizontal.svg" alt="" className="h-6 w-auto rounded bg-white px-1" />
        </span>
        <span className="tabular-nums">peso {peso}</span>
      </div>
      <div className="absolute inset-x-6 top-[52px] border-t border-white/15 sm:inset-x-10" />

      <p
        className="absolute bottom-0 left-2 m-0 whitespace-nowrap font-display leading-[0.74] tabular-nums"
        style={{
          fontSize: "min(68vh, 42vw)",
          fontWeight: peso,
          fontVariationSettings: `'wght' ${peso}`,
          letterSpacing: `${-0.02 - 0.06 * ((peso - 100) / 800)}em`,
          transform: "translateY(6%)",
        }}
      >
        {pad(pct)}
      </p>

      <div className="absolute inset-x-6 top-16 flex items-end justify-between gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-fg sm:inset-x-10">
        <span>Ligando o seu Núcleo i9</span>
        <div className="flex h-[11px] flex-[0_1_min(46vw,520px)] items-end justify-between">
          {Array.from({ length: TICKS + 1 }, (_, i) => (
            <i
              key={i}
              className={`w-px bg-current ${i % 10 === 0 ? "h-[11px]" : "h-[5px]"} ${i <= acesos ? "opacity-100" : "opacity-20"}`}
            />
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 grid place-content-center bg-brand text-white transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(.76,0,.24,1)] ${
          fase === "conta" ? "translate-y-[101%]" : "translate-y-0"
        }`}
      >
        <p className={`garrafal px-6 text-center text-[clamp(2rem,7vw,5rem)] transition-all delay-300 duration-700 ${fase === "conta" ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}>
          Tudo num só lugar.
        </p>
      </div>
    </div>
  );
}
