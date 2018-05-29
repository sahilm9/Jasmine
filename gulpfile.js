let gulp = require('gulp'),
watch = require('gulp-watch'),
browserSyncHtml = require('browser-sync').create('index.html');
browserSyncSpec = require('browser-sync').create('SpecRunner.html');


gulp.task('watch', function(){

  browserSyncHtml.init({
    port:3000,
    server: {
      baseDir: "app",
      index:"index.html"
    }
  });
  browserSyncSpec.init({
    port: 3003,
    ui: {
      port: 3004
    },
    server: {
      baseDir: "app",
      index: "SpecRunner.html",
    },
    // open: false,
    ghostMode: false
  });

  watch('./app/assets/testing/spec/spec.js', function(){
    browserSyncSpec.reload();
  });
  watch('./app/index.html', function(){
    browserSyncHtml.reload();
  });
});
