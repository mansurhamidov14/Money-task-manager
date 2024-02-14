import fs from "fs";
import { getBuildFilename } from "./helpers.mjs";

const cwd = process.cwd();
const buildPath = cwd + "/platforms/android/app/build/outputs/apk/debug";
const buildJsonData = `${buildPath}/output-metadata.json`
const defaultBuildName = `${buildPath}/app-debug.apk`;

try {
  const jsonData = JSON.parse(fs.readFileSync(buildJsonData));
  fs.accessSync(defaultBuildName);
  const fileName = getBuildFilename(jsonData.elements[0].versionName);
  const buildFilePath = `${cwd}/releases/android/${fileName}`;
  try {
    fs.accessSync(buildFilePath);
    fs.unlinkSync(buildFilePath);
  } catch {} finally {
    fs.renameSync(defaultBuildName, buildFilePath);
    const builtFilePath = fs.realpathSync(buildFilePath);
    console.log("Build completed. Built apk:");
    console.log("        " + builtFilePath);
  }
} catch (e) {
  console.error(e);
  console.log("There is no apk build found");
}
