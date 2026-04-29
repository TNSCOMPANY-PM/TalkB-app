const sharp = require("sharp");
const path = require("path");

const channelDir = path.join(__dirname, "../public/channel");

const tasks = [
  {
    input: path.join(channelDir, "profile.svg"),
    output: path.join(channelDir, "profile.png"),
    width: 640,
    height: 640,
  },
  {
    input: path.join(channelDir, "background.svg"),
    output: path.join(channelDir, "background.png"),
    width: 1080,
    height: 780,
  },
];

async function convert() {
  for (const task of tasks) {
    await sharp(task.input)
      .resize(task.width, task.height)
      .png({ quality: 95 })
      .toFile(task.output);
    console.log(`✅ ${path.basename(task.output)} (${task.width}x${task.height})`);
  }
}

convert().catch((err) => {
  console.error("변환 실패:", err.message);
  process.exit(1);
});
