import { useEffect, useState } from "react";

/** Número que sobe de 0 até `alvo` em `duracao` ms, ao montar. */
export function useContador(alvo: number, duracao = 1400, atraso = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    let t0 = 0;
    const timer = setTimeout(() => {
      const tick = (agora: number) => {
        if (!t0) t0 = agora;
        const k = Math.min(1, (agora - t0) / duracao);
        const e = 1 - Math.pow(1 - k, 3);
        setV(Math.round(alvo * e));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, atraso);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [alvo, duracao, atraso]);
  return v;
}

/** `true` depois de `ms` desde a montagem. Para encenar passos. */
export function useDepois(ms: number) {
  const [ok, setOk] = useState(ms <= 0);
  useEffect(() => {
    if (ms <= 0) return;
    const t = setTimeout(() => setOk(true), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return ok;
}

/** Texto que vai sendo digitado, a partir de `inicio` ms. */
export function useDigitando(texto: string, inicio: number, porLetra = 28) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    let intervalo: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      intervalo = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= texto.length && intervalo) clearInterval(intervalo);
      }, porLetra);
    }, inicio);
    return () => {
      clearTimeout(t);
      if (intervalo) clearInterval(intervalo);
    };
  }, [texto, inicio, porLetra]);
  return texto.slice(0, n);
}

/** `true` quando o sistema pede menos movimento. Lido uma vez, ao montar. */
export function useMenosMovimento() {
  const [menos] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return menos;
}

/**
 * Quantos dos `tempos` (ms desde a montagem) já passaram. Para encenar uma
 * sequência. Com menos movimento, devolve tudo de uma vez.
 */
export function useEtapas(tempos: number[], menos = false) {
  const [n, setN] = useState(menos ? tempos.length : 0);
  useEffect(() => {
    if (menos) return;
    const ts = tempos.map((ms, i) => setTimeout(() => setN((v) => Math.max(v, i + 1)), ms));
    return () => ts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menos, tempos.join(",")]);
  return n;
}
