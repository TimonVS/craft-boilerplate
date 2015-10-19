export default function () {
  let config = {};

  let SRC = 'public/assets';
  let DIST = 'public/dist';

  config.paths = {
    src: SRC,
    dist: DIST,
    html: {
      src: 'templates/**/*.html'
    },
    js: {
      src: [
        SRC + '/js/**/*!(app)*.js',
        SRC + '/js/app.js'
      ],
      watch: SRC + '/js/**/*.js',
      dest: DIST + '/js'
    },
    css: {
      src: SRC + '/styles/app.scss',
      watch: SRC + '/styles/**/*.scss',
      dest: DIST + '/styles'
    },
    fonts: {
      src: SRC + '/fonts/**/*',
      dest: DIST + '/fonts'
    },
    img: {
      src: SRC + '/images/**/*',
      watch: SRC + '/images/**/*',
      dest: DIST + '/images'
    }
  };

  config.autoprefixer = {
    browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
  };

  return config;
}();
