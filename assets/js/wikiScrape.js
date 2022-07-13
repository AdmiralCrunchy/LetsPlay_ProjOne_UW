// * checkout https://p5js.org/reference/# for p5 documentation, really well written

let baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
let contentUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='
let imageListUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=images&format=json&titles='
let imageUrl = 'https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/'

let dict = {} // object that holds everything 


// * setup is called once when the program starts (from p5js)
function setup() {
    
    noCanvas(); // removes the default canvas that p5 renders
    let userInputs = select('#funky-button'); // target: array of games
    $('#hidden-activator').click(function() {itemHandler()});

    function itemHandler() {
        let inputLength = $('#gamesAnchor').children().length;

        if (!inputLength) {
            console.error({'scriptjs error':'no game found'})
            return;
        }
        console.log('button changed'); // debug working
        $('#gamesAnchor').children('div').each(function () {
            let game_title = $(this)[0].innerText;
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
        console.log({event: 'first touching got search', data});
        if(!data) { // if data is null, continue onto next loop
            console.log({'search query data empty': 'loop skipped'});
            return;
        }   
        let title = data[0];
        // replace space with ws using regex
        title = title.replace(/\s+/g, '_'); // remove space with underscore
        
        let link = data[3][0];
        dict[title] = {title};
        let url = contentUrl + title;
        $.extend(dict[title], {link});

        // console.log('before gotContent');
        loadJSON(url, gotContent, 'jsonp');
    }

    function gotContent(data) {

        // since all pages on wikipedia have an unique page_id, I need to dynamically get using Object.keys to extract the id 
        let qPages = data.query.pages; // safe
        let pageId = Object.keys(data.query.pages)[0]; // safe
        let title = qPages[pageId].title; // safe
        title = title.replace(/\s+/g, '_'); // safe
        if(qPages[pageId]['extract']) {
        let contentExtracted = qPages[pageId]['extract'].trim(); // safe
        $.extend(dict[title], {contentExtracted});
        } else { // if nothing to extract, continue to next loop
            console.log({'description data empty': 'loop skipped'});
            return;
        }
        console.log({'inside gotcontent data': data});
        
        console.log({'gotContent after extend look inside dict' :dict[title]});
        gotSearchImages(title)
    }

    function gotSearchImages(title) { // title is safe ALL IS SAFE

        let url = imageListUrl + title;
        console.log({'url to images' : url}); 
        loadJSON(url, gotPictures, 'jsonp');
    }

    function gotPictures(data) {
        let qPages = data.query.pages;
        let pageId = Object.keys(data.query.pages)[0];
        let images = qPages[pageId].images;
        let title = qPages[pageId].title.replace(/\s+/g, '_');
        console.log({'got picture titles': title});
        let imageTitles = [];
        // get max of 10 images
        if(!images) { // if no image, continue to next loop
            return;
        }
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
        let imageAddrs = gotNonSvg(imageTitles);
        if(imageAddrs) {
            gotImage(imageAddrs, title); 
        } else {
            console.log({'no image found': 'loop skipped'});
            return;
        }

    }
    
    // this function returns the first png or jpg image found in argument images array
    function gotNonSvg(imageTitles) {
        const regex = new RegExp('\.(png|jpg)$'); // only get png or jpg 

        let returnArr = imageTitles.map(
            iTitle => // iTitle is safe
            (regex.test(iTitle)) ? iTitle : null
        );
        // console.log(returnArr);
        for(let i = 0; i < imageTitles.length; i++) {
            if(returnArr[i]){
                console.log('inside gotNonSvg'+imageTitles[i]); // debug: working 
                return imageTitles[i];
            }
        }
        console.log('bottom of gotNonSvg, no truthy found in returnArr'); // debug: working, never reached
        return(null);
    }
    
    function gotImage(image, title) {
        // console.log({'inside gotImage and title is ': title}); // debug: working
        let imageName = image;
        let imageSrc = imageUrl + image;
        $.extend(dict[title], {imageSrc}, {imageName});
        console.log({'inside gotImage and inspect dict[title]': dict[title]}); // debug: working

        createDOM(title);
    }

    function createDOM(title) {

        
        console.log({'createDOM look inside dict' :dict[title], title});
        if(!dict[title]) { //if nothing inside, don't create the card
            console.log({ 'no entry on Wikipedia': `title:${dict[title]} loop skipped`});
            return;
        }
        
        // create Elements
        let flexContainer = document.createElement('div')
        let cardContainer = document.createElement('div');
        let cardImageDiv = document.createElement('div');
        let cardImage = document.createElement('img');
        let cardImageSpan = document.createElement('span');
        let cardContentDiv = document.createElement('div');
        let cardParagraph = document.createElement('p');
        let aLinkDiv = document.createElement('div');
        let aLink = document.createElement('a');

        // set class 
        cardContainer.setAttribute('class','card medium');
        cardImageDiv.setAttribute('class','card-image');
        cardImageSpan.setAttribute('class','card-title');
        cardContentDiv.setAttribute('class','card-content');
        aLinkDiv.setAttribute('class','card-action');
        flexContainer.setAttribute('class','col s12 m6 l4');

        // attach to anchor
        $('#renderAnchor').append(flexContainer);
        flexContainer.append(cardContainer);
        cardContainer.append(cardImageDiv, cardContentDiv, aLinkDiv);
        cardImageDiv.append(cardImage);
        cardContentDiv.appendChild(cardParagraph);
        aLinkDiv.appendChild(aLink);

        // add content 
        cardImage.setAttribute('src', dict[title].imageSrc); // {title : {imageSrc}}
        cardImageSpan.textContent = dict[title].imageName.substring(5); // {title : {imageName}}
        cardParagraph.textContent = dict[title].contentExtracted; // {title : {contentExtracted}}
        aLink.setAttribute('href', dict[title].link); // {title : {link}}
        aLink.textContent = 'Wikipedia link'; 
        aLink.setAttribute('target', '_blank');
    }

}




