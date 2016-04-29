'use strict';
const path = require("path");
const fs = require("fs");
const gulp = require('gulp');
//var rename = require('gulp-rename');
const uglify = require('gulp-uglify');
//var watch = require('gulp-watch');
const concat = require('gulp-concat');

const scriptsPath = "E:\\source\\Scripts\\";
const scriptsDest = "E:\\source\\Scripts\\min\\";

const argv = process.argv.slice(2);

/// 配置文件的压缩 使用方法：gulp data.cqssc
if (/^data\..+/i.test(argv[0])) {
    let dataFilename = argv[0].match(/\.(.+)$/)[1];
    try {
        var dataFilePath = path.join(scriptsPath, "official/data");
        var files = fs.readdirSync(dataFilePath);
        files.forEach(item => {
            gulp.task('data.' + item.replace(/\..+$/, ''), () => {
                return gulp.src(path.join(dataFilePath, item))
                    .pipe(uglify())
                    .pipe(gulp.dest(path.join(scriptsDest, "data")));
            });
        });
    } catch (err) {
        console.log("读取data文件列表失败");
    }
}

gulp.task("core", () => {
    let arr = ["official/play.rule.js", "official/play.scene.js", "official/play.core.js"].map(item => {
        return path.join(scriptsPath, item);
    });
    return gulp.src(arr)
        .pipe(concat("core.js"))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsDest));
});

gulp.task("help", () => {
    console.log("使用方法介绍：");
    console.log("----------------------------------------");
    console.log("配置文件的压缩方法：");
    console.log("如压缩cqssc.js文件：gulp data.cqssc");
    console.log("----------------------------------------");
    console.log("play.rule.js , play.scene.js , play.core.js 三个文件合并压缩： gulp core")
    return false;
});

gulp.task('watch', function(event) {
    gulp.watch(['C:/Users/satrong/Desktop/c/a/*.js', 'C:/Users/satrong/Desktop/c/b/*.js'], ['scripts'], function(event) {});
});

//gulp.task('default', ["watch"]);
