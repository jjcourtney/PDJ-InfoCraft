
const address ="hypixel.net";

const getHypixelStatus = () => fetch(`https://api.mcsrvstat.us/2/${address}`)
    .then(response => response.json())
    .then(data => ({
        isServerOnline : data.online,
        maxPlayers : data.players.max,
        onlinePlayers : data.players.online,
        hostname: data.hostname
    }));


function updateStatus(statusObj){
    console.log("I am in updateStatus", statusObj)
}

getHypixelStatus().then((data) => {
        debugger;
     updateStatus(data)
    })

