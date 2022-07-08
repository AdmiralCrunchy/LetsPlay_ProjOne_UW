fetch (`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15
`)
.then (function (response) {
    console.log(response)
    return response.json();
})
.then (function (data) {
    console.log(data)
});


