/**
 * "Acionar agora" com partículas que são atraídas para o botão no hover.
 * Adaptado do Magnetize Button (21st.dev), sem framer-motion: GSAP já está
 * no site. O `data-acionar` é o que a Lista de espera escuta.
 */
import { gsap } from "gsap";
import { Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = { rotulo: string; particulas?: number };

export default function BotaoMagnetico({ rotulo, particulas = 14 }: Props) {
  const [atraindo, setAtraindo] = useState(false);
  const raiz = useRef<HTMLButtonElement>(null);
  // Posições "aleatórias" mas determinísticas: o servidor e o navegador
  // precisam desenhar o mesmo HTML, senão o React reclama da hidratação.
  const pontos = useMemo(() => {
    let s = 7;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: particulas }, (_, i) => ({
      id: i,
      x: Math.round(rnd() * 260 - 130),
      y: Math.round(rnd() * 180 - 90),
      tamanho: 4 + Math.round(rnd() * 4),
    }));
  }, [particulas]);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const dots = Array.from(el.querySelectorAll<HTMLElement>("[data-dot]"));
    if (atraindo) {
      gsap.to(dots, { x: 0, y: 0, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.6)", stagger: 0.015 });
    } else {
      dots.forEach((d, i) => gsap.to(d, { x: pontos[i].x, y: pontos[i].y, opacity: 0.45, duration: 0.6, ease: "power3.out" }));
    }
  }, [atraindo, pontos]);

  return (
    <button
      ref={raiz}
      type="button"
      data-acionar
      onMouseEnter={() => setAtraindo(true)}
      onMouseLeave={() => setAtraindo(false)}
      onTouchStart={() => setAtraindo(true)}
      onTouchEnd={() => setAtraindo(false)}
      className="relative inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-light"
    >
      {pontos.map((p) => (
        <span
          key={p.id}
          data-dot
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-brand-light"
          style={{ width: p.tamanho, height: p.tamanho, transform: `translate(${p.x}px, ${p.y}px)`, opacity: 0.45 }}
        />
      ))}
      <Zap className={`relative size-4 transition-transform ${atraindo ? "scale-125" : ""}`} />
      <span className="relative">{rotulo}</span>
    </button>
  );
}
