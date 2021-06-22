function AJAXRequest() {

    // Assumes jsonserver.py (python3 jsonserver3.py) is running
    var url = "http://localhost:8090/ajax";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/ajax");
    xhr.onload = function() {
	if (xhr.status==200) {
	    if ( xhr.getResponseHeader("Content-Type").startsWith("application/json")) {  
		var result = JSON.parse(xhr.responseText);
		console.log("Remplacement des images : " + xhr.responseText);
		swapImages(result);
	    }
	    else {
		console.log("Invalid content type");
	    }
	} else {
	    console.log("Invalid response code");
	}
    }
    xhr.ontimeout = function() {
	console.log("Timed out");
    }
    xhr.onerror = function() {
	console.log("Resulted in an error !");
    };  
    xhr.onabort = function() {
	console.log("Aborted");
    };

    xhr.send();

    function swapImages(images) {

	var imgs = document.getElementsByTagName("IMG");
	
	// Traiter l'objet JS result ici
	for (var key in images) {
	    
	    imgs[parseInt(key)].src = images[key]; 
	    
	}
		
    }
    
}

window.onload = function() {

    setInterval(function() { AJAXRequest(); }, 1000);
    
}
