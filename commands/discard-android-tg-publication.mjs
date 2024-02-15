import dotenv from "dotenv";
import fs from "fs";
import { Telegram } from "telegraf";

dotenv.config();

async function discardPublication() {
  try {
    const cwd = process.cwd();
    const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN);
    const unpublishedVersion =
      process.env.UNPUBLISH_VERSION ||
      JSON.parse(fs.readFileSync(`${cwd}/package.json`)).version;
    const publishedBuildsJsonPath = `${cwd}/publish-history.json`;
    const publishHistory = JSON.parse(fs.readFileSync(publishedBuildsJsonPath));
    const unpublishedData = publishHistory.find(publication => publication.platform === "android" && publication.version === unpublishedVersion);
    if (!unpublishedData) {
      throw new Error(`Version ${unpublishedVersion} hasn't been published yet`);
    }

    const { messageId, chatId } = unpublishedData;
    const result = await telegram.deleteMessage(chatId, messageId);
    const updatedHistory = publishHistory.filter(publication => publication.platform !== "android" || publication.version !== unpublishedVersion);
    fs.writeFileSync(publishedBuildsJsonPath, JSON.stringify(updatedHistory, null, 2));
  } catch (e) {
    console.error(e.message);
  }
}

discardPublication();