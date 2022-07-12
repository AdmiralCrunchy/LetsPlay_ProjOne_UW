// * checkout https://p5js.org/reference/# for p5 documentation, really well written

let baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
let contentUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='
let imageListUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=images&format=json&titles='
let imageUrl = 'https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/'
let zero = 0;
let title, link, contentExtracted, pageId, imageAddrs, imageSrc, imageName;


let dict = {}


// * setup is called once when the program starts (from p5js)
function setup() {
    
    noCanvas(); // removes the default canvas that p5 renders
    let userInputs = select('#funky-button'); // target: array of games
    // userInputs.changed(itemHandler); // listener: when the array updates from null to have items in array
    $('#funky-button').click(function() {itemHandler()});

    function itemHandler() {
        let inputLength = $('#userinput').children().length;
        if (!inputLength) {
            console.log("Nothing was added to the #userinput")
            return;
        }
        console.log('button changed'); // debug working
        $('#userinput').children('li').each(function () {
            let game_title = $(this)[0].innerText;
            console.log({loop_1: game_title});
            goWiki(game_title);
        });
    }
    
    function goWiki(game) {
        console.log({game}); // debug: working
        let term = game;
        let url = baseUrl + term;

        /**
         * Loads a JSON file asynchronously  from a file or a URL, and returns an Object. 
         * @param url name of file or url to load into json
         * @param gotSearch callback function to be executed after json loads and passed into
         * @param jsonp string is for enabling the jsonpOption (json padding that bypass the server's cross-domain issues)
         */
        loadJSON(url, gotSearch, 'jsonp');
    }

    function gotSearch(data) {
        console.log({event: 'first touching got search'});
        title = data[1][zero];
        // replace space with ws using regex
        title = title.replace(/\s+/g, '_'); // remove space with underscore
        
        link = data[3][zero];
        dict[title] = {title};
        let url = contentUrl + title;
        $.extend(dict[title], {link});

        // console.log('before gotContent');
        loadJSON(url, gotContent, 'jsonp');
    }

    function gotContent(data) {


        // since all pages on wikipedia have an unique page_id, I need to dynamically get using Object.keys to extract the id 
        let qPages = data.query.pages; // safe
        pageId = Object.keys(data.query.pages)[0]; // safe
        title = qPages[pageId].title; // safe
        title = title.replace(/\s+/g, '_'); // safe
        
        contentExtracted = qPages[pageId]['extract'].trim(); // safe
        // console.log({event : `before extending contentExtracted to dict[${title}]`, title, 'content extracted ': contentExtracted});
        console.log({'gotContent before extend look inside dict' :dict[title], contentExtracted});
        $.extend(dict[title], {contentExtracted});
        console.log({'gotContent after extend look inside dict' :dict[title], contentExtracted});
        gotSearchImages(title)
    }

    function gotSearchImages(title) { // title is safe ALL IS SAFE

        let url = imageListUrl + title;
        console.log({'url to images' : url}); 
        loadJSON(url, gotPictures, 'jsonp');
    }

    function gotPictures(data) {
        let qPages = data.query.pages;
        pageId = Object.keys(data.query.pages)[0];
        let images = qPages[pageId].images;
        title = qPages[pageId].title.replace(/\s+/g, '_');
        console.log({'got picture titles': title});
        let imageTitles = [];
        // get max of 10 images
        if(images.length > 10) {
            for(let i = 0; i < 10; i++) {
                imageTitles.push(images[i].title);
            }
        } else {
            for(let i = 0; i < images.length; i++) {
                imageTitles.push(images[i].title);
            }
        }
        console.log({imageTitles});
        imageAddrs = gotNonSvg(imageTitles);
        if(imageAddrs) {
            gotImage(imageAddrs, title); 
        } else {
            alert("no image found");
        }

    }
    
    // this function returns the first png or jpg image found in argument images array
    function gotNonSvg(imageTitles) {
        const regex = new RegExp('\.(png|jpg)$'); // only get png or jpg 

        let returnArr = imageTitles.map(
            iTitle => // item title is safe
            (regex.test(iTitle)) ? iTitle : null
        );
        // console.log(returnArr);
        for(let i = 0; i < imageTitles.length; i++) {
            if(returnArr[i]){
                console.log('inside gotNonSvg'+imageTitles[i]); // debug: working 
                return imageTitles[i]
            }
        }
        console.log('bottom of gotNonSvg, no truthy found in returnArr'); // debug: working, never reached
        return(null);
    }
    
    function gotImage(image, title) {
        // console.log({'inside gotImage and title is ': title}); // debug: working
        imageName = image;
        imageSrc = imageUrl + image;
        $.extend(dict[title], {imageSrc}, {imageName});
        console.log({'inside gotImage and inspect dict[title]': dict[title]}); // debug: 

        createDOM(title);
    }

    function createDOM(title) {
        console.log({'createDOM look inside dict' :dict[title]});
        
        // create Elements
        let cardContainer = document.createElement('div');
        let cardImageDiv = document.createElement('div');
        let cardImage = document.createElement('img');
        let cardImageSpan = document.createElement('span');
        let cardContentDiv = document.createElement('div');
        let cardParagraph = document.createElement('p');
        let aLinkDiv = document.createElement('div');
        let aLink = document.createElement('a');

        // set class 
        cardContainer.setAttribute('class','card');
        cardImageDiv.setAttribute('class','card-image');
        cardImageSpan.setAttribute('class','card-title');
        cardContentDiv.setAttribute('class','card-content');
        aLinkDiv.setAttribute('class','card-action');

        // attach to anchor
        $('#userinput').append(cardContainer);
        cardContainer.append(cardImageDiv, cardContentDiv, aLinkDiv);
        cardImageDiv.append(cardImage, cardImageSpan);
        cardContentDiv.appendChild(cardParagraph);
        aLinkDiv.appendChild(aLink);

        // add content 
        cardImage.setAttribute('src', dict[title].imageSrc); // {title : {imageSrc}}
        cardImageSpan.textContent = dict[title].imageName; // {title : {imageName}}
        cardParagraph.textContent = dict[title].contentExtracted; // {title : {contentExtracted}}
        aLink.setAttribute('href', dict[title].link); // {title : {link}}
        aLink.textContent = 'Wikipedia link'; // target="_blank"
        aLink.setAttribute('target', '_blank');
    }
}


$('#funky-button').click(function() {
    console.log('clicked') // debug working
    let curr_val = $(this).text();
    if(curr_val == "click"){
        $('#funky-button').text("clack");
    } else {
        $('#funky-button').text("click");
    }
});