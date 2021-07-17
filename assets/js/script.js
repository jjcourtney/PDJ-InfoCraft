console.log("This is working!");

var uuidEl = $("#uuid");
var playerNameEl = $("#player-name");
var dateJoinedEl = $("#date-joined");
var lastOnlineEl = $("#last-online");
var numAchievementsEl = $("#num-achievements");







const updatePlayerStats = () => {
    getPlayerStats()
    .then(playerObj => {
        uuidEl.text(playerObj.playerUUID)
        playerNameEl.text(playerObj.playerName)
        dateJoinedEl.text(playerObj.firstLogin)
        lastOnlineEl.text(playerObj.lastLogin)
        numAchievementsEl.text(playerObj.numAchievements)
        
    });
};

const updateStatusElement = (playerObj) => {
        
    const {isServerOnline, maxPlayers, onlinePlayers, hostname} = playerObj;
    
        const statusDiv = $("#status-div");

        let hostNameDiv = $(`<div>`)
                        .append($(`<h3>`)
                        .text(`${hostname}`));
        
        let onlineStatusDiv = $(`<div>`)
        .append($(`<span>`).text("Status "))
        .append($(`<span>`).text(`${isServerOnline}`));

        let playerOnlineDiv = $(`<div>`)
        .append($(`<span>`).text("Players "))
        .append($(`<span>`).text(`${onlinePlayers} / ${maxPlayers}`));

        statusDiv.append(hostNameDiv)
        .append(onlineStatusDiv)
        .append(playerOnlineDiv)

}

getHypixelStatus().then((data) => {
    updateStatusElement(data)
   })

updatePlayerStats();

