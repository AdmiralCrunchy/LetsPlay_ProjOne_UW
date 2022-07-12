var filterButton = $('#filterSubmit');
var gamesListArray = [];
var dropChoice;
var dateChoice = 3000;


filterButton.on('click', parsingResults);




//Parsing through results

function isChecked(checkID)
{
    if (document.getElementById(checkID).checked){
        document.getElementById("Message");
        console.log("Checked");
    }
    else
    {
        document.getElementById("message");
        console.log("Unchecked");
    }
}

function dateSelected(selection)
{

    switch(selection)
    {
        case 3000:
            console.log("All Selected");
            dateChoice = selection;
            break;
        case 2020:
            console.log("2020 Selected");
            dateChoice = selection;
            break;
        case 2010:
            console.log("2010 Selected");
            dateChoice = selection;
            break;
        case 2000:
            console.log("2000 Selected");
            dateChoice = selection;
            break;
        case 1990:
            console.log("1990 Selected");
            dateChoice = selection;
            break;
        case 1980:
            console.log("1980 Selected");
            dateChoice = selection;
            break;
    }
}

function parsingResults()
{

    // clear cards
    function empty() {
        $(games).empty();
    }
    empty();
    gamesListArray = []


    var dateNum;
    var priceNum = document.getElementById("gamePrice").value;
    document.getElementById("gamePrice").value ="#gamePrice";

    //fetch results
    fetch (`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=100`)
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data)

        var x = 0;
    
        for (let i = 0; i < data.length; i++) {
            
           var price = false;
           var date = false;
           var rate = false;
           
           price = checkPrice(data[i], priceNum);
           date = checkDate(data[i],dateNum)
           rate = checkRating(data[i])
           
           console.log ("Results are: ", price, date, rate);
           if (price && date && rate)
           {
                gamesListArray.push(data[i])
           }
           

        }
        
        console.log(gamesListArray);
        
        
        // dynamically generate cards
        for (let i = 0; i < gamesListArray.length; i++) {
            var gameInfo = document.createElement(`div`)
            var gameIcon = document.createElement(`img`)
            var gameBanner = document.createElement(`img`)
            var gameLink = document.createElement(`a`)
            var gameTitle = `Title: ${gamesListArray[i].title} <br>`
            var gamePrice = `Price: $${gamesListArray[i].salePrice} <br>`
            var gameDate = `Release Date: ${moment.unix(gamesListArray[i].releaseDate).format("MMM Do, YYYY")} <br>`
            


            gameIcon.setAttribute(`src`, gamesListArray[i].thumb)
            gameBanner.setAttribute(`src`, 'https://www.cheapshark.com/img/stores/banners/0.png')
            gameIcon.setAttribute(`src`, gamesListArray[i].thumb)
            var gameTitle = document.createElement(`h5`)
            gameTitle.innerHTML = gamesListArray[i].title

            var gamePrice = `Price: $${gamesListArray[i].salePrice} <br>`
            var gameDate = `Release Date: ${moment.unix(gamesListArray[i].releaseDate).format("MMM Do, YYYY")}; <br>`
            var gameLink = document.createElement(`a`)
            gameLink.href = "https://store.steampowered.com/app/" + gamesListArray[i].steamAppID
            gameLink.target= `_blank`
            // var gameDate = "Release Date in UNIX: " + ` ` + gamesListArray[i].moment.unix(test.releaseDate).format("MMM Do, YYYY");
 
            gameInfo.setAttribute(`class`, `white-text`)
            gameLink.href = "https://store.steampowered.com/app/" + gamesListArray[i].steamAppID
            gameInfo.innerHTML = gamePrice + ` ` + gameDate



            var card = document.createElement(`div`)
            card.setAttribute(`class`,`card-panel  col s12 m12 l3`)
            card.style.margin = `0.5rem`;
            card.style.padding = `2rem`;
            card.style.borderRadius = `0.5rem`;
            card.style.boxShadow = `3px 4px`
            card.style.background = `linear-gradient(90deg, rgba(6,0,102,1) 0%, rgba(9,9,121,1) 84%, rgba(1,76,226,1) 100%)`
            
            card.prepend(gameIcon)
            gameLink.appendChild(gameBanner)
            card.appendChild(gameTitle)
            card.appendChild(gameInfo)
            card.appendChild(gameLink)
            gameLink.setAttribute(`class`, `white-text`)

            var games = document.querySelector(`#games`)
            games.appendChild(card)
            

        }



    });

};


function checkPrice(test, price)
{
    if (price >= test.salePrice)
    {
        answer = true;
        console.log(test.title);
        console.log(test.salePrice);
        console.log('Correct');
    }
    else
    {
        answer = false;
        console.log(test.title);
        console.log(test.salePrice);
        console.log('Not Correct');
    }


    return answer;
};

// function parsingStoreInfo(x, card)
// {
//     var gameBanner = document.createElement(`img`)
//     fetch (`https://www.cheapshark.com/api/1.0/stores`)
//     .then (function (response) {
//         return response.json();
//     })
//     .then (function (data) {
//         console.log(data[1].images.banner)
//         switch(x)
//         {
//             case 1:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[1].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 2:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[2].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 3:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[3].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 4:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[4].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 5:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[5].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 6:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[6].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 7:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[7].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 8:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[8].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 9:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[9].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 10:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[10].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 11:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[11].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 12:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[12].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 13:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[13].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 14:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[14].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 15:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[15].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 16:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[16].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 17:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[17].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 18:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[18].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 19:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[19].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 20:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[20].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 21:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[21].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 22:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[22].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 23:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[23].images.banner);
//                 card.appendChild(gameBanner);
//                 break;
//             case 24:
//                 gameBanner.setAttribute(`src`, 'https://www.cheapshark.com' + data[24].images.banner);
//                 card.appendChild(gameBanner);
//                 break;


//         }

//     })

    

    
// }

function checkDate(test, num)
{
    var timeDate = moment.unix(test.releaseDate).format("MMM Do, YYYY");

    if (test.releaseDate <= 1893484799 && test.releaseDate >= 1577865600)
    {
        console.log("This is a 2020's game!");
        if (dateChoice == 3000 || 2020)
        { 
            return true;
        }
    }
    else if(test.releaseDate <= 1577865599 && test.releaseDate >= 1262332800)
    {
        console.log("This is a 2010's game!");
        if (dateChoice == 3000 || 2010)
        { 
            return true;
        }
    }
    else if (test.releaseDate <= 1262332799 && test.releaseDate >= 946713600)
    {
        console.log("This is a 2000's game!");
        if (dateChoice == 3000 || 2000)
        { 
            return true;
        }
    }
    else if (test.releaseDate <= 946713599 && test.releaseDate >= 631180800)
    {
        console.log("This is a 1990's game!");
        if (dateChoice == 3000 || 1990)
        { 
            return true;
        }
    }
    else if (test.releaseDate <= 631180799 && test.releaseDate >= 315561600)
    {
        console.log("This is a 1980's game!");
        if (dateChoice == 3000 || 1980)
        { 
            return true;
        }
    }
    else{
        console.log("Out of time Frame!");
    }
    console.log(timeDate)

    return false;
};

function checkRating(rating)
{   console.log(rating.steamRatingText);

    var overPos = document.querySelector('#posOver').checked;
    var veryPos = document.querySelector('#posVery').checked
    var mostPos = document.querySelector('#posMost').checked;
    var justPos = document.querySelector('#posJust').checked;
    var mixed  = document.querySelector('#mixed').checked;
    var justNeg  = document.querySelector('#negJust').checked;
    var mostNeg  = document.querySelector('#negMost').checked;
    var veryNeg  = document.querySelector('#negVery').checked;
    var overNeg = document.querySelector('#negOver').checked;

    if(overPos)
    {
        console.log("This product might be Overwhelmingly Positive");
        if (rating.steamRatingText == 'Overwhelmingly Positive')
        {
            console.log("This product is Overwhelmingly Positive");
            return true;
        } 
    }
    if(veryPos)
    {
        console.log("This product might be Very Positive");
        if (rating.steamRatingText == 'Very Positive')
        {
            console.log("This product is Very Positive");
            return true;
        } 
    }
    if(mostPos)
    {
        console.log("This product might be Mostly Positive");
        if (rating.steamRatingText == 'Mostly Positive')
        {
            console.log("This product is Mostly Positive");
            return true;
        } 
    }
    if(justPos)
    {
        console.log("This product might be Just Positive");
        if (rating.steamRatingText == 'Positive')
        {
            console.log("This product is Just Positive");
            return true;
        } 
    }
    if(mixed)
    {
        console.log("This product might be Mixed");
        if (rating.steamRatingText == 'Mixed')
        {
            console.log("This product is Mixed");
            return true;
        } 
    }
    if(justNeg)
    {
        console.log("This product might be Just Negative");
        if (rating.steamRatingText == 'Negative')
        {
            console.log("This product is Just Negative");
            return true;
        } 
    }
    
    if(mostNeg)
    {
        console.log("This product might be Mostly Negative");
        if (rating.steamRatingText == 'Mostly Negative')
        {
            console.log("This product is Mostly Negative");
            return true;
        } 
    }
    if(veryNeg)
    {            
        console.log("This product might be Very Negative");
        if (rating.steamRatingText == 'Very Negative')
        {
            console.log("This product is Very Negative");
            return true;
        } 
    }
    if(overNeg)
    {
        console.log("This product might be Overwhelmly Negative");
        if (rating.steamRatingText == 'Overwhemingly Negative')
        {
            console.log("This product is Overwhelmly Negative");
            return true;
        } 
    }
    else
    {
        
        if (!overPos && !veryPos && !mostPos && !justPos && !mixed && !justNeg && !mostNeg && !veryNeg && !overNeg)
        {
            if(rating.steamRatingText == null)
            {   
                console.log("This product has no rating.");
                return true;
            }
        }

        return false;
    }

    return false;

};

$('.dropdown-trigger').dropdown();

//Pulling information
        // console.log(data[i].title, data[i].salePrice, data[i].steamRatingText, data[i].storeID, data[i].thumb, "https://store.steampowered.com/app/"+data[i].steamAppID, "https://metacritic.com/"+data[i].metacriticLink, "Release Date in UNIX: ", data[i].releaseDate)