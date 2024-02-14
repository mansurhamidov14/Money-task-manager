import axios from "axios";
import { File, Blob } from "buffer";
import dotenv from "dotenv";
import fs from "fs";
import { getBuildFilename } from "./helpers.mjs";
dotenv.config();

async function sendApkToChannel() {
  try {
    const cwd = process.cwd();
    const pkgJsonPath = `${cwd}/package.json`;
    const publishedBuildsJsonPath = `${cwd}/published-builds.json`;
    const latestPublishedBuilds = JSON.parse(fs.readFileSync(publishedBuildsJsonPath));
    const latesAndroidBuild = latestPublishedBuilds.android;
    const jsonData = JSON.parse(fs.readFileSync(pkgJsonPath));
    const buildName = getBuildFilename(jsonData.version);
    if (latesAndroidBuild === buildName) {
      throw new Error("Latest build already published to channel");
    }
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    const buildPath = `${cwd}/releases/android/${buildName}`;
    const payload = new FormData();
    const apkBlob = new Blob([fs.readFileSync(buildPath)]);
    const apkFile = new File([apkBlob], buildName);
    payload.append('chat_id', channelId);
    payload.append('document', apkFile);
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      payload,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    latestPublishedBuilds.android = buildName;
    fs.writeFileSync(publishedBuildsJsonPath, JSON.stringify(latestPublishedBuilds, null, 2));
  } catch (e) {
    console.error(e);
  }
}

sendApkToChannel();
