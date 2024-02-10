import fs from "fs";

const buildPath = "./platforms/android/app/build/outputs/apk/debug";
const buildJsonData = `${buildPath}/output-metadata.json`
const defaultBuildName = `${buildPath}/app-debug.apk`;

try {
  const jsonData = JSON.parse(fs.readFileSync(buildJsonData));
  fs.accessSync(defaultBuildName);
  const buildFileName = `./releases/android/wfo-v${jsonData.elements[0].versionName}.apk`;
  try {
    fs.accessSync(buildFileName);
    fs.unlinkSync(buildFileName);
  } catch {} finally {
    fs.renameSync(defaultBuildName, buildFileName);
    const builtFilePath = fs.realpathSync(buildFileName);
    console.log("Build completed. Built apk:");
    console.log("        " + builtFilePath);
  }
} catch (e) {
  console.error(e);
  console.log("There is no apk build found");
}
