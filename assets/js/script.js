var slider = document.getElementById('test-slider');
noUiSlider.create(slider, {
 start: [20, 80],
 connect: true,
 step: 1,
 orientation: 'vertical', // 'horizontal' or 'vertical'
 range: {
   'min': 0,
   'max': 10
 },
 format: wNumb({
   decimals: 0
 })
});


//fetch information from API

var repoList = document.querySelector('ul');
fetchButton = document.getElementById('fetch-button');

function getApi(){
    console.log("This Works")
    var requestUrl = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
    var headers = {};

    fetch(requestUrl)
    .then(function (response) {
        if (response.ok){
            return response.json();
        }
    })
    .then(function (data){
        for (var i = 0; i < 100; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = data[i].internalName;
            repoList.appendChild(listItem);        
        }
    })
}

fetchButton.addEventListener('click', getApi);