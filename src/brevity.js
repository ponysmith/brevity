/**
* brevity.js
* JS plugin for automatically wrapping abbreviations in <abbr> tags
* @author Pony Smith - pony@ponysmith.com
*
* brevity function
* @param (array) abbrs: array of abbreviation definition objects
* @param (object) options: options for the plugin
*/
var brevity = function(abbrs, options) {

  var _options = {
    root: document.getElementsByTagName('body')[0]
  }

  var _abbrs = abbrs;

  var _private = {
    init: function() {
      _private.abbreviate(_options.root);
    },

    abbreviate: function(node) {
      // Check node type
      switch(node.nodeType) {
        // Element node
        case 1:
        // Only continue for elements that have child nodes and are not a script, style, or abbr element
        if(node.childNodes && !/script|style|abbr/i.test(node.tagName)) {
          for(var i=0; i<node.childNodes.length; i++) {
            // Recall the plugin function, using the child node
            _private.abbreviate(node.childNodes[i]);
          }
        }
        break;

        // Text node
        case 3:
          // Loop through all registered abbreviations
          _abbrs.forEach(function(a) {
            // See if there is a match for the current abbr
            var match = node.data.match("\\b" + a.abbr + "\\b");
            if(match) {
              // Create the abbr element for inserting into the DOM
              elem = document.createElement('abbr');
              elem.setAttribute('title', a.title);
              // Set the abbr text after removing any namespacing
              elem.innerHTML = a.abbr.substr(a.abbr.lastIndexOf(':')+1);
              // Split the text on each side of the matched abbr to isolate it into its own node
              var n = node.splitText(match.index);
              n.splitText(match[0].length);
              // Replace the isolated node with the generated DOM element
              n.parentNode.replaceChild(elem, n);
            }
          });
          break;
      }
    }
  }

  // Overwrite default options with user options
  for(o in options) {
    if(_options[o] != null) _options[o] = options[o];
  }

  return _private.init();

}
