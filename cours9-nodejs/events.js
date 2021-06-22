// Exemple d'utilisation de EventEmitter en node.js
// Source: Node.js succinctly

var eventMod = require('events');
var EventEmitter = eventMod.EventEmitter;
if (! EventEmitter) process.exit(1);

var connection = function(id) {
	console.log("client id : " + id);
};

var message = function(msg) {
	console.log("message : " + msg);
};

var myEmitter = new EventEmitter();
myEmitter.on("connection", connection);
myEmitter.on("message", message);

// cas de test
// devrait imprimer 1, 2, hello à la console
myEmitter.emit("connection", 1);
myEmitter.emit("connection", 2);
myEmitter.emit("message", "hello");

// Si on enlève les listeners, "world" ne devrait pas être imprimé
myEmitter.removeListener("message", message);
myEmitter.emit("message", "world");

var myEmitter2 = new EventEmitter();

myEmitter2.emit("connection", 3);
