
const tsToDate = uTimeStamp => {
    if (typeof uTimeStamp == "number") {
        const dateObj = new Date(uTimeStamp);

        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        
        return `${day}/${month}/${year}`;
        }
    return "-"
}

const renderImg = (uuid) => {
    $("#player-skin").attr("src",`https://crafatar.com/renders/body/${uuid}`);
};

const getLocalStorage = () => {
    
    curLocalStorage = JSON.parse(localStorage.getItem("searchedPlayers"));

    if (curLocalStorage){
        return curLocalStorage
    }
    return [];

}

const updateLocalStorage = playerObj => {

    let curLocalStorage = getLocalStorage();
    curLocalStorage.unshift(playerObj);
    localStorage.setItem("searchedPlayers", JSON.stringify(curLocalStorage));
}

// calls getPlayerStats take promise and calls the update function
const updatePlayerStats = (uuid) => {
    getPlayerStats(uuid)
    .then(playerObj => {
        updatePlayerElement(playerObj);
        if(playerObj.foundPlayer){ 
            // call function to write to local storage
            updateLocalStorage(playerObj);
            renderImg(uuid);
            updateSearchDiv();
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

// event handler to search players info
const searchBtnHandler = event => {
    event.preventDefault();

    const uuidInput = $("#input-uuid").val()

    updatePlayerStats(uuidInput);
    $("#input-uuid").val("")

}


const clickEventHandler = event => {
    updatePlayerStats($(event.target).data("uuid"));

}

// Update the previously searched spans
// Removing any duplicate names
const updateSearchDiv = () => {

    let found = [];
    
    let prevSeachedEL = $("#previous-search-div");

    prevSearchArr = getLocalStorage();
    prevSeachedEL.empty();
    for (let i = 0; i < prevSearchArr.length; i++){

        const playerName = prevSearchArr[i].playerName;
        const uuid =  prevSearchArr[i].playerUUID;
             
        if(!found.includes(uuid)){
        prevSeachedEL.append($("<button>")
        .text(playerName)
        .attr("data-uuid", uuid)
        .addClass("shadow-xl bg-green-700 rounded-3xl text-center text-green-200 hover:bg-green-100 hover:text-black mb-2 p-2"));

        found.push(uuid)
        }
    }


}

// empty search div and add empty array to local storage
const clearSearchHistory = () => {
    localStorage.setItem("searchedPlayers", "[]");
    $("#previous-search-div").empty();

}


getHypixelStatus().then(data => {
    updateStatusElement(data)
   })

// event listerners for the page
$("#search-player-uuid").on("submit", searchBtnHandler);
$("#previous-search-div").on("click", clickEventHandler)
$("#clear-button").on("click", clearSearchHistory)

updateSearchDiv()


