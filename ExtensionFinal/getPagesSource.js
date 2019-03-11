function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later');
}



function DOMtoString(document_root) {
    var html = document_root.body.innerText;
	var re = /[a-zA-Z]+Error:.*:/
	var startPos = html.search(re); // 2
	var segment = html.slice(startPos,startPos+36)

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};
	
	var query = segment.replaceAll(' ','%20')
	var soAPI = "http://api.stackexchange.com/2.2/search?order=desc&sort=votes&tagged=python&intitle=" + query + "&site=stackoverflow";
	var out = fetch(soAPI)
	.then(function(response){
		return response.json();
	})
	.then(function(myJson){
		var tmp = JSON.stringify(myJson);
		console.log(tmp);
	});
	
    return out;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});