const path = require('path');

// Config
// -------------------------------------------------------------------------------

const env = require('gulp-environment');
process.env.NODE_ENV = env.current.name;

const conf = (() => {
  const _conf = require('./build-config');
  return require('deepmerge').all([{}, _conf.base || {}, _conf[process.env.NODE_ENV] || {}]);
})();

conf.distPath = path.resolve(__dirname, conf.distPath).replace(/\\/g, '/');

// Modules
// -------------------------------------------------------------------------------

const { src, dest, parallel, series, watch } = require('gulp');
const webpack = require('webpack');
const sass = require('gulp-dart-sass');
const localSass = require('sass');
const autoprefixer = require('gulp-autoprefixer');
const exec = require('gulp-exec');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const colors = require('ansi-colors');
const log = require('fancy-log');
const browserSync = require('browser-sync').create();
colors.enabled = require('color-support').hasBasic;

// Utilities
// -------------------------------------------------------------------------------

function normalize(p) {
  return p.replace(/\\/g, '/');
}

function root(p) {
  return p.startsWith('!')
    ? normalize(`!${path.join(__dirname, 'wwwroot', p.slice(1))}`)
    : normalize(path.join(__dirname, 'wwwroot', p));
}

function srcGlob(...src) {
  return src.map(p => root(p)).concat(conf.exclude.map(d => `!${root(d)}/**/*`));
}

// Tasks
// -------------------------------------------------------------------------------
// Build CSS
// -------------------------------------------------------------------------------
const buildCssTask = function (cb) {
  return src(srcGlob('**/*.scss', '!**/_*.scss'), { base: root('.') })
    .pipe(gulpIf(conf.sourcemaps, sourcemaps.init()))
    .pipe(sass({ outputStyle: conf.minify ? 'compressed' : 'expanded' }))
    .pipe(gulpIf(conf.sourcemaps, sourcemaps.write()))
    .pipe(autoprefixer())
    .pipe(rename({ extname: '.dist.css' }))
    .pipe(
      rename(function (path) {
        path.dirname = path.dirname.replace('scss', 'css');
      })
    )
    .pipe(dest(conf.distPath));
};
const renameTask = function () {
  return src(conf.distPath + `/vendor/css/**/*.css`)
    .pipe(rename({ suffix: '.dist' }))
    .pipe(dest(conf.distPath + `/vendor/css`));
};

// Build JS
// -------------------------------------------------------------------------------
const webpackJsTask = function (cb) {
  setTimeout(function () {
    webpack(require('./webpack.config'), (err, stats) => {
      if (err) {
        log(colors.gray('Webpack error:'), colors.red(err.stack || err));
        if (err.details) log(colors.gray('Webpack error details:'), err.details);
        return cb();
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        info.errors.forEach(e => log(colors.gray('Webpack compilation error:'), colors.red(e)));
      }

      if (stats.hasWarnings()) {
        info.warnings.forEach(w => log(colors.gray('Webpack compilation warning:'), colors.yellow(w)));
      }

      // Print log
      log(
        stats.toString({
          colors: colors.enabled,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false,
          modules: false,
          children: true,
          version: true,
          cached: false,
          cachedAssets: false,
          reasons: false,
          source: false,
          errorDetails: false
        })
      );

      cb();
      browserSync.reload();
    });
  }, 1);
};
const pageJsTask = function () {
  return src(conf.distPath + `/js/**/!(*.dist).js`)
    .pipe(gulpIf(conf.minify, uglify()))
    .pipe(rename({ suffix: '.dist' }))
    .pipe(dest(conf.distPath + `/js`));
};

// Build fonts
// -------------------------------------------------------------------------------

const FONT_TASKS = [
  {
    name: 'boxicons',
    path: 'node_modules/boxicons/fonts/*'
  },
  {
    name: 'fontawesome',
    path: 'node_modules/@fortawesome/fontawesome-free/webfonts/*'
  },
  {
    name: 'flags',
    path: 'node_modules/flag-icons/flags/**/*'
  }
].reduce(function (tasks, font) {
  const functionName = `buildFonts${font.name.replace(/^./, m => m.toUpperCase())}Task`;
  const taskFunction = function () {
    // return src(root(font.path))
    return (
      src(font.path)
        // .pipe(dest(normalize(path.join(conf.distPath, 'fonts', font.name))))
        .pipe(dest(path.join(conf.distPath + `/vendor/`, 'fonts', font.name)))
    );
  };

  Object.defineProperty(taskFunction, 'name', {
    value: functionName
  });

  return tasks.concat([taskFunction]);
}, []);

// Formula module requires KaTeX - Quill Editor
const KATEX_FONT_TASK = [
  {
    name: 'katex',
    path: 'node_modules/katex/dist/fonts/*'
  }
].reduce(function (tasks, font) {
  const functionName = `buildFonts${font.name.replace(/^./, m => m.toUpperCase())}Task`;
  const taskFunction = function () {
    return src(font.path).pipe(dest(path.join(conf.distPath, 'vendor/libs/quill/fonts')));
  };

  Object.defineProperty(taskFunction, 'name', {
    value: functionName
  });

  return tasks.concat([taskFunction]);
}, []);

const buildFontsTask = parallel(FONT_TASKS, KATEX_FONT_TASK);

// Clean build directory
// -------------------------------------------------------------------------------

const cleanTask = function () {
  return del(
    [`${conf.distPath}/**/*.dist.js`, `${conf.distPath}/**/*.dist.css`, `!${conf.distPath}/vendor/fonts/*.dist.css`],
    {
      force: true
    }
  );
};

const cleanSourcemapsTask = function () {
  return del([`${conf.distPath}/**/*.map`], {
    force: true
  });
};

const cleanAllTask = parallel(cleanTask, cleanSourcemapsTask);

// Watch
// -------------------------------------------------------------------------------
const watchTask = function () {
  watch(srcGlob('**/*.scss'), buildCssTask);
  watch(srcGlob('**/*.js', '!**/*.dist.js', '!js/**/*.js'), webpackJsTask);
  watch(srcGlob('/js/**/!(*.dist).js'), pageJsTask);
};

// Build (Dev & Prod)
// -------------------------------------------------------------------------------
const buildJsTask = series(webpackJsTask, pageJsTask);

const buildTasks = [buildCssTask, buildJsTask, buildFontsTask];
const buildTask = conf.cleanDist
  ? series(cleanAllTask, parallel(buildTasks))
  : series(cleanAllTask, cleanSourcemapsTask, parallel(buildTasks));

// Exports
// -------------------------------------------------------------------------------
module.exports = {
  default: buildTask,
  clean: cleanAllTask,
  'build:js': buildJsTask,
  'build:css': buildCssTask,
  'build:fonts': buildFontsTask,
  'build:ren': renameTask,
  build: buildTask,
  watch: watchTask
};
