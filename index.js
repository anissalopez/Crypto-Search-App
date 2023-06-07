//DOM element selection to that will trigger event listeners 
const form = document.querySelector('#form');
const priceSelection = document.querySelector('#price-menu');
const clearSearch = document.querySelector('#clear');

//Event Listeners
form.addEventListener("submit", cryptoFetch);
priceSelection.addEventListener('change', cryptoFetch);
clearSearch.addEventListener('click', clearPage);


//fetch API function 
function cryptoFetch(e){
    //prevent form from resetting;
    e.preventDefault();
    fetch(`https://api.coincap.io/v2/assets`)
    .then(function (response){
        return response.json()
    })
    .then(function(data){
        let crypto = data
        searchHandler(crypto)
    });
};


//searchHandler
function searchHandler(crypto){
  let cryptoData = crypto['data'];
  const searchValue = document.querySelector('#search').value;
  form.reset();

    if(searchValue){
        for (let object of cryptoData){
            if (object.name.toLowerCase() === searchValue.toLowerCase()){
            appendElements(object);
             };
        };

    }
    else if(priceSelection.value === `Under $500`){
        for(let object of cryptoData){
            if(object.priceUsd < 500){appendElements(object)
             };
        };
    }
   else if(priceSelection.value === `$500 to $1,000`){
        for(let object of cryptoData){
            if(object.priceUsd > 500 && object.priceUsd < 1000){ appendElements(object)
            };
        };
     }
    else if(priceSelection.value === `Over $1,000`){
         for(let object of cryptoData){
             if(object.priceUsd > 1000){ appendElements(object)
             };
         };
     };
 };


//function to handle the appending of Elements to the DOM
 function appendElements(object){
    console.log(object);
    
    let coinDiv = document.querySelector('#coinDiv');
    let coinName = document.createElement('p');
    
    let coinSymbol = document.createElement('p');
    let coinPrice = document.createElement('p');
    coinName.classList.add('second-color');
  
    //formatting coin Price
    let price = object['priceUsd'];
    let formattedPrice = Number(price).toFixed(2);
    let formattedValue = formattedPrice > 999 ? numberFormat(formattedPrice) : formattedPrice;

    //assigning dom elements respective text value 
    coinName.textContent = `Coin Name: ${object.name}`;
    coinSymbol.textContent = `Coin Symbol: ${object.symbol}`;
    coinPrice.textContent = `Current Price: $${formattedValue}`;
        
    //appending elements to the DOM   
    coinDiv.appendChild(coinName);
    coinDiv.appendChild(coinSymbol);
    coinDiv.appendChild(coinPrice);
  
    //add another event listener to coin name so that User can see prior day price when they hover over name of Bitcoin
   coinName.addEventListener('mouseover', (event) => {
    coinName.title = object['changePercent24Hr'];
   });
 };

 //function to clear page

 function clearPage(e){
    let coinDiv = document.querySelector('#coinDiv');
    coinDiv.innerHTML = "";
}

//function using regex pattern to search the string and put a comma where it finds 3 consecutive digits 
function numberFormat(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
        
     
    




   







