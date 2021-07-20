
 // const UUID = "ad1fe1440d1241428e9d646cb29f0a0e"
 const API_KEY ="5f3485f6-646a-4355-bf67-74272a6c9efb"

 const getPlayerStats = uuid => fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        if (data.success){
            return  {
                playerUUID: data.player.uuid,
                playerName: data.player.playername,
                firstLogin: data.player.firstLogin,
                lastLogin: data.player.lastLogin,
                achievementPoints: data.player.achievementPoints,
                numAchievements: data.player.achievementsOneTime.length
                }
        }
        return {
            playerUUID: "UUID not found",
            playerName: "Invalid input",
            firstLogin: "N/A",
            lastLogin: "N/A",
            achievementPoints: "N/A",
            numAchievements: "N/A"
        }
        

        
    }
    );


getPlayerStats().then(playerObj => console.log(playerObj));
