// Solution à l'activité en classe

var changeImages = function(id,  interval) {
    
    // Obtient toutes les images dont la racine est div id=id
    var div = document.getElementById(id);
    var imgtags = div.getElementsByTagName("img");
    console.log(imgtags);
    
    // Fonction imbriquée pour rotationner toutes les images
    function changeImage() {
	if (imgtags.length==0) return;
	var first = imgtags[0].src;
	for (var i=0; i<imgtags.length; i++) {
	    var img = imgtags[i];
	    var nextIndex = (i + 1);
	    console.log("Remplacement de " + i + " par " + nextIndex); 
	    if (nextIndex==imgtags.length) 
		img.src = first;
	    else
				img.src = imgtags[nextIndex].src;
	}
    }
    
    setInterval(function() {
	// Effectue la rotation après l'intervalle donné
	changeImage();
    }, interval);
}

window.onload = function() {
    changeImages("parent", 1000);
    console.log("123");
};
