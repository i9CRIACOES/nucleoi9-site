import { describe, expect, it } from "vitest";
import { PASSOS, TELAS, indiceDaTela, proximo } from "./roteiro";

describe("roteiro do simulador", () => {
  it("passa por todas as telas e volta ao começo", () => {
    let i = 0;
    const vistas: string[] = [];
    for (let n = 0; n < PASSOS.length; n++) {
      vistas.push(PASSOS[i].tela);
      i = proximo(i);
    }
    expect(vistas).toEqual(["dashboard", "contatos", "conversas", "empresas", "funil"]);
    expect(i).toBe(0);
  });

  it("acha o índice de cada tela do menu", () => {
    for (const t of TELAS) expect(PASSOS[indiceDaTela(t.id)].tela).toBe(t.id);
  });

  it("toda tela dura o bastante para a encenação terminar", () => {
    for (const p of PASSOS) expect(p.duracao).toBeGreaterThanOrEqual(4000);
  });
});
