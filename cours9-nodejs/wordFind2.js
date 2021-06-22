// Recherche une chaîne donnée dans un fichier.
// Paramètres:
// 1) Nom du fichier
// 2) Chaîne la rechercher
// N'assume pas que la longueur de la chaîne recherchée < la longueur du tampon de lecture

var fs = require('fs');
if (! fs) process.exit(1);

if (process.argv.length < 4) {
    console.log("Syntax: fileName string");
    process.exit(2);
}

var fileName = process.argv[2];
var textToFind = process.argv[3];
var readStream = fs.createReadStream(fileName);;
var index = -1;
var matchIndex = 0;

readStream.on("data", function(blob) {
    var str = blob.toString();
    console.log("Read " + blob.length + " bytes");
    for (var i=0; i<str.length; ++i) {
    	// Incrémente matchIndex pour chaque caractère contigu qui correspond
    	if (str[i]== textToFind[matchIndex]) {
    	    matchIndex++;
    	    if (matchIndex==textToFind.length) {
            // Si tous les caractères correspondent, nous avons trouvé la chaîne
        		index = i;
        		readStream.emit("end");
        		break;
    	    }
    	} else if (matchIndex > 0){
        // Réinitialise matchIndex même si un seul caractère ne correspond pas
  	    matchIndex = 0;
    	}
    }
} );

readStream.on("end", function() {
    if (index>=0)
	console.log("Chaîne trouvée: " + textToFind);
    else
	console.log("Chaîne introuvable: " + textToFind);
} );

readStream.on("error", function() {
    console.log("Erreur lors de la lecture du fichier: " + fileName);
} );

console.log("Fin du programme");
