

function getPlayerStats() {

    const UUID = "ad1fe1440d1241428e9d646cb29f0a0e"
    const API_KEY ="5f3485f6-646a-4355-bf67-74272a6c9efb"


    return fetch(`https://api.hypixel.net/player?uuid=${UUID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => ({
        playerUUID: data.player.uuid,
        playerName: data.player.playername,
        firstLogin: data.player.firstLogin,
        lastLogin: data.player.lastLogin,
        achievementPoints: data.player.achievementPoints,
        numAchievements: data.player.achievementsOneTime.length
    }))

}
getPlayerStats().then(playerObj => console.log(playerObj));
