const { src, dest, watch, series } = require('gulp');
const rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const zip = require('gulp-zip');
const autoprefixer = require('gulp-autoprefixer');

// Will compile es6 using babel and minify using terser.

// Will compile sass to css and minify.
function css() {
    return src("./assets/sass/*.scss", {sourcemaps: true})
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest("./assets/css", {sourcemaps: true}))
        .pipe(browserSync.stream());
}

// Will create a  zip file for plugin which will not contain unnecessary files.
function compress() {
    return src([ '**/*', '!node_modules/**', '!./*.json', '!*.gitignore', '!gulpfile.js', '!.git/**' ]) 
    .pipe(zip('plugin-name.zip'))
    .pipe(dest('./'));
}

// Watches for changes
function watchTask() {
    watch('./assets/src/sass/**/*.scss', css);
    watch('./assets/src/js/**/*.js', js)
        .on('change', () => {
            console.log('Javascript changed');
            browserSync.reload();
        });
    watch(['./**/*.php', '!./**/index.asset.php'])
    .on('change', () => {
        console.log('PHP changed');
        browserSync.reload();
    });
};

// Opens up the browser
function browser(cb) {
    browserSync.init({
        proxy: "http://localhost/lexxstar"
    });
    cb();
}

exports.css = css;
exports.watch = watchTask;
exports.compress = compress;
exports.browser = browser;
exports.default = series(css, browser, watchTask);

// Will create a production build of the plugin.
exports.prod = series(css, compress);
