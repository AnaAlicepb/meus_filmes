const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const fs = require('fs');

// Diretórios de origem e destino
const paths = {
    src: {
        styles: './src/styles/*.scss',
        images: './src/images/*',
        scripts: './src/scripts/*.js'
    },
    dist: {
        base: './dist',
        css: './dist/css',
        images: './dist/images',
        js: './dist/js'
    }
};

// Configurações
const sassOptions = {
    outputStyle: 'compressed'
};

// Função para criar a pasta 'dist' se ela não existir
function createDistFolder(cb) {
    if (!fs.existsSync(paths.dist.base)) {
        fs.mkdirSync(paths.dist.base);
    }
    cb();
}

// Compilação do Sass
function styles() {
    return gulp.src(paths.src.styles)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(paths.dist.css));
}

// Otimização de imagens
function images() {
    return gulp.src(paths.src.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist.images));
}

// Minificação de scripts
function scripts() {
    return gulp.src(paths.src.scripts)
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
}

// Definição da tarefa padrão
exports.default = gulp.series(createDistFolder, gulp.parallel(styles, images, scripts));

// Tarefa para observar mudanças nos arquivos
exports.watch = function() {
    gulp.watch(paths.src.styles, gulp.parallel(styles));
    gulp.watch(paths.src.scripts, gulp.parallel(scripts));
};
