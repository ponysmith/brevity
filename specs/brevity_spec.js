jasmine.getFixtures().fixturesPath = 'specs/fixtures';

describe("Brevity", function() {

    // Set up
    beforeEach(function() {
        loadFixtures('basic.html');  
        var abbrs = [
            { abbr: 'HTML', title: 'Hypertext Markup Language' },
            { abbr: 'CSS', title: 'Cascading Style Sheets' },
            { abbr: 'pandas:WWF', title: 'World Wildlife Fund' },
            { abbr: 'wrestling:WWF', title: 'World Wrestling Federation' }
        ];
        brevity(abbrs, { root: document.getElementById('root') });
    });

    it('should handle registered abbreviations', function() {
        expect($('#html')).toContainElement('abbr');
    });

    it('should have the appropriate title and abbreviation', function() {
        expect($('#html abbr')).toHaveAttr('title', 'Hypertext Markup Language');
        expect($('#html abbr')).toContainText('HTML');
    });

    it('should be case-sensitive', function() {
        expect($('#html-case')).not.toContainElement('abbr');
    });

    it('should handle multiple abbreviations', function() {
        expect($('#css')).toContainElement('abbr');
        expect($('#css abbr')).toHaveAttr('title', 'Cascading Style Sheets');
    });

    it('should handle multiple instances of the same abbreviation', function() {
        expect($('#html2')).toContainElement('abbr');
        expect($('#html2 abbr')).toHaveAttr('title', 'Hypertext Markup Language');
    });

    it('should convert namespaced abbreviations', function() {
        expect($('#wwf-pandas')).toContainElement('abbr');
        expect($('#wwf-wrestling')).toContainElement('abbr');
    });

    it('should have the proper namespaced abbreviations', function() {
        expect($('#wwf-pandas abbr')).toHaveAttr('title', 'World Wildlife Fund');
        expect($('#wwf-wrestling abbr')).toHaveAttr('title', 'World Wrestling Federation');
    });

    it('should not convert abbreviations outside the root node', function() {
        expect($('#html-nonroot')).not.toContainElement('abbr');
    });

});
