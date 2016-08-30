module.exports = function(config) {
  config.set({
    frameworks: ['jasmine-jquery','jasmine'],
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'src/brevity.js', watched: true, nocache: true },
      { pattern: 'spec/javascripts/*.js', watched: true, nocache: true },
      { pattern: 'spec/javascripts/fixtures/*.html', watched: true, nocache: true}
    ],
    reporters: ['dots']
  });
};
