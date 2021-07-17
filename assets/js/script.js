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

updatePlayerStats();
