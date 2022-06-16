/**
* brevity.js
* JS plugin for automatically wrapping abbreviations in <abbr> tags
* @author Pony Smith - pony@ponysmith.com
*
* brevity function
* @param (array) abbrs: array of abbreviation definition objects
* @param (object) options: options for the plugin
*/
const brevity = function(abbrs, options) {

  options = {
    root: document.querySelector('body'),
    ...options
  }

  const abbreviate = (node) => {
    switch(node.nodeType) {
      
      // Element node
      case 1:
        if(node.childNodes && !/script|style|abbr/i.test(node.tagName)) {
          for(var i=0; i<node.childNodes.length; i++) {
            abbreviate(node.childNodes[i]);
          }
        }
        break;

      // Text node
      case 3:
        abbrs.forEach(function(a) {
          let regex = new RegExp("(^|(?<!=\\W))" + a.abbr + "($|(?!=\\W))")
          let match = node.data.match(regex);
          if(match) {
            let elem = document.createElement('abbr');
            elem.setAttribute('title', a.title);
            elem.innerHTML = a.abbr.substr(a.abbr.lastIndexOf(':')+1);
            let n = node.splitText(match.index);
            n.splitText(match[0].length);
            n.parentNode.replaceChild(elem, n);
          }
        });
        break;

    }
  }

  abbreviate(options.root);
}

export default brevity;