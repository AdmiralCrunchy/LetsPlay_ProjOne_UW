fetch (`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15
`)
.then (function (response) {
    return response.json();
})
.then (function (data) {
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].title, data[i].salePrice, data[i].storeID, data[i].thumb, "https://store.steampowered.com/app/"+data[i].steamAppID, "Release Date in UNIX: ", data[i].releaseDate)
        

    }

});


// Authorization key 01t2hw91p106iz3vh7wuef6rl1wf7r
