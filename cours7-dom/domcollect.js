
// Obtient les éléments d'un certain type (balise/"tag") du sous-arbre dont la racine est le noeud id=id
var getElementsRootedAt = function(tagName, id) {
    var el = document.getElementById(id);
    if (el==null) return null;
    var t = el.getElementsByTagName(tagName);
    return t;
};

// Recherche une chaîne dans le sous-arbre DOM dont la racine est node
// Seulement les noeuds de type "texte" seront recherché ici
// Retourne true si la chaîne est trouvée
var search = function(node, text) {
    var found = false;
    if (node.nodeType == 3) {
		if (node.nodeValue.includes(text) found = true;
		} else { // les noeuds texte n'ont pas enfants
		var cn = node.childNodes;
		if (cn) {
			for (var i=0; i<cn.length; i++) {
			found = found || search(cn[i], text);
			}
		}	
    };
    return found;	
};












// Concatenate all the text in the subtree of a node
var concatenateSubtree = function(node) {
	var result = "";
	if (! node) return result;
	if (node.nodeType == 3) {
		result = result + node.nodeValue;
	} else {
		var cn = node.childNodes;
		if (cn) {
			for (var i=0; i<cn.length; i++) {
				result = result + concatenateSubtree(cn[i]);
			}
		}
	};
	return result;
};

// Concaténer tous les noeuds "texte" des enfants du noeud dont l'id=id
var concatenateChildren = function(id) {
    var node = document.getElementById(id);
    var result = "";
    if (node && node.childNodes) {
	var childNodes = node.childNodes;
	for (var i=0; i< childNodes.length; i++) {
	    var cn = childNodes[i];
	    if (cn && cn.nodeType == 3) {
		result += cn.nodeValue;
	    }
	}
    }
    return result;
};

// Concaténer tous les noeuds "texte" des descendants du noeud dont l'id=id
var concatenateDescendants = function(id) {

    function concatenateDescendantsNode(node) {
	var result = "";
	if (node && node.childNodes) {
	    var childNodes = node.childNodes;
	    for (var i=0; i< childNodes.length; i++) {
		var cn = childNodes[i];
		if (cn && cn.nodeType == 3) {
		    result += cn.nodeValue;
		} else { // Traiter le sous-arbre si il y a des descendants
		    //console.log("traitement pour:" + cn.nodeName);
		    result += concatenateDescendantsNode(cn);
		}
	    }
	}
	return result;
    }
    
    
    var node = document.getElementById(id);
    console.log(node.nodeName);
    if (node)
	return concatenateDescendantsNode(node);
    else
	return "";
    
}


window.onload = function() {
    // Trouve tous les éléments div sous le noeud id=node
    var s = getElementsRootedAt("div", "one");
    console.log(s);

    // Trouve le texte "is" en commençant la recherche au noeud id=one
    var found = search(document.getElementById("one"), " est "); 	
    console.log(found);	

    // Concatène les enfants des noeuds "textes" dont la racine est le noeud "id=one"
    var str = concatenateChildren("one");
    console.log(str);
    
    // Concatène les descendants des noeuds "textes" dont la racine est le noeud "id=one"
    var str = concatenateDescendants("one");
    console.log(str);
};
