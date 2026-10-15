/**
 * O palco do Agente iA na seção Agentes: o orbe + o estado (ouvindo,
 * pensando, falando) + a frase que ele está dizendo, num roteiro em laço.
 * Botão "Testar com a minha voz" liga o microfone (só com o clique da
 * pessoa) e o orbe passa a reagir à voz dela.
 */
import { Ear, Mic, MicOff, MessageSquareText, Sparkles, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import OrbeIA, { type EstadoOrbe } from "./OrbeIA";

type Fala = { cliente: string; agente: string };

const FALAS: Fala[] = [
  { cliente: "Oi, vi o anúncio. Como funciona para clínica?", agente: "Olá! Eu sou a assistente da Clínica Viva. Te explico em um minuto e já agendo uma avaliação. Prefere manhã ou tarde?" },
  { cliente: "Tá caro, não?", agente: "Entendo. Pensa no custo de um paciente que liga e não é atendido. A avaliação é sem compromisso: quinta às 15h está livre." },
  { cliente: "Vocês têm experiência com isso?", agente: "Temos. Atendemos mais de 200 marcas em 20 anos, e a clínica fica com o histórico de cada paciente no mesmo lugar." },
];

const ROTEIRO: { estado: EstadoOrbe; duracao: number }[] = [
  { estado: "ouvindo", duracao: 2600 },
  { estado: "pensando", duracao: 1100 },
  { estado: "falando", duracao: 5200 },
];

const ROTULO: Record<EstadoOrbe, { texto: string; Icone: typeof Ear }> = {
  ouvindo: { texto: "Ouvindo o cliente", Icone: Ear },
  pensando: { texto: "Pensando na resposta", Icone: Sparkles },
  falando: { texto: "Respondendo por voz e texto", Icone: Volume2 },
  parado: { texto: "Em espera", Icone: MessageSquareText },
};

export default function AgenteOrbe() {
  const [passo, setPasso] = useState(0);
  const [fala, setFala] = useState(0);
  const [mic, setMic] = useState<"desligado" | "pedindo" | "ligado" | "negado">("desligado");
  const analisador = useRef<{ analyser: AnalyserNode; dados: Uint8Array<ArrayBuffer>; ctx: AudioContext; stream: MediaStream } | null>(null);

  const estado: EstadoOrbe = mic === "ligado" ? "ouvindo" : ROTEIRO[passo].estado;

  // Roteiro em laço (pausa enquanto o microfone está ligado).
  useEffect(() => {
    if (mic === "ligado") return;
    const t = setTimeout(() => {
      setPasso((p) => {
        const prox = (p + 1) % ROTEIRO.length;
        if (prox === 0) setFala((f) => (f + 1) % FALAS.length);
        return prox;
      });
    }, ROTEIRO[passo].duracao);
    return () => clearTimeout(t);
  }, [passo, mic]);

  const nivelDoMic = useCallback(() => {
    const a = analisador.current;
    if (!a) return 0;
    a.analyser.getByteFrequencyData(a.dados);
    let soma = 0;
    for (let i = 0; i < a.dados.length; i++) {
      const v = a.dados[i] / 255;
      soma += v * v;
    }
    return Math.min(Math.sqrt(soma / a.dados.length) * 4.5, 1);
  }, []);

  async function ligarMic() {
    setMic("pedindo");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      const ctx = new AudioContext();
      if (ctx.state === "suspended") await ctx.resume();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      ctx.createMediaStreamSource(stream).connect(analyser);
      analisador.current = { analyser, dados: new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>, ctx, stream };
      setMic("ligado");
    } catch {
      setMic("negado");
    }
  }

  function desligarMic() {
    const a = analisador.current;
    if (a) {
      a.stream.getTracks().forEach((t) => t.stop());
      a.ctx.close().catch(() => {});
      analisador.current = null;
    }
    setMic("desligado");
  }

  useEffect(() => () => desligarMic(), []);

  const { texto: rotulo, Icone } = ROTULO[estado];
  const atual = FALAS[fala];

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="relative w-[min(300px,70vw)]">
        <div className="absolute inset-[6%] rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
        <OrbeIA estado={estado} nivelExterno={mic === "ligado" ? nivelDoMic : undefined} />
        <span
          className={`absolute left-1/2 top-[92%] inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${
            estado === "falando" ? "bg-success text-navy" : "bg-white text-navy"
          }`}
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-light opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          <Icone className="size-3.5" />
          {mic === "ligado" ? "Ouvindo você" : rotulo}
        </span>
      </div>

      <div className="mt-3 min-h-[88px] w-full max-w-md" aria-live="polite">
        {mic === "ligado" ? (
          <p className="text-sm text-sidebar-fg">Fale alguma coisa. O orbe reage à sua voz, como reage à do seu cliente.</p>
        ) : (
          <>
            <p className="text-sm text-sidebar-fg">
              <span className="font-semibold text-white">Cliente:</span> {atual.cliente}
            </p>
            <p className={`mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-opacity duration-500 ${estado === "falando" ? "opacity-100" : "opacity-40"}`}>
              <span className="font-semibold text-brand-light">Agente iA:</span> {atual.agente}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {mic === "ligado" ? (
          <button type="button" onClick={desligarMic} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-navy">
            <MicOff className="size-4" /> Parar
          </button>
        ) : (
          <button type="button" onClick={ligarMic} disabled={mic === "pedindo"} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/30 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60">
            <Mic className="size-4" /> {mic === "pedindo" ? "Pedindo o microfone…" : "Testar com a minha voz"}
          </button>
        )}
        {mic === "negado" && <span className="text-xs text-sidebar-fg">Sem microfone liberado. Tudo bem, o orbe segue na simulação.</span>}
      </div>
    </div>
  );
}
