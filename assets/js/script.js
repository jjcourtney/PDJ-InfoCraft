console.log("This is working!");

const tsToDate = uTimeStamp => {
    
    const dateObj = new Date(uTimeStamp);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
}

const renderImg = (uuid) => {
    $("#player-skin").attr("src",`https://crafatar.com/renders/body/${uuid}`);
};


// calls getPlayerStats take promise and calls the update function
const updatePlayerStats = (uuid) => {
    getPlayerStats(uuid)
    .then(playerObj => {
        updatePlayerElement(playerObj);
        if(playerObj.foundPlayer){
            renderImg(uuid);
        }
        else{
            renderImg("9c78bf3c046f45d9b3d6f12be4da13f4");
        }
    });
};

const updatePlayerElement = playerObj => {

    const uuidEl = $("#uuid");
    const playerNameEl = $("#player-name");
    const dateJoinedEl = $("#date-joined");
    const lastOnlineEl = $("#last-online");
    const numAchievementsEl = $("#num-achievements");

    const { playerUUID, playerName, firstLogin, lastLogin, numAchievements } = playerObj;

    uuidEl.text(playerUUID);
    playerNameEl.text(playerName);
    dateJoinedEl.text(tsToDate(firstLogin));
    lastOnlineEl.text(tsToDate(lastLogin));
    numAchievementsEl.text(numAchievements);

};

// Takes in the server object then creates / ammends / appends the data
const updateStatusElement = serverObj => {
        
    const {isServerOnline, maxPlayers, onlinePlayers, hostname} = serverObj;
    
        const statusDiv = $("#status-div");

        let hostNameDiv = $(`<div>`)
        .append($(`<h3>`)
        .text(`${hostname}`)
        .addClass("flex flex-col font-bold bg-green-300"));
        
        let onlineStatusDiv = $(`<div>`)
        .append($(`<span>`).text("Status: ").addClass("flex flex-col font-bold bg-green-300"))
        .append($(`<span>`).text(`${isServerOnline ? "Online" : "Offline"}`)// uses ternary operator
        .addClass("flex flex-col bg-green-300")); 

        let playerOnlineDiv = $(`<div>`)
        .append($(`<span>`).text("Players: ").addClass("flex flex-col font-bold bg-green-300"))
        .append($(`<span>`).text(`${onlinePlayers} / ${maxPlayers}`)
        .addClass("flex flex-col bg-green-300"));

        statusDiv.append(hostNameDiv)
        .append(onlineStatusDiv)
        .append(playerOnlineDiv)

}

// add even handler
const searchBtnHandler = event => {
    event.preventDefault();

    const uuidInput = $("#input-uuid").val()
    //console.log(uuidInput)
    updatePlayerStats(uuidInput);

}


getHypixelStatus().then(data => {
    updateStatusElement(data)
   })

// updatePlayerStats();

// add event listerner
$("#search-player-uuid").on("submit", searchBtnHandler);




