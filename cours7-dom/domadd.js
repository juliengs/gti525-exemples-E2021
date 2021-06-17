var newDiv = function(node, id) {
	// Votre code ici
};

window.onload = function() {
	var div4 = document.getElementById("four");
	if (div4 && div4.childNodes.length >= 1) {
		var textNode = div4.getElementsByTagName("p")[0];
		newDiv( textNode, "five" );
	}
	console.log(div4);
};
