/**
 * PWA 아이콘 생성 스크립트
 * 주황색(#E85D3A) 배경에 흰색 "T" — 임시 아이콘, 추후 실제 로고로 교체
 */
const sharp = require("sharp");
const path = require("path");

const ACCENT = { r: 232, g: 93, b: 58, alpha: 1 };
const sizes = [192, 512];

// 중앙에 흰색 "T" 텍스트를 올린 SVG 오버레이
function makeSvgOverlay(size) {
  const fontSize = Math.round(size * 0.52);
  const y = Math.round(size * 0.685);
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
    `<text x="${size / 2}" y="${y}" ` +
    `font-family="Arial, Helvetica, sans-serif" font-weight="900" ` +
    `font-size="${fontSize}" fill="white" text-anchor="middle">T</text>` +
    `</svg>`
  );
}

async function generate() {
  for (const size of sizes) {
    const outPath = path.join(__dirname, "..", "public", `icon-${size}.png`);

    // 단색 배경 생성 후 SVG 텍스트 합성
    await sharp({
      create: { width: size, height: size, channels: 4, background: ACCENT },
    })
      .composite([{ input: makeSvgOverlay(size), blend: "over" }])
      .png()
      .toFile(outPath);

    console.log(`✓ icon-${size}.png`);
  }
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
