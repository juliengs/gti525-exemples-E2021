// Solution à l'activité en classe en utilisant setInterval

var invokeTimes = function(func, noTimes, time) {
    console.log("Invocation: " + noTimes + " " + time);
    var count = 0;
    var interval;
    var intervalHandler = function() {
	console.log( "invocation " + count);
	func(count);
	count = count + 1;
	if (count == noTimes) {
	    clearInterval(interval);
	}
    };
    if (noTimes >0)
	interval = setInterval(intervalHandler, time);
};

var setup = function() {
    invokeTimes( function(i) { alert("hello " + i); }, 10, 1000 );
}

setup();
