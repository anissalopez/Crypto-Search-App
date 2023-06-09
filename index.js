const form = document.querySelector('#form');
const priceSelection = document.querySelector('#price-menu');
const clearSearch = document.querySelector('#clear');

form.addEventListener("submit", cryptoFetch);
priceSelection.addEventListener('change', cryptoFetch);
clearSearch.addEventListener('click', clearPage);

function cryptoFetch(e){
    e.preventDefault();
    fetch(`https://api.coincap.io/v2/assets`)
    .then((response) => response.json())
    .then((data) => {
        let crypto = data
        searchHandler(crypto)
    });
};

function searchHandler(crypto){
  const cryptoData = crypto['data'];
  const searchValue = document.querySelector('#search').value
  
  form.reset();

    if(searchValue){
        for (const object of cryptoData){
            if (object.name.toLowerCase() === searchValue.toLowerCase()){
            appendElements(object);
             };
        };
    }
    else if(priceSelection.value === `Under $500`){
        for(const object of cryptoData){
            if(object.priceUsd < 500){appendElements(object)
             };
        };
    }
   else if(priceSelection.value === `$500 to $1,000`){
        for(const object of cryptoData){
            if(object.priceUsd > 500 && object.priceUsd < 1000){ appendElements(object)
            };
        };
     }
    else if(priceSelection.value === `Over $1,000`){
         for(const object of cryptoData){
             if(object.priceUsd > 1000){ appendElements(object)
             };
         };
     };
 };

 function appendElements(object){
    
    const coinDiv = document.querySelector('#coinDiv');
   
    let coinName = document.createElement('p');
    let coinSymbol = document.createElement('p');
    let coinPrice = document.createElement('p');

    coinName.classList.add('second-color');
   
    let price = object['priceUsd'];
    let formattedPrice = Number(price).toFixed(2);
    let formattedValue = formattedPrice > 999 ? numberFormat(formattedPrice) : formattedPrice;

    coinName.textContent = `Coin Name: ${object.name}`;
    coinSymbol.textContent = `Coin Symbol: ${object.symbol}`;
    coinPrice.textContent = `Current Price: $${formattedValue}`;
          
    coinDiv.appendChild(coinName);
    coinDiv.appendChild(coinSymbol);
    coinDiv.appendChild(coinPrice);
  
   coinName.addEventListener('mouseover', (event) => {
    coinName.title = object['changePercent24Hr'];
   });
 };

 function clearPage (e){
    return coinDiv.textContent = "";
 }
 
numberFormat = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
     
    




   







