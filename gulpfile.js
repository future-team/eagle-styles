var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean'),
    base64 = require('gulp-base64');


var cssName = require('./package.json').name,
    dest = "./dist/css";

var error = function(e){
  console.error(e);
  if(e.stack){
    console.error(e.stack);
  }
};

var copy = function(source, destination){
  return gulp.src(source)
        .pipe(gulp.dest(destination));
}

var lessFunc = function(){
  return gulp.src(['./less/'+cssName+'.less'])
      .pipe(less({ compress: false }))
      .pipe(plumber())
      //.on('error', error )
      .pipe(gulp.dest(dest));
}

gulp.task('clean', function () {
    return gulp.src(['./dist/img/*','./dist/css/*'], {read: false})
        .pipe(clean()).on('error', error );
});

gulp.task('copy-image', ['clean'],function(){ // 将字体文件拷贝到dist文件夹下
    copy('./less/img/*', './dist/img');
});

gulp.task('less',['copy-image'], lessFunc);

gulp.task('min-styles', ['base64'], function() {
  gulp.src([dest+'/*.css'])
      // .pipe(concat(cssName+'.css') // 合并文件为all.css
      .pipe(gulp.dest(dest)) // 输出all.css文件
      .pipe(rename({ suffix: '.min' })) // 重命名all.css为 all.min.css
      .pipe(minifycss()) // 压缩css文件
      .pipe(gulp.dest(dest)); // 输出all.min.css
});
gulp.task('base64', ['less'], function() {
    return gulp.src([dest+'/*'])
        .pipe(base64())
        .pipe(gulp.dest(dest));
});
gulp.task('default', ['min-styles']);
