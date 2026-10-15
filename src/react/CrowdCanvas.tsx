/**
 * Multidão caminhando no rodapé do hero: um sprite (Open Peeps, CC0) fatiado
 * em `rows × cols` pessoas, cada uma atravessando a tela com um balancinho.
 * Adaptado do Skiper 39 (inspirado em codepen.io/zadvorsky/pen/xxwbBQV).
 */
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type Props = { src: string; rows?: number; cols?: number };

type Peep = {
  rect: [number, number, number, number];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
};

const aleatorio = (min: number, max: number) => min + Math.random() * (max - min);

export default function CrowdCanvas({ src, rows = 15, cols = 7 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const stage = { width: 0, height: 0 };
    const todos: Peep[] = [];
    const livres: Peep[] = [];
    const multidao: Peep[] = [];

    const reiniciar = (p: Peep) => {
      const direita = Math.random() > 0.5;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - p.height + offsetY;
      let startX: number;
      let endX: number;
      if (direita) {
        startX = -p.width;
        endX = stage.width;
        p.scaleX = 1;
      } else {
        startX = stage.width + p.width;
        endX = 0;
        p.scaleX = -1;
      }
      p.x = startX;
      p.y = startY;
      p.anchorY = startY;
      return { startX, startY, endX };
    };

    const caminhar = (p: Peep) => {
      const { startY, endX } = reiniciar(p);
      const xDur = 10;
      const yDur = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(aleatorio(0.5, 1.5));
      tl.to(p, { duration: xDur, x: endX, ease: "none" }, 0);
      tl.to(p, { duration: yDur, repeat: xDur / yDur, yoyo: true, y: startY - 10 }, 0);
      return tl;
    };

    const tirar = () => livres.splice(Math.floor(Math.random() * livres.length), 1)[0];

    const entrar = (): Peep => {
      const p = tirar();
      const walk = caminhar(p).eventCallback("onComplete", () => {
        multidao.splice(multidao.indexOf(p), 1);
        livres.push(p);
        entrar();
      });
      p.walk = walk;
      multidao.push(p);
      multidao.sort((a, b) => a.anchorY - b.anchorY);
      return p;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      for (const p of multidao) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.scaleX, 1);
        ctx.drawImage(img, p.rect[0], p.rect[1], p.rect[2], p.rect[3], 0, 0, p.width, p.height);
        ctx.restore();
      }
      ctx.restore();
    };

    const redimensionar = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      multidao.forEach((p) => p.walk?.kill());
      multidao.length = 0;
      livres.length = 0;
      livres.push(...todos);
      // Em tela estreita, menos gente, senão vira um bolo.
      const quantos = Math.max(12, Math.min(todos.length, Math.round(stage.width / 28)));
      while (multidao.length < quantos && livres.length) entrar().walk?.progress(Math.random());
    };

    const iniciar = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const rw = w / rows;
      const rh = h / cols;
      // Pessoas menores que no original: o hero é alto e elas são só textura.
      const escala = 0.62;
      for (let i = 0; i < rows * cols; i++) {
        todos.push({
          rect: [(i % rows) * rw, Math.floor(i / rows) * rh, rw, rh],
          width: rw * escala,
          height: rh * escala,
          x: 0,
          y: 0,
          anchorY: 0,
          scaleX: 1,
          walk: null,
        });
      }
      redimensionar();
      gsap.ticker.add(render);
    };

    img.onload = iniciar;
    img.src = src;
    window.addEventListener("resize", redimensionar);
    return () => {
      window.removeEventListener("resize", redimensionar);
      gsap.ticker.remove(render);
      multidao.forEach((p) => p.walk?.kill());
    };
  }, [src, rows, cols]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-90" aria-hidden="true" />;
}
