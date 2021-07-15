
var address ="hypixel.net";

function getAPI(){
fetch(`https://api.mcsrvstat.us/2/${address}`)
.then(response => response.json())
.then(data => console.log(data));
};

getAPI();
