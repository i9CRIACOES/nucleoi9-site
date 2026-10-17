import { describe, expect, it } from "vitest";
import { acesosEm } from "./AutomaticoPassos";
import { AUTOMATICO } from "../lib/conteudo";

describe("passo a passo do automático", () => {
  it("acende um passo de cada vez, do primeiro até a equipe entrar", () => {
    expect(acesosEm(0)).toBe(0);
    let antes = 0;
    for (let t = 0; t < 20000; t += 100) {
      const n = acesosEm(t);
      expect(n - antes).toBeLessThanOrEqual(1);
      antes = n;
    }
    expect(antes).toBe(AUTOMATICO.passos.length + 1);
  });

  it("tem o passo da reunião com agenda e o de voz", () => {
    expect(AUTOMATICO.passos.some((p) => p.icone === "CalendarCheck")).toBe(true);
    expect(AUTOMATICO.passos.some((p) => p.icone === "Mic")).toBe(true);
  });
});
