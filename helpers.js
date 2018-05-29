const fs = require("fs");
const { exec } = require("child_process");

const path = require("path");

const pathName = process.cwd();

const basePath = pathName.match(/.+?(?=\/knowledge-web)/);

const {
  scssTemplate,
  indexTemplate,
  componentTemplate,
  containerTemplate,
  componentTestTemplate,
  containerTestTemplate
} = require("./templates.js");

function component(jsxName) {
  exec(`mkdir ${basePath}/knowledge-web/src/app/components/${jsxName}`, () => {
    makeComponentFiles(jsxName);
  });
}

function makeComponentFiles(jsxName) {
  const scssName = jsxName[0].toLowerCase() + jsxName.slice(1);
  const scssSelectorName = jsxName
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();

  fs.writeFileSync(
    `${basePath}/knowledge-web/src/app/components/${jsxName}/${jsxName}.jsx`,
    componentTemplate(jsxName, scssName, scssSelectorName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-web/src/app/components/${jsxName}/${jsxName}.spec.js`,
    componentTestTemplate(jsxName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-web/src/app/components/${jsxName}/${scssName}.scss`,
    scssTemplate(scssSelectorName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-web/src/app/components/${jsxName}/index.js`,
    indexTemplate(jsxName),
    "utf8"
  );
}

function container(jsxName) {
  exec(
    `mkdir ${basePath}/knowledge-web/src/app/containers/${jsxName}Container`,
    () => {
      makeContainerFiles(jsxName);
    }
  );
}

function makeContainerFiles(jsxName) {
  fs.writeFileSync(
    `${basePath}/knowledge-web/src/app/containers/${jsxName}Container/${jsxName}Container.jsx`,
    containerTemplate(jsxName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-web/src/app/containers/${jsxName}Container/${jsxName}Container.spec.js`,
    containerTestTemplate(jsxName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-web/src/app/containers/${jsxName}Container/index.js`,
    indexTemplate(`${jsxName}Container`),
    "utf8"
  );
}

module.exports = {
  component,
  container
};
