import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otFToTtf = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}/fonts/`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const fontsStyle = () => {
  let fontsFile = `${app.path.scrFolder}/scss/fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFiles)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
            let fontWeight = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeiht = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeiht = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeiht = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeiht = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeiht = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeiht = 700;
            } else if (fontWeight.toLowerCase() === "extrabold" || fontWeight.toLowerCase() === "heavy") {
              fontWeiht = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeiht = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFiles, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName},woff2") format("woff2), url("../fonts/${fontFileName},woff") format("woff2);\n\tfont-weight:${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить");
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cd() {}
};
