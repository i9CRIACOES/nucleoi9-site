import { describe, expect, it } from "vitest";
import { MENU } from "./conteudo";
import { FIXOS, SECAO_PARA_MENU, barraEscondida, itemDoMenu, quintoBotao } from "./menu-mobile";

describe("barra inferior do celular", () => {
  it("os fixos existem no menu", () => {
    for (const f of FIXOS) expect(MENU.some((m) => m.id === f), f).toBe(true);
  });

  it("toda seção fora do menu aponta para um item que existe", () => {
    for (const [secao, item] of Object.entries(SECAO_PARA_MENU)) {
      expect(MENU.some((m) => m.id === item), `${secao} → ${item}`).toBe(true);
      expect(MENU.some((m) => m.id === secao), `${secao} já está no menu`).toBe(false);
    }
  });

  it("o quinto botão mostra a seção atual só quando ela não é fixa", () => {
    expect(quintoBotao("inicio")).toEqual({ item: null, ativo: false });
    expect(quintoBotao("planos").ativo).toBe(false);
    expect(quintoBotao("agentes").item?.id).toBe("agentes");
    expect(quintoBotao("automatico").item?.id).toBe("agentes");
    expect(quintoBotao("faq").ativo).toBe(true);
    expect(quintoBotao("nao-existe")).toEqual({ item: null, ativo: false });
    expect(itemDoMenu("cta")).toBe("planos");
  });

  it("a barra some descendo, volta subindo e fica à vista perto do topo", () => {
    expect(barraEscondida(50, 40, true)).toBe(false);
    expect(barraEscondida(800, 40, false)).toBe(true);
    expect(barraEscondida(800, -40, true)).toBe(false);
    expect(barraEscondida(800, 3, true)).toBe(true);
    expect(barraEscondida(800, -3, false)).toBe(false);
  });
});
