/**
 * O funil encenado: os cards trocam de coluna sozinhos (FLIP à mão: guarda a
 * posição antes, mede depois, anima a diferença) e um fecha como Ganha com
 * confete. Os totais de cada coluna recalculam a partir do estado.
 */
import { gsap } from "gsap";
import { Trophy } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ETAPAS, MOVIMENTOS, OPORTUNIDADES_INICIAIS, brl, type Etapa, type Oportunidade } from "../dados";

export function Funil() {
  const [ops, setOps] = useState<Oportunidade[]>(OPORTUNIDADES_INICIAIS);
  const [movendo, setMovendo] = useState<string | null>(null);
  const [confete, setConfete] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const posicoes = useRef(new Map<string, DOMRect>());

  // Guarda onde cada card está ANTES de o estado mudar.
  const medir = () => {
    const m = new Map<string, DOMRect>();
    raiz.current?.querySelectorAll<HTMLElement>("[data-card]").forEach((el) => m.set(el.dataset.card!, el.getBoundingClientRect()));
    posicoes.current = m;
  };

  useEffect(() => {
    const timers = MOVIMENTOS.map((mv) =>
      setTimeout(() => {
        medir();
        setMovendo(mv.id);
        setOps((lista) => lista.map((o) => (o.id === mv.id ? { ...o, etapa: mv.para } : o)));
        if (mv.para === "ganha") setConfete(true);
        setTimeout(() => setMovendo(null), 700);
      }, mv.em),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Depois de o React mover o card no DOM, anima da posição antiga até a nova.
  useLayoutEffect(() => {
    const antes = posicoes.current;
    if (!antes.size) return;
    raiz.current?.querySelectorAll<HTMLElement>("[data-card]").forEach((el) => {
      const a = antes.get(el.dataset.card!);
      if (!a) return;
      const d = el.getBoundingClientRect();
      const dx = a.left - d.left;
      const dy = a.top - d.top;
      if (!dx && !dy) return;
      gsap.fromTo(el, { x: dx, y: dy, scale: 1.04, boxShadow: "0 12px 28px rgba(11,36,54,.22)" }, { x: 0, y: 0, scale: 1, boxShadow: "0 1px 3px rgba(11,36,54,.08)", duration: 0.65, ease: "power3.inOut" });
    });
    posicoes.current = new Map();
  }, [ops]);

  const porEtapa = (e: Etapa) => ops.filter((o) => o.etapa === e);
  const total = (e: Etapa) => porEtapa(e).reduce((s, o) => s + o.valor, 0);

  return (
    <div ref={raiz} className="relative h-full">
      <div className="flex h-full min-w-[720px] gap-2 overflow-x-auto pb-1">
        {ETAPAS.map((et) => {
          const lista = porEtapa(et.id);
          const ganha = et.id === "ganha";
          return (
            <div key={et.id} className={`flex w-[148px] shrink-0 flex-col rounded-xl p-2 ${ganha ? "bg-success/10" : "bg-white"} border border-line`}>
              <div className="mb-2 px-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-semibold text-navy">{et.nome}</h4>
                  <span className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${ganha ? "bg-success" : "bg-navy"}`}>{lista.length}</span>
                </div>
                <p className="text-[10px] text-muted">
                  {et.prob} · <span className="tabular-nums">{brl(total(et.id))}</span>
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                {lista.map((o) => (
                  <div
                    key={o.id}
                    data-card={o.id}
                    className={`rounded-lg border bg-white p-2 text-[10px] shadow-card ${movendo === o.id ? "z-10 border-brand" : "border-line"} ${o.etapa === "ganha" ? "border-success" : ""}`}
                  >
                    <p className="truncate font-semibold text-navy">{o.titulo}</p>
                    <p className="truncate text-muted">{o.contato}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-semibold tabular-nums text-navy">{brl(o.valor)}</span>
                      {o.etapa === "ganha" ? (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-success px-1.5 py-0.5 text-[9px] font-bold text-white">
                          <Trophy className="size-2.5" /> Ganha
                        </span>
                      ) : (
                        <span className="rounded-full bg-chip px-1.5 py-0.5 text-[9px] font-semibold text-brand">{o.origem.split(" ")[0]}</span>
                      )}
                    </div>
                  </div>
                ))}
                {!lista.length && <p className="rounded-lg border border-dashed border-line p-3 text-center text-[10px] text-muted">Solte aqui</p>}
              </div>
            </div>
          );
        })}
      </div>

      {confete && (
        <div className="pointer-events-none absolute right-10 top-10" aria-hidden="true">
          {Array.from({ length: 26 }, (_, i) => {
            const ang = (i / 26) * Math.PI * 2;
            const dist = 70 + (i % 5) * 22;
            const cor = ["#0075BE", "#35CC62", "#2790D2", "#F59E0B", "#0F3349"][i % 5];
            return (
              <span
                key={i}
                className="absolute block h-2 w-1.5 rounded-sm"
                style={{
                  background: cor,
                  ["--dx" as string]: `${Math.cos(ang) * dist}px`,
                  ["--dy" as string]: `${Math.sin(ang) * dist + 60}px`,
                  animation: `simConfete ${0.9 + (i % 4) * 0.15}s cubic-bezier(.2,.7,.3,1) forwards`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
