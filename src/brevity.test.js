import brevity from './brevity';

let abbrs = [
  { abbr: 'HTML', title: 'Hypertext Markup Language' },
  { abbr: 'CSS', title: 'Cascading Style Sheets' },
  { abbr: 'xml', title: 'Extensible Markup Language' },
  { abbr: 'YAML:CONVERT', title: 'Yet Another Markup Language' },
  { abbr: 'АББР', title: 'Текст текст текст' }
];

const node1 = document.createElement('div');
node1.id = 'node-1';
const node2 = document.createElement('div');
node2.id = 'node-2';
document.body.appendChild(node1);
document.body.appendChild(node2);

afterEach(() => {
  document.querySelector('#node-1').replaceChildren();
  document.querySelector('#node-2').replaceChildren();
})


const inject = function(terms) {
  terms.forEach(function(term) {
    let child = document.createElement('p');
    child.id = term.id;
    child.innerHTML = term.text;
    let parent = document.querySelector(term.node);
    parent.appendChild(child);
  });
}


test("abbr tags injected for all registered terms", function() {
  inject([
    { id: 'css', node: '#node-1', text: 'Lorem ipsum dolor CSS sit amet.' },
    { id: 'html', node: '#node-2', text: 'Lorem ipsum dolor HTML sit amet.' },
  ]);
  brevity(abbrs);
  expect(document.querySelector('#node-1 abbr')).not.toBeNull();
  expect(document.querySelector('#node-2 abbr')).not.toBeNull();
});


test("abbr tags should have the correct title attribute", function() {
  inject([
    { id: 'css', node: '#node-1', text: 'Lorem ipsum dolor CSS sit amet.' },
    { id: 'html', node: '#node-2', text: 'Lorem ipsum dolor HTML sit amet.' },
  ]);
  brevity(abbrs);
  expect(document.querySelector('#node-1 p#css abbr').title).toEqual('Cascading Style Sheets');
  expect(document.querySelector('#node-2 p#html abbr').title).toEqual('Hypertext Markup Language');
});


test("abbr tags should have the correct content", function() {
  inject([
    { id: 'css', node: '#node-1', text: 'Lorem ipsum dolor CSS sit amet.' },
    { id: 'html', node: '#node-2', text: 'Lorem ipsum dolor HTML sit amet.' },
  ]);
  brevity(abbrs);
  expect(document.querySelector('#node-1 p#css abbr').innerHTML).toEqual('CSS');
  expect(document.querySelector('#node-2 p#html abbr').innerHTML).toEqual('HTML');
});


test("abbr tags are only created for exact matches", function() {
  inject([
    { id: 'xhtml', node: '#node-2', text: 'Lorem ipsum dolor XHTML sit amet.' },
    { id: 'htm', node: '#node-2', text: 'Lorem ipsum dolor HTM sit amet.' },
  ]);
  brevity(abbrs);
  expect(document.querySelector('#node-1 p#xhtml abbr')).toBeNull();
  expect(document.querySelector('#node-2 p#htm abbr')).toBeNull();
});


test("honors case sensitivity", function() {
  inject([
    { id: 'css', node: '#node-2', text: 'Lorem ipsum dolor css sit amet.' },
    { id: 'html', node: '#node-2', text: 'Lorem ipsum dolor Html sit amet.' },
  ]);
  brevity(abbrs);
  expect(document.querySelector('#node-1 p#css abbr')).toBeNull();
  expect(document.querySelector('#node-2 p#html abbr')).toBeNull();
});


test("can handle multiple instances of same abbreviation", function() {
  inject([
    { id: 'css-1', node: '#node-1', text: 'Lorem ipsum dolor CSS sit amet.' },
    { id: 'css-2', node: '#node-1', text: 'Lorem ipsum dolor CSS sit amet.' },
  ]);
  brevity(abbrs);
  expect(document.querySelector('#node-1 p#css-1 abbr')).not.toBeNull();
  expect(document.querySelector('#node-1 p#css-2 abbr')).not.toBeNull();
});


test("should not create abbreviations outside root node", function() {
  inject([
    { id: 'css', node: '#node-1', text: 'Lorem ipsum dolor CSS sit amet.' },
    { id: 'html', node: '#node-2', text: 'Lorem ipsum dolor HTML sit amet.' },
  ]);
  brevity(abbrs, { root: document.querySelector('#node-1') });
  expect(document.querySelector('#node-1 p#css abbr')).not.toBeNull();
  expect(document.querySelector('#node-2 p#html abbr')).toBeNull();
});


test("should honor namespacing", function() {
  inject([
    { id: 'yaml-skip', node: '#node-1', text: 'Lorem ipsum dolor YAML sit amet.' },
    { id: 'yaml-convert', node: '#node-1', text: 'Lorem ipsum dolor YAML:CONVERT sit amet.' },
  ]);
  brevity(abbrs, { root: document.querySelector('#node-1') });
  expect(document.querySelector('#node-1 p#yaml-skip abbr')).toBeNull();
  expect(document.querySelector('#node-1 p#yaml-convert abbr')).not.toBeNull();
});

test("should properly account for punctuation", function() {
  inject([
    { id: 'period', node: '#node-1', text: 'Lorem ipsum dolor sit amet CSS.' },
    { id: 'comma', node: '#node-1', text: 'Lorem ipsum dolor CSS, sit amet.' },
    { id: 'semicolon', node: '#node-1', text: 'Lorem ipsum dolor CSS; sit amet.' },
    { id: 'quotes', node: '#node-1', text: 'Lorem ipsum dolor "CSS" sit amet.' }
  ]);
  brevity(abbrs);
  expect(document.querySelector('#node-1 p#period abbr')).not.toBeNull();
  expect(document.querySelector('#node-1 p#comma abbr')).not.toBeNull();
  expect(document.querySelector('#node-1 p#semicolon abbr')).not.toBeNull();
  expect(document.querySelector('#node-1 p#quotes abbr')).not.toBeNull();
});

test("should work with unicode", function() {
  inject([
    { id: 'cyrillic', node: '#node-1', text: 'Lorem ipsum dolor АББР sit amet.' },
  ]);
  brevity(abbrs, { root: document.querySelector('#node-1') });
  expect(document.querySelector('#node-1 p#cyrillic abbr')).not.toBeNull();
});
