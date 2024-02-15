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
    const publishedBuildsJsonPath = `${cwd}/publish-history.json`;
    const publishHistory = JSON.parse(fs.readFileSync(publishedBuildsJsonPath));
    const packageData = JSON.parse(fs.readFileSync(pkgJsonPath));
    const buildVersion = packageData.version;
    const buildName = getBuildFilename(buildVersion);
    const isPublished = publishHistory.some(
      publication => publication.platform === "android" && publication.version === buildVersion
    );
    if (isPublished) {
      throw new Error("Latest build already published to channel");
    }
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    const buildPath = `${cwd}/releases/android/${buildName}`;
    const payload = new FormData();
    const apkBlob = new Blob([fs.readFileSync(buildPath)]);
    const apkFile = new File([apkBlob], buildName);
    payload.append('chat_id', channelId);
    payload.append('document', apkFile);
    const { data } = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      payload,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    publishHistory.push({
      platform: "android",
      version: buildVersion,
      fileName: buildName,
      chatId: channelId,
      messageId: data.result.message_id,
      date: new Date().toISOString()
    });
    fs.writeFileSync(publishedBuildsJsonPath, JSON.stringify(publishHistory, null, 2));
  } catch (e) {
    console.error(e.message);
  }
}

sendApkToChannel();
