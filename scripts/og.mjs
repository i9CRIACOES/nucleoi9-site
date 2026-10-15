/**
 * Gera public/og.png (1200×630) a partir de scripts/og.html, com o Chromium
 * do Playwright. Rodar: `npm run og`.
 */
import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const aqui = dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(resolve(aqui, "og.html")).href;
const saida = resolve(aqui, "..", "public", "og.png");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: saida, type: "png" });
await browser.close();
console.log("OG gerada em", saida);
