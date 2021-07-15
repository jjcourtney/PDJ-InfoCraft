

function getUuidFromAPI() {

    const UUID = "ad1fe1440d1241428e9d646cb29f0a0e"
    const API_KEY ="5f3485f6-646a-4355-bf67-74272a6c9efb"


    fetch(`https://api.hypixel.net/player?uuid=${UUID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => console.log(data))

}
getUuidFromAPI();
