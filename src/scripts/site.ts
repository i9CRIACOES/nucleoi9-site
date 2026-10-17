/**
 * Animações de rolagem e o menu da home. Tudo com GSAP + ScrollTrigger, num
 * registro só. Com `prefers-reduced-motion`, nada se move: os elementos só
 * aparecem.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { barraEscondida, itemDoMenu, quintoBotao } from "../lib/menu-mobile";

gsap.registerPlugin(ScrollTrigger);

const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const celular = window.matchMedia("(max-width: 1023px)");
const q = <T extends Element>(sel: string, raiz: ParentNode = document) => Array.from(raiz.querySelectorAll<T>(sel));

/* ---------------------------------------------------------------- barra topo */
// Declarada como função para já valer na primeira medição da barra, acima.
function folhaAberta() {
  const f = document.getElementById("menu-mobile-folha");
  return !!f && !f.hidden;
}
const topo = document.getElementById("barra-topo");
const barraMobile = document.getElementById("barra-mobile");
let ultimoY = window.scrollY;
let escondida = false;
let agendado = false;
const atualizaTopo = () => {
  const y = window.scrollY;
  topo?.classList.toggle("rolou", y > 40);
  // No celular as barras somem descendo e voltam subindo, para sobrar tela.
  if (celular.matches && !folhaAberta()) {
    escondida = barraEscondida(y, y - ultimoY, escondida);
    topo?.classList.toggle("escondida", escondida);
    barraMobile?.classList.toggle("escondida", escondida);
  } else if (escondida) {
    escondida = false;
    topo?.classList.remove("escondida");
    barraMobile?.classList.remove("escondida");
  }
  ultimoY = y;
};
atualizaTopo();
window.addEventListener(
  "scroll",
  () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      atualizaTopo();
    });
  },
  { passive: true },
);

/* ------------------------------------------------ folha do menu no celular */
const folha = document.getElementById("menu-mobile-folha");
const quinto = document.getElementById("barra-mobile-quinto");
const abreFolha = () => {
  if (!folha) return;
  folha.hidden = false;
  folha.classList.add("fechando");
  requestAnimationFrame(() => requestAnimationFrame(() => folha.classList.remove("fechando")));
  quinto?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
};
const fechaFolha = () => {
  if (!folha || folha.hidden) return;
  folha.classList.add("fechando");
  quinto?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  const fim = () => {
    folha.hidden = true;
    folha.classList.remove("fechando");
  };
  reduzido ? fim() : setTimeout(fim, 300);
};
quinto?.addEventListener("click", () => (folhaAberta() ? fechaFolha() : abreFolha()));
q<HTMLElement>("[data-fecha-folha], [data-folha-item], #menu-mobile-folha [data-acionar]").forEach((el) => el.addEventListener("click", fechaFolha));
document.addEventListener("keydown", (e) => e.key === "Escape" && fechaFolha());

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
const marcaAtivo = (secao: string) => {
  const id = itemDoMenu(secao);
  q<HTMLElement>("[data-menu], [data-folha-item]").forEach((a) => {
    const meu = a.dataset.menu ?? a.dataset.folhaItem;
    a.setAttribute("aria-current", meu === id ? "true" : "false");
  });
  // O quinto botão da barra vira a seção atual quando ela não é um dos fixos.
  const { item, ativo } = quintoBotao(secao);
  q<HTMLElement>("[data-quinto]").forEach((el) => (el.hidden = el.dataset.quinto !== (item?.id ?? "")));
  quinto?.setAttribute("aria-current", ativo ? "true" : "false");
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

  // No celular tudo sobe menos e mais rápido: a tela é curta e a pessoa
  // rola com o dedo, então entrada longa vira atraso.
  const mm = gsap.matchMedia();
  mm.add({ pequeno: "(max-width: 1023px)", grande: "(min-width: 1024px)" }, (ctx) => {
    const pequeno = ctx.conditions?.pequeno ?? false;

    // Blocos soltos: sobem um pouco e aparecem.
    q<HTMLElement>('[data-anim="sobe"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: pequeno ? 16 : 28 },
        { opacity: 1, y: 0, duration: pequeno ? 0.55 : 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
      );
    });

    // Grupos de cartões: em cascata. Num carrossel só os primeiros estão à
    // vista, então a cascata para cedo e o resto já aparece pronto.
    q<HTMLElement>("[data-anim-grupo]").forEach((grupo) => {
      const todos = q<HTMLElement>('[data-anim="cartao"]', grupo);
      if (!todos.length) return;
      const carrossel = pequeno && grupo.classList.contains("carrossel");
      const itens = carrossel ? todos.slice(0, 3) : todos;
      if (carrossel) gsap.set(todos.slice(3), { opacity: 1 });
      gsap.fromTo(
        itens,
        { opacity: 0, y: pequeno ? 14 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: pequeno ? 0.45 : 0.6,
          ease: "power3.out",
          stagger: { each: pequeno ? 0.05 : 0.06, from: "start" },
          scrollTrigger: { trigger: grupo, start: "top 88%", once: true },
        },
      );
    });
  });
}

/* ------------------------------------------- carrosséis no celular */
q<HTMLElement>(".carrossel").forEach((lista) => {
  const itens = Array.from(lista.children) as HTMLElement[];
  if (itens.length < 2) return;
  const pontos = document.createElement("div");
  pontos.className = "carrossel-pontos";
  pontos.setAttribute("role", "tablist");
  pontos.setAttribute("aria-label", "Posição no carrossel");
  itens.forEach((item, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Item ${i + 1} de ${itens.length}`);
    b.addEventListener("click", () => lista.scrollTo({ left: item.offsetLeft - lista.offsetLeft, behavior: reduzido ? "auto" : "smooth" }));
    pontos.appendChild(b);
  });
  lista.insertAdjacentElement("afterend", pontos);
  const atual = () => {
    const meio = lista.scrollLeft + lista.clientWidth / 2;
    let melhor = 0;
    itens.forEach((item, i) => {
      const centro = item.offsetLeft - lista.offsetLeft + item.offsetWidth / 2;
      if (Math.abs(centro - meio) < Math.abs(itens[melhor].offsetLeft - lista.offsetLeft + itens[melhor].offsetWidth / 2 - meio)) melhor = i;
    });
    Array.from(pontos.children).forEach((p, i) => p.setAttribute("aria-current", i === melhor ? "true" : "false"));
  };
  let marcado = false;
  lista.addEventListener(
    "scroll",
    () => {
      if (marcado) return;
      marcado = true;
      requestAnimationFrame(() => {
        marcado = false;
        atual();
      });
    },
    { passive: true },
  );
  // Começa no cartão pedido (ex.: o plano em destaque), sem animar.
  const inicio = Number(lista.dataset.carrosselInicio ?? 0);
  if (inicio > 0 && itens[inicio] && window.innerWidth < 640) {
    lista.scrollLeft = itens[inicio].offsetLeft - lista.offsetLeft;
  }
  atual();
});

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
// As ilhas React hidratam quando entram na tela e mudam a altura da página;
// sem recalcular, o scrollspy marca a seção errada e as entradas disparam
// fora de hora. O observador cobre isso e também a troca de orientação.
window.addEventListener("load", () => ScrollTrigger.refresh());
let refrescar: ReturnType<typeof setTimeout> | undefined;
new ResizeObserver(() => {
  clearTimeout(refrescar);
  refrescar = setTimeout(() => ScrollTrigger.refresh(), 200);
}).observe(document.body);
