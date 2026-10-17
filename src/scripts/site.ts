/**
 * Animações de rolagem e o menu da home. Tudo com GSAP + ScrollTrigger, num
 * registro só. Com `prefers-reduced-motion`, nada se move: os elementos só
 * aparecem.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const q = <T extends Element>(sel: string, raiz: ParentNode = document) => Array.from(raiz.querySelectorAll<T>(sel));

/* ---------------------------------------------------------------- barra topo */
const topo = document.getElementById("barra-topo");
const atualizaTopo = () => topo?.classList.toggle("rolou", window.scrollY > 40);
atualizaTopo();
window.addEventListener("scroll", atualizaTopo, { passive: true });

/* ----------------------------------------------------------------- progresso */
const progresso = document.getElementById("progresso");
if (progresso) {
  gsap.to(progresso, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.2 },
  });
}

/* ----------------------------------------------------------------- scrollspy */
const marcaAtivo = (id: string) => {
  q<HTMLAnchorElement>("[data-menu]").forEach((a) => {
    a.setAttribute("aria-current", a.dataset.menu === id ? "true" : "false");
  });
};
q<HTMLElement>("[data-secao]").forEach((s) => {
  ScrollTrigger.create({
    trigger: s,
    start: "top 45%",
    end: "bottom 45%",
    onToggle: (st) => st.isActive && marcaAtivo(s.dataset.secao ?? ""),
  });
});

/* ------------------------------------------------------------- aparecimentos */
if (reduzido) {
  q<HTMLElement>("[data-anim]").forEach((el) => (el.style.opacity = "1"));
} else {
  // Títulos: cada linha sobe de dentro da máscara.
  q<HTMLElement>('[data-anim="titulo"]').forEach((t) => {
    const linhas = q<HTMLElement>(".linha-mask > span", t);
    gsap.set(t, { opacity: 1 });
    gsap.from(linhas, {
      yPercent: 110,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.09,
      scrollTrigger: { trigger: t, start: "top 85%", once: true },
    });
  });

  // Blocos soltos: sobem um pouco e aparecem.
  q<HTMLElement>('[data-anim="sobe"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
    );
  });

  // Grupos de cartões: em cascata.
  q<HTMLElement>("[data-anim-grupo]").forEach((grupo) => {
    const itens = q<HTMLElement>('[data-anim="cartao"]', grupo);
    if (!itens.length) return;
    gsap.fromTo(
      itens,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: { each: 0.06, from: "start" },
        scrollTrigger: { trigger: grupo, start: "top 85%", once: true },
      },
    );
  });
}

/* ----------------------------------------------------------------- contadores */
q<HTMLElement>("[data-contador]").forEach((el) => {
  const alvo = Number(el.dataset.contador ?? 0);
  if (reduzido) {
    el.textContent = String(alvo);
    return;
  }
  const obj = { v: 0 };
  gsap.to(obj, {
    v: alvo,
    duration: 1.6,
    ease: "power2.out",
    onUpdate: () => (el.textContent = String(Math.round(obj.v))),
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
  });
});

/* ------------------------------------------- conversa da IA e notificações */
const sequencia = (sel: string, itemSel: string, de: gsap.TweenVars, cada = 0.45) => {
  q<HTMLElement>(sel).forEach((lista) => {
    const itens = q<HTMLElement>(itemSel, lista);
    if (!itens.length || reduzido) return;
    gsap.fromTo(itens, de, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.4)",
      stagger: cada,
      scrollTrigger: { trigger: lista, start: "top 80%", once: true },
    });
  });
};
sequencia("[data-notificacoes]", "[data-notif]", { opacity: 0, x: 40 }, 0.4);

/* --------------------------------------------- FAQ: um aberto de cada vez */
q<HTMLDetailsElement>("#faq details").forEach((d) => {
  d.addEventListener("toggle", () => {
    if (!d.open) return;
    q<HTMLDetailsElement>("#faq details").forEach((o) => o !== d && (o.open = false));
  });
});

/* -------------------------------- recalcula quando as ilhas carregarem */
window.addEventListener("load", () => ScrollTrigger.refresh());
