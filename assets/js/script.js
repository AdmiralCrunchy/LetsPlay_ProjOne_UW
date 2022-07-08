mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button')); // instantiate MDC markup

fetch (`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15`)
.then (function (response) {
    console.log(response)
    return response.json();
})
.then (function (data) {
    console.log(data)
});


var slider = document.getElementById('#slider');

noUiSlider.create(slider, {
    start: [80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});
