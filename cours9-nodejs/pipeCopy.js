// Copie un fichier en utilisant les tuyaux (pipes)
var fs = require("fs");
if (! fs) process.exit(1);

// Ouvre les flux de lecture et d'écriture
var readStream = fs.createReadStream("sample.txt");
var writeStream = fs.createWriteStream("sample-copy.txt");

// Copie le contenu du flux de lecture vers le flux d'écriture
readStream.pipe( writeStream );
