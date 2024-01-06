const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn =  document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

//Importing all the countries from another js file and show it in dropdown menu.
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;

        //display default - USD
        if(select.name ==="from" && currCode ==="USD"){
            newOption.selected = "selected";
        }

        //display default - INR
        if(select.name ==="to" && currCode ==="INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

// Update Flag
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];    //IN,EU
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

//Get Conversion value
const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    //Edge case - if we keep it empty or give minus value it will set to 1.
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate;
    //1 USD = 80 INR
    msg.innerText = `${amtVal} ${fromCurr.value} = ${Math.round(finalAmount * 100)/100} ${toCurr.value}`;
}

//calling the conversion value
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

//load the USD to INR conversion value when start.
window.addEventListener("load",()=>{
    updateExchangeRate();
});