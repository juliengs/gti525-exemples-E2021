/*
Permet de modifier la couleur du texte (via la propriété style (CSS)) en la remplaçant/définissant à color, pour tous les noeuds de type tag, qui sont des descendants du noeud dont l'id est contents.
• Exemple: invoquer colorElements(“a”, “red”) remplacerait la couleur du texte en rouge pour tous les liens hypertextes (a) situés à l'intérieur du noeud (div) id=contents.
*/
function colorElements(tag, color) {
    const elements = document.getElementById("contents").getElementsByTagName(tag);
    for (let i=0; i<elements.length; i++) {
	const elt = elements[i];
	elt.style.color = color;
    }
}

/*
Permet d'observer les noeuds pour lesquels la couleur est modifiée pour prendre la valeur oldColor (mutations à la propriété style), qui sont descendants du noeud dont l'id=contents. Vous devez remplacer la couleur par newColor. Cette fonction doit être implémentée au moyen d'un observateur de mutations.
*/
function trapColorChanges(oldColor, newColor) {
    const callback = function(mutationsList, observer) {
	for(const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
		console.log('Un attribut a été modifié: ' + mutation.attributeName);
		console.log(mutation);

		// Vérifier que c'est l'attribut style, et que la couleur est oldColor
		if (mutation.attributeName == "style" && mutation.target.style.color == oldColor) {
		    mutation.target.style.color = newColor;
		}
            }
	}
    };
    
    // Création d'un observateur de mutations
    const observer = new MutationObserver(callback);

    // Noeud sur lequel enregistrer l'observateur
    const targetNode = document.getElementById("contents");
    // Configuration de l'observateur:
    // Inclure les changements aux attributs, la surveillance des noeuds ajoutés/retirés, et étendre la recherche aux noeuds descendants
    const config = { attributes: true, childList: true, subtree: true };

    // Enregistrement d'un observateur sur un noeud donné
    observer.observe(targetNode, config);
}

window.onload = function() {

     /* 1. Définir un timer qui va invoquer colorElements afin de remplacer, après 5 secondes, la couleur de tous les noeuds (à l'intérieur de contents):
       • span en rouge (red)
       • p en bleu (blue)
     */
    setTimeout( function() {
	colorElements("span", "red");
	colorElements("p", "blue");
    }, 5000);
    
    // 2. Invoquer trapColorChanges afin d'intercepter les noeuds dont la couleur change en rouge (red), afin de plutôt remplacer la couleur par vert (green)
    trapColorChanges("red", "green");
}
