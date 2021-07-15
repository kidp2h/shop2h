import * as shell from "shelljs";

shell.cp("-R",["src/views","src/public"],"dist");

shell.rm("dist/public/js/*.ts");
shell.rm("dist/public/js/webpack.config.js");