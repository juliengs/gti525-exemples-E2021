function collect(n, f) {

    function collectFrag(n, f, frag) {

	var cn = n.childNodes;

	for (var i=0; i<cn.length; i++) {
	    // Faut-il extraire le noeud?
	    var extractNode = f(cn[i]);

	    if (extractNode) {
		// Ajouter le noeud au fragment et le retirer
		frag.appendChild(cn[i]);
		n.removeChild(cn[i]);
		i--; // Reculer le pointeur de boucle pour compenser la suppression
	    } else {
		// Itérer pour les noeuds enfants
		collectFrag(cn[i], f, frag);
	    }
	}
	
    }
    
    var frag = document.createDocumentFragment();

    collectFrag(n, f, frag);

    return frag;
}

function moveAsChildren(n, f, newNode) {
    var frag = collect(n, f);

    newNode.appendChild(frag);
}

function compareType(type) {
    return function(node) {
	return node.nodeName == type;
    }
}

window.onload = function() {
    setTimeout(function() {
	var rootNode = document.getElementById("bad");
	var newNode = document.getElementById("newpos");
	moveAsChildren(rootNode, compareType("IMG"), newNode);
    }, 5000);
}
