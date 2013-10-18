var brevity = function(abbrs) {

	function abbreviate(node) {
		// Check node type
        switch(node.nodeType) {
            // Element node
            case 1:
                // Only continue for elements that have child nodes and are not a script, style, or abbr element
                if(node.childNodes && !/script|style|abbr/i.test(node.tagName)) {
                    for(var i=0; i<node.childNodes.length; i++) {
                        // Recall the plugin function, using the child node
                        abbreviate(node.childNodes[i]);
                    }
                }
                break;
            
            // Text node
            case 3:
                // Loop through all registered abbreviations
                for(var i=0, l=abbrs.length; i<l; i++) {
                    a = abbrs[i];
                    // See if there is a match for the current abbr
                    var match = node.data.match("\\b" + a.abbr + "\\b");
                    if(match) {
                        // Create the abbr element for inserting into the DOM
                        elem = document.createElement('abbr');
                        elem.setAttribute('title', a.title);
                        elem.innerHTML = a.abbr;
                        // Split the text on each side of the matched abbr to isolate it into its own node
                        var n = node.splitText(match.index);
                        n.splitText(match[0].length);
                        // Replace the isolated node with the generated DOM element
                        n.parentNode.replaceChild(elem, n);
                    }
                }
                break;
        }
    }

    // Set the root node and call the abbreviate function
	root = document.getElementsByTagName('body')[0];
	abbreviate(root);

}