console.log("This is working!");

// calls getPlayerStats take promise and calls the update function
const updatePlayerStats = () => {
    getPlayerStats()
    .then(playerObj => {
        updatePlayerElement(playerObj);
    });
};

const updatePlayerElement = playerObj => {

    const uuidEl = $("#uuid");
    const playerNameEl = $("#player-name");
    const dateJoinedEl = $("#date-joined");
    const lastOnlineEl = $("#last-online");
    const numAchievementsEl = $("#num-achievements");

    const { playerUUID, playerName, firstLogin, lastLogin, numAchievements } = playerObj;

    uuidEl.text(playerUUID)
    playerNameEl.text(playerName)
    dateJoinedEl.text(firstLogin)
    lastOnlineEl.text(lastLogin)
    numAchievementsEl.text(numAchievements)

};

// Takes in the server object then creates / ammends / appends the data
const updateStatusElement = serverObj => {
        
    const {isServerOnline, maxPlayers, onlinePlayers, hostname} = serverObj;
    
        const statusDiv = $("#status-div");

        let hostNameDiv = $(`<div>`)
                        .append($(`<h3>`)
                        .text(`${hostname}`));
        
        let onlineStatusDiv = $(`<div>`)
        .append($(`<span>`).text("Status: "))
        .append($(`<span>`).text(`${isServerOnline ? "Online" : "Offline"}`)); // uses ternary operator

        let playerOnlineDiv = $(`<div>`)
        .append($(`<span>`).text("Players: "))
        .append($(`<span>`).text(`${onlinePlayers} / ${maxPlayers}`));

        statusDiv.append(hostNameDiv)
        .append(onlineStatusDiv)
        .append(playerOnlineDiv)

}

getHypixelStatus().then(data => {
    updateStatusElement(data)
   })

updatePlayerStats();

