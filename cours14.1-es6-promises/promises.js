function AJAX(url) {
    return new Promise( (resolve, reject) => {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onload = function() {
	    if (xhr.status==200) {
		var result = JSON.parse(xhr.responseText);
		resolve(result);
	    } else {
		reject("Invalid response code");
	    }
	}
	xhr.ontimeout = function() {
	    reject("Timed out");
	}
	xhr.onerror = function() {
	    reject("Resulted in an error !");
	};  
	xhr.onabort = function() {
	    reject("Aborted");
	};
	
	xhr.send();
    })
}

function TestSuccess() {
    AJAX("http://localhost:3000/json1").then( (response) => {
	console.log(response);
    }).catch( (error) => {
	console.log("An error occured: "+ error);
    });
}

function TestFailure() {
    AJAX("http://localhost:3000/invalid").then( (response) => {
	console.log(response);
    }).catch( (error) => {
	console.log("An error occured: " + error);
    });
}

function Test3Servers() {
    Promise.race([
	AJAX("http://localhost:3000/json1"),
	AJAX("http://localhost:3000/json2"),
	AJAX("http://localhost:3000/json3")
    ]).then( (response) => {
	console.log(response);
    }).catch( (error) => {
	console.log("An error occured: " + error);
    });
}

async function TestSuccessAsync() {
    try {
	console.log( await AJAX("http://localhost:3000/json1") );
    }
    catch (error) {
	console.log("An error occured: " + error);
    }
}

async function TestFailureAsync() {
    try {
	console.log( await AJAX("http://localhost:3000/invalid") );
    }
    catch (error) {
	console.log("An error occured: " + error);
    }
}

async function Test3ServersAsync() {
    try {
	console.log( await Promise.race([
	    AJAX("http://localhost:3000/json1"),
	    AJAX("http://localhost:3000/json2"),
	    AJAX("http://localhost:3000/json3")
	]))
    }
    catch (error) {
	console.log("An error occured: " + error);
    }	   
}

TestSuccess();

TestFailure();

Test3Servers();

TestSuccessAsync();

TestFailureAsync();

Test3ServersAsync();
