// Envoie des requêtes AJAX simples et gère plusieurs requêtes

// Affiche la liste des messages en transit
function displayInFlight(inflight) {
	return function() {
		if (inflight.length > 0) {
			var result = "Messages en transit : ";
			for (var i=0; i<inflight.length; i++) {
				result = result + " (" + inflight[i] + ")";
			}
			console.log(result);
		}
	};
};

// Annule le dernier message en transit
function CancelInflight(inflight) {
	return function() {
		if (inflight.length > 0) {
			inflight[inflight.length - 1].abort();
		} else {
			alert("No messages in flight");
		}
	};
}

var RequestCount = function(msg, inflight) {
	var count = 0;
	var sendRequest = function() {
		var xhr = new XMLHttpRequest();
		var name = "XHR " + count;
		var index = 0;
		xhr.open("GET", msg + '-' + count);
		count = count + 1;
		var removeFromList = function() {
			index = inflight.indexOf(xhr);
			if (index > -1) {
				inflight.splice(index, 1);
			} else {
				alert(name + " non trouvé !");
			}
		};
		xhr.onload = function() {
			if (xhr.status==200) {
				console.log(name + " : Réponse reçue : " + xhr.responseText);
			} else {
				console.log(name + " : Reçu un code d'erreur : " + xhr.status);
			}
			removeFromList();
		};
		xhr.ontimeout = function() {
			console.log(name + " : Expiré (timeout) après : " + xhr.timeout + " ms");
			removeFromList();
		}
		xhr.onerror = function() {
			console.log(name + " : A généré une erreur !");
			removeFromList();
		};
		xhr.onabort = function() {
			console.log(name + " : Annulée");
			removeFromList();
		};
		xhr.toString = function() {
			return name;
		};
		// Tous les gestionnaires ont été initialisés -- envoyer le message
		xhr.timeout = 5000;	 // Attendre max. 5000 ms pour une réponse
		console.log("Sending request " + xhr);
		inflight.push(xhr);	 // Ajouter la requête à la liste des requêtes actives (en cours)
		xhr.send();
	}
	return sendRequest;
};


window.onload = function() {
	var ok = document.getElementById("OK");
	var count = 0
	var inflight = [];
	ok.addEventListener("click", RequestCount("/hello", inflight), false);	// Envoie la requête
	var cancel = document.getElementById("Cancel");
	cancel.addEventListener("click", CancelInflight(inflight), false);	// Annule la dernière requête
	setInterval(displayInFlight(inflight), 1000);			// Affiche la liste des requêtes en cours
}
