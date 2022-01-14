import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parseHtml from "prettier/parser-html";
import beautify from "js-beautify";

const format = (content, type = "babel") => {
  if (type === "json") {
    return JSON.stringify(JSON.parse(content, null, 2));
  } else if (type === "html") {
    return prettier.format(content, {
      parser: type,
      plugins: [parseHtml],
      vueIndentScriptAndStyle: true,
    });
  } else {
    return prettier.format(content, {
      parser: type,
      plugins: [parseHtml, parserBabel],
    });
  }
};

const beautifyCode = (code, type = "js", options) => {
  try {
    return beautify[type](code, options);
  } catch (error) {
    console.log(error);
  }
};

export { format, beautifyCode };
