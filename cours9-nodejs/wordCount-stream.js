// Compte le nombre total de caractères dans un fichier texte donné

var fs = require('fs');
if (! fs) process.exit(1);

var length = 0;
var fileName = "sample.txt";

var readStream = fs.createReadStream(fileName);;

readStream.on("data", function(blob) {
    console.log("Lus: " + blob.length);
    length += blob.length;
} );

readStream.on("end", function() {
    console.log("Nombre total de caractères lus: " + length);
} );

readStream.on("error", function() {
    console.log("Une erreur est survenue lors de la lecture du fichier: " + fileName);
} );

console.log("Fin du programme");
