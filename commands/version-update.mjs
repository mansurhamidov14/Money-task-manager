import fs from "fs";
import inquirer from "inquirer";
import * as xml2js from "xml2js";

async function main() {
  const cwd = process.cwd();
  const rootXmlPath = cwd + "/config.xml";
  const androidXmlPath = cwd + "/platforms/android/app/src/main/res/xml/config.xml";
  const pkgJsonPath = cwd + "/package.json";
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath));
  const [major, minor, bugfix] = pkg.version.split(".").map(Number);
  const nextMajorVersion = `${major + 1}.0.0`;
  const nextMinorVersion = `${major}.${minor + 1}.0`;
  const nextPatchVersion = `${major}.${minor}.${bugfix + 1}`;

  const { nextVersion } = await inquirer.prompt([
    {
      type: "list",
      name: "nextVersion",
      message: "Choose next version",
      choices: [
        nextPatchVersion,
        nextMinorVersion,
        nextMajorVersion,
      ]
    }
  ]);
  pkg.version = nextVersion;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
  const builder = new xml2js.Builder();
  const rootXmlFile = fs.readFileSync(rootXmlPath);
  const rootXmlFileJsonContent = await xml2js.parseStringPromise(rootXmlFile);
  rootXmlFileJsonContent.widget['$'].version = nextVersion;
  const newRootXmlContent = builder.buildObject(rootXmlFileJsonContent);
  fs.writeFileSync(rootXmlPath, newRootXmlContent);
  const androidXmlFile = fs.readFileSync(androidXmlPath);
  const androidXmlJsonContent = await xml2js.parseStringPromise(androidXmlFile);
  androidXmlJsonContent.widget['$'].version = nextVersion;
  const newAndroidXmlContent = builder.buildObject(androidXmlJsonContent);
  fs.writeFileSync(androidXmlPath, newAndroidXmlContent);
}

main();