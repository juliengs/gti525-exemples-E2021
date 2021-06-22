// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

fetch("https://httpbin.org/post", {method: "POST", body: "GTI525"})
    .then( handleErrors( response ) )
    .then( response => response.json() )
    .then( data => console.log( data.data) )
    .catch( error => console.log( "Une erreur est survenue: " + error ));
