fetch (`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15
`)
.then (function (response) {
    return response.json();
})
.then (function (data) {
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].title, data[i].salePrice, data[i].storeID, data[i].thumb, "https://store.steampowered.com/app/"+data[i].steamAppID, "Release Date in UNIX: ", data[i].releaseDate)
        
        var gameInfo = document.createElement(`p`)
        gameInfo.innerHTML = data[i].title + ` ` + data[i].salePrice + ` ` + data[i].storeID + ` ` + data[i].thumb + ` ` + "https://store.steampowered.com/app/" + ` ` + data[i].steamAppID + "Release Date in UNIX: " + ` ` + data[i].releaseDate
        gameInfo.setAttribute(`class`, `white-text`)

        // var gameIcon = document.createElement(`img`)
        // gameIcon.setAttribute(`src`, `${data[i].thumb}`)
        // gameIcon.appendChild(gameInfo)

        var card = document.createElement(`div`)
        card.setAttribute(`class`,`card-panel teal col s12 m4`)
        card.appendChild(gameInfo)

        var games = document.querySelector(`#games`)
        games.appendChild(card)

    }

});


// Authorization key 01t2hw91p106iz3vh7wuef6rl1wf7r
