
var address ="hypixel.net";

function getHypixelStatusAndUpdate(){
    fetch(`https://api.mcsrvstat.us/2/${address}`)
    .then(response => response.json())
    .then(data => {
        const object = {
            isServerOnline : data.online,
            maxPlayers : data.players.max,
            onlinePlayers : data.players.online,
            hostname : data.hostname
        }
        console.log(object);
    });
};

getHypixelStatusAndUpdate()

