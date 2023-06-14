const form = document.querySelector('#form');
const priceSelection = document.querySelector('#price-menu');
const clearSearch = document.querySelector('#clear');

form.addEventListener("submit", cryptoFetch);
priceSelection.addEventListener('change', cryptoFetch);
clearSearch.addEventListener('click', clearPage);

function cryptoFetch(e){
    e.preventDefault();
    fetch(`https://api.coincap.io/v2/assets`)
    .then(response => response.json())
    .then(data => {
        searchHandler(data)
    });
};

function searchHandler(crypto){
  const cryptoData = crypto['data'];
  const searchValue = document.querySelector('#search').value
  form.reset();
  console.log(cryptoData)

    if(searchValue){
        cryptoData.forEach((coin) => {
            if(coin.name.toLowerCase() === searchValue.toLowerCase()){
                appendElements(coin)
            }
        })
    }
    else if(priceSelection.value === `Under $500`){
        cryptoData.forEach((coin) => {
            if(coin.priceUsd < 500){
             appendElements(coin)
            }
        })
    }
   else if(priceSelection.value === `$500 to $1,000`){
        cryptoData.forEach((coin) => {
            if(coin.priceUsd > 500 && coin.priceUsd < 1000){
                appendElements(coin);
            };
        });
    }
    else if(priceSelection.value === `Over $1,000`){
        cryptoData.forEach((coin) => {
            if(coin.priceUsd > 1000){
                appendElements(coin);
            };
        });
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
    const numberFormat = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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


        
     
    




   







