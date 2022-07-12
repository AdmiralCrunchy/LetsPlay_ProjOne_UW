// * checkout https://p5js.org/reference/# for p5 documentation, really well written

let baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
let contentUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='
let imageListUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=images&format=json&titles='
let imageUrl = 'https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/'
let zero = 0;
let title, link, qPages, contentExtracted, pageId, imageAddrs, imageSrc, imageName;


// * setup is called once when the program starts (from p5js)
function setup() {
    
    noCanvas(); // removes the default canvas that p5 renders
    let userInputs = select('#userinput'); // target: array of games
    userInputs.changed(itemHandler); // listener: when the array updates from null to have items in array

    function itemHandler() {
        let inputLength = $('#userinput').children().length;
        if (!inputLength) {
            alert("Nothing was added to the #userinput")
            return;
        }
        $('#usesrinput').children().each(
            goWiki(this.value)
        );
    }
    
    function goWiki(game) {
        let term = game;
        let url = baseUrl + term;

        /**
         * Loads a JSON file from a file or a URL, and returns an Object. 
         * @param url name of file or url to load into json
         * @param gotSearch callback function to be executed after json loads and passed into
         * @param jsonp string is for enabling the jsonpOption (json padding) that bypass the server's cross-domain issues
         */
        loadJSON(url, gotSearch, 'jsonp');
    }

    function gotSearch(data) {
        title = data[1][zero];
        // replace space with ws using regex
        title = title.replace(/\s+/g, '_'); // 1 or more space everywhere in a line with underscore

        /* dom start: create title and link */
        link = data[3][zero];
        let titleEl = document.createElement('p');
        titleEl.innerHTML = title;
        let linkEl = document.createElement('a');
        linkEl.href = link;
        linkEl.innerHTML = link;
        console.log({
            status: 'Querying: ' + title,
            link,
        });
        document.body.append(titleEl, linkEl);
        /* dom end */

        let url = contentUrl + title;
        console.log({ url });
        loadJSON(url, gotContent, 'jsonp')
    }

    function gotContent(data) {
        console.log(data);

        // since all pages on wikipedia have an unique page_id, I need to dynamically get using Object.keys to extract the id 
        qPages = data.query.pages;
        pageId = Object.keys(data.query.pages)[0];
        console.log(pageId);
        contentExtracted = qPages[pageId]['extract'];
        console.log({contentExtracted});
        createDiv(contentExtracted); // DOM: creates Div and append it to body

        gotSearchImages()
    }

    function gotSearchImages() {
        let url = imageListUrl + title;
        loadJSON(url, gotPictures, 'jsonp')
    }

    function gotPictures(data) {
        qPages = data.query.pages;
        pageId = Object.keys(data.query.pages)[0];
        let images = qPages[pageId].images;
        let imageTitles = [];
        for(let i = 0; i < images.length; i++) {
            imageTitles.push(images[i].title);
        }
        console.log(imageTitles);
        imageAddrs = gotNonSvg(imageTitles);
        if(imageAddrs) {
            gotImage(imageAddrs); 
        } else {
            createDiv("no image found");
        }

    }
    
    function gotNonSvg(imageTitles) {
        const regex = new RegExp('\.(png|jpg)$'); // only get png or jpg 

        let returnArr = imageTitles.map(
            iTitle => 
            (regex.test(iTitle)) ? iTitle : null
        );
        // console.log(returnArr);
        for(let i = 0; i < imageTitles.length; i++) {
            console.log(returnArr[i]);
            if(returnArr[i])
                return imageTitles[i]
        }
        return(null);
    }
    
    function gotImage(image) {
        imageName = image
        imageSrc = imageUrl + image;
        
        createDOM();
    }

    function createDOM() {
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
        $('#description').append(cardContainer);
        cardContainer.append(cardImageDiv, cardContentDiv, aLinkDiv);
        cardImageDiv.append(cardImage, cardImageSpan);
        cardContentDiv.appendChild(cardParagraph);
        aLinkDiv.appendChild(aLink);

        // add content 
        cardImage.setAttribute('src', imageSrc)
        cardImageSpan.textContent = imageName
        cardParagraph.textContent = contentExtracted;
        aLink.setAttribute('href', link);

    }
}
