/**
 * Regenerate PNG favicons from public/favicon.svg (run after editing the SVG).
 * Usage: node scripts/generate-favicons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "favicon.svg");

const svg = fs.readFileSync(svgPath);
await sharp(svg).resize(32, 32).png().toFile(path.join(root, "public", "favicon-32.png"));
await sharp(svg).resize(48, 48).png().toFile(path.join(root, "public", "favicon-48.png"));
console.log("Wrote public/favicon-32.png and public/favicon-48.png");
