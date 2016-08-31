'use strict';

jasmine.getFixtures().fixturesPath = 'base/spec/javascripts/fixtures';

describe("Brevity", function() {

  /**
   * Setup
   */
  beforeEach(function() {
    loadFixtures('test.html');
    var abbrs = [
      { abbr: 'HTML', title: 'Hypertext Markup Language' },
      { abbr: 'CSS', title: 'Cascading Style Sheets' },
      { abbr: 'xml', title: 'Extensible Markup Language' },
      { abbr: 'YAML:CONVERT', title: 'Yet Another Markup Language' }
    ];
    brevity(abbrs, { root: document.getElementById('brevity-root') });
  });

  /**
   * Test that abbr tags are added for registered abbreviations
   */
  it('should add abbr tags for registered abbreviations', function() {
    expect($j('#brevity-html-1')).toContainElement('abbr');
    expect($j('#brevity-html-2')).toContainElement('abbr');
    expect($j('#brevity-css')).toContainElement('abbr');
  });

  /**
   * Test that the correct titles are used
   */
  it('should use the correct title attributes', function() {
    expect($j('#brevity-html-1 abbr')).toHaveAttr('title', 'Hypertext Markup Language');
    expect($j('#brevity-html-2 abbr')).toHaveAttr('title', 'Hypertext Markup Language');
    expect($j('#brevity-css abbr')).toHaveAttr('title', 'Cascading Style Sheets');
  });

  /**
   * Test that only exact matches are affected
   */
  it('should only create abbr tags for exact matches', function() {
    expect($j('#brevity-xhtml')).not.toContainElement('abbr');
    expect($j('#brevity-htm')).not.toContainElement('abbr');
  });

  /**
   * Test case sensitivity
   */
  it('should be case sensitive', function() {
    expect($j('#brevity-html-wrongcase')).not.toContainElement('abbr');
    expect($j('#brevity-xml-rightcase')).toContainElement('abbr');
    expect($j('#brevity-xml-wrongcase')).not.toContainElement('abbr');
  });

  /**
   * Test multiple occasions of same abbreviation
   */
  it('should handle multiple instances of the same abbreviation', function() {
    expect($j('#brevity-html-1')).toContainElement('abbr');
    expect($j('#brevity-html-2')).toContainElement('abbr');
  });

  /**
   * Test root node option
   */
  it('should not create abbreviations outside the root node', function() {
    expect($j('#brevity-html-nonroot')).not.toContainElement('abbr');
  });

  /**
   * Test namespacing
   */
  it('should honor namespacing', function() {
    expect($j('#brevity-yaml-namespace')).toContainElement('abbr');
    expect($j('#brevity-yaml-nonamespace')).not.toContainElement('abbr');
  });

});
