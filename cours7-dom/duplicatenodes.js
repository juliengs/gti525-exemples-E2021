// Duplicate nodes

function duplicateNodes(n, f) {

    var cn = n.childNodes;

    for (var i=0; i<cn.length; i++) {

	// Faut-il clôner ce noeud?
	var mustClone = f(cn[i]);

	if (mustClone) { // Clôner avec copie récursive
	    var clonedNode = cn[i].cloneNode(true);
	    // Insérer le noeud après le noeud actuel
	    if (i == cn.length-1) {
		// Dernier noeud, insérer à la fin
		n.appendChild(clonedNode);
	    } else {
		// Insérer avant le prochain noeud
		n.insertBefore(clonedNode, cn[i+1]);
	    }
	    // Incrémenter i de 1 pour compenser l'insertion du nouveau noeud!
	    i+=1;
	} else { // Pas de clonage, parcourir récursivement
	    duplicateNodes(cn[i], f);
	}
	
    }
    
}

function isDivNode(node) {
    return (node.nodeName == "DIV");
}

function isImgNode(node) {
    return (node.nodeName == "IMG");
}

function compareType(type) {
    return function(node) {
	return node.nodeName == type;
    }
}

window.onload = function() {
    //var rootNode = document.getElementById("two");
    //var rootNode = document.getElementById("two");
    //duplicateNodes(rootNode, isDivNode);
    var rootNode = document;
    //duplicateNodes(rootNode, isImgNode);
    duplicateNodes(rootNode, compareType("IMG"));
}


function reverse(n) {
	var f = document.createDocumentFragment();
	for (let i=n.childNodes.length-1; i>=0; i--) {
		f.appendChild(n.childNodes[i]);
	}
	n.parentNode.replaceChild(f, n);
}