// Autre solution à l'activité en classe
// Utilisation de fermetures imbriquées pour préserver l'état

var invokeTimes = function(func, noTimes, time) {
    console.log("Invocation: " + noTimes + " " + time);
    
    for (var i = 0; i < noTimes; ++i) {
	var timeoutHandler = function(count) {
	    // timeOutHandler is a closure
	    return function() {
		console.log( "invocation " + count);
		func(count);
	    }
	}
	setTimeout(timeoutHandler(i), time * i);
    }
};

var setup = function() {
    invokeTimes( function(i) { alert("hello " + i); }, 5, 1000 );
}

setup();
