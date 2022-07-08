fetch (`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15
`)
.then (function (response) {
    return response.json();
})
.then (function (data) {
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].internalName, data[i].salePrice)
        

    }

});


