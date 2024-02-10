import pkg from "./package.json" assert { type: "json" };
import fs from "fs";
import inquirer from "inquirer";
import * as xml2js from "xml2js"

async function main() {
  const [major, minor, bugfix] = pkg.version.split(".").map(Number);
  const nextMajorVersion = `${major + 1}.0.0`;
  const nextMinorVersion = `${major}.${minor + 1}.0`;
  const nextBugFixVersion = `${major}.${minor}.${bugfix + 1}`;

  const { nextVersion } = await inquirer.prompt([
    {
      type: "list",
      name: "nextVersion",
      message: "Choose next version",
      choices: [
        nextMajorVersion,
        nextMinorVersion,
        nextBugFixVersion
      ]
    }
  ]);
  pkg.version = nextVersion;
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  const builder = new xml2js.Builder();
  const rootXmlFile = fs.readFileSync("./config.xml");
  const rootXmlFileJsonContent = await xml2js.parseStringPromise(rootXmlFile);
  rootXmlFileJsonContent.widget['$'].version = nextVersion;
  const newRootXmlContent = builder.buildObject(rootXmlFileJsonContent);
  fs.writeFileSync("./config.xml", newRootXmlContent);
  const androidXmlFile = fs.readFileSync("./platforms/android/app/src/main/res/xml/config.xml");
  const androidXmlJsonContent = await xml2js.parseStringPromise(androidXmlFile);
  androidXmlJsonContent.widget['$'].version = nextVersion;
  const newAndroidXmlContent = builder.buildObject(androidXmlJsonContent);
  fs.writeFileSync("./platforms/android/app/src/main/res/xml/config.xml", newAndroidXmlContent);
}

main();