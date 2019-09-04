var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("watch", function(cb) {
  gulp.watch("docs/scss/**/*.scss", gulp.series("sass"));
  cb();
});

gulp.task("serve", function(cb) {
  browserSync.init({
    server: "./docs"
  });
  gulp.watch("docs/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("docs/*.html").on("change", browserSync.reload);
  gulp.watch("docs/js/*.js").on("change", browserSync.reload);
  cb();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src("docs/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("docs/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", gulp.series("serve"));
