import { describe, expect, it } from "vitest";
import { estadoEm } from "./MontarAgente";

describe("encenação da ficha do Agente iA", () => {
  it("começa em rascunho, sem passo pronto", () => {
    const e = estadoEm(0);
    expect(e.feitos).toBe(0);
    expect(e.chips[0]).toBe("Rascunho");
    expect(e.publicado).toBe(false);
  });

  it("só publica depois dos 9 passos e sobe os degraus em ordem até Ligado", () => {
    let antes = estadoEm(0);
    for (let t = 0; t < 20000; t += 100) {
      const e = estadoEm(t);
      if (e.publicado) expect(e.feitos).toBe(9);
      expect(e.degrau).toBeGreaterThanOrEqual(antes.degrau);
      if (e.degrau > 0) expect(e.publicado).toBe(true);
      antes = e;
    }
    expect(antes.degrau).toBe(3);
    expect(antes.chips).toEqual(["Ligado", "Piloto automático", "v3", "Suporte"]);
  });
});
