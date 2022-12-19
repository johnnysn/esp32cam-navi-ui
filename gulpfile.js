const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const fs = require('fs');

function buildSass() {
    return src('./src/styles/style.scss')
        .pipe(sass({outputStyle: 'compressed', sourceMap: false}).on('error', sass.logError))
        .pipe(dest('./public/assets/css'));
}

function uglifyJs() {
    return src('./public/assets/js/index.js')
        .pipe(uglify())
        .pipe(dest('./public/assets/js'));
}

function distHtml() {
    return src('./public/index.html')
        .pipe(replace(/<link href="assets\/css\/style.css"[^>]*>/, function(s) {
            const style = fs.readFileSync('./public/assets/css/style.css', 'utf8');
            return '<style>\n' + style + '\n</style>';
        }))
        .pipe(replace(/<script src="assets\/js\/([^.]*\.js)"><\/script>/g, function(s, filename) {
            const script = fs.readFileSync('./public/assets/js/' + filename, 'utf8');
            return '<script>\n' + script + '\n</script>';
        }))
        .pipe(dest('./dist'));
}

exports.default = series(buildSass, uglifyJs, distHtml);