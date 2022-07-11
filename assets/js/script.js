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
    var dateNum;
    var priceNum = document.getElementById("gamePrice").value;
    document.getElementById("gamePrice").value ="#gamePrice";

    //fetching results
    fetch (`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15`)
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
        
        var gameInfo = document.createElement(`p`)
        gameInfo.innerHTML = data[i].title + ` ` + data[i].salePrice + ` ` + data[i].storeID + ` ` + data[i].thumb + ` ` + "https://store.steampowered.com/app/" + ` ` + data[i].steamAppID + "Release Date in UNIX: " + ` ` + data[i].releaseDate
        gameInfo.setAttribute(`class`, `white-text`)


        var card = document.createElement(`div`)
        card.setAttribute(`class`,`card-panel teal col s12 m4`)
        card.appendChild(gameInfo)

        var games = document.querySelector(`#games`)
        games.appendChild(card)


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