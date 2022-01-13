import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parseHtml from "prettier/parser-html";

const format = (content, type = "babel") => {
  if (type === "json") {
    return JSON.stringify(JSON.parse(content, null, 2));
  } else if (type === "html") {
    return prettier.format(content, {
      parser: type,
      plugins: [parseHtml],
    });
  } else {
    return prettier.format(content, {
      parser: type,
      plugins: [parserBabel],
    });
  }
};

export { format };
