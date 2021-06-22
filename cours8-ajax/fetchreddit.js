// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

function fetchReddit(url) {

    function buildTable(data) {

	const table = document.createElement("table");
	table.border = "1";
	
	const cn = data.data.children;
	for (let c of cn) {
	    const title = c.data.title;
	    const selftext = c.data.selftext;
	    const link = c.data.url;

	    // Add row
	    const tr = document.createElement("tr");
	    table.appendChild(tr);
	    // Add columns
	    const tdtitle = document.createElement("td");
	    const tdtext = document.createElement("td");

	    const tdurl = document.createElement("a");
	    tdtitle.appendChild(tdurl);
	    tdurl.href = link;
	    tdurl.target = "_blank";

	    const tdtitletext = document.createTextNode(title);
	    const tdtextnode = document.createTextNode(selftext);
	    
	    tdurl.appendChild(tdtitletext);
	    
	    tdtext.appendChild(tdtextnode);
	    tr.appendChild(tdtitle);
	    tr.appendChild(tdtext);
	}

	document.body.appendChild(table);
    }
    
    fetch(url)
	.then( handleErrors )
	.then( response => response.json() )
	.then( data => buildTable(data) );
}

fetchReddit("https://www.reddit.com/r/etsmtl.json");
