

// --------------------- Date Calculation ------------------//

function calculateDaysBetweenDates(dateString1, dateString2) {
        // Parse the date strings into Date objects
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);
      
        // Calculate the time difference in milliseconds
        const timeDifference = Math.abs(date2 - date1);
      
        // Calculate the number of days, including all days between the two dates
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        return daysDifference;
}
     
let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

let amenitiesid = {
    
2  :     'Kitchen',
4  :     'Wifi',
5  :     'Air conditioning',
7  :     'Pool',
8  :     'Kitchen',
9  :     'Free parking on premises',
11 :     'Smoking allowed',
12 :     'Pets allowed',
15 :     'Gym',
16 :     'Breakfast',
21 :     'Elevator',
25 :     'Hot tub',
27 :     'Indoor fireplace',
30 :     'Heating',
33 :     'Washer',
34 :     'Dryer',
35 :     'Smoke alarm',
36 :     'Carbon monoxide alarm',
41 :     'Shampoo',
44 :     'Hangers',
45 :     'Hair dryer',
46 :     'Iron',
47 :     'Laptop-friendly workspace',
51 :     'Self check-in',
58 :     'TV',
64 :     'High chair',
78 :     'Private bathroom',
109 :    'Wide hallways',
110 :   ' No stairs or steps to enter',
111 :    'Wide entrance for guests',
112 :    'Step-free path to entrance',
113 :    'Well-lit path to entrance',
114 :    'Disabled parking spot',
115 :    'No stairs or steps to enter',
116 :    'Wide entrance',
117 :    'Extra space around bed',
118 :    'Accessible-height bed',
120 :    'No stairs or steps to enter',
121 :    'Wide doorway to guest bathroom',
123 :    'Bathtub with bath chair',
125 :    'Accessible-height toilet',
127 :    'No stairs or steps to enter',
128 :    'Wide entryway',
136 :   ' Handheld shower head',
286 :   ' Crib',
288 :    'Electric profiling bed',
289 :    'Mobile hoist',
290 :    'Pool with pool hoist',
291 :    'Ceiling hoist',
294 :   ' Fixed grab bars for shower',
295 :    'Fixed grab bars for toilet',
296 :    'Step-free shower',
297 :    'Shower chair',
347 :   ' Piano',
608 :    'Extra space around toilet',
609 :    'Extra space around shower',
}


let userData = [];


// ------------------Map------------------------//

function initMap() {
  // Create a map object and specify the DOM element for the map
  var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.812531, lng: 86.155807 }, // Set the initial map center
      zoom: 10 // Set the initial zoom level
  });

}








// -----------------Fetching Data from server----------------//

function getData(location,checkIn,checkOut,adultGuest,chidrenGuest,infantGuest,petGuest) {
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkIn}&checkout=${checkOut}&adults=${adultGuest}&children=${chidrenGuest}&infants=${infantGuest}&pets=${petGuest}&page=1&currency=USD`;
     const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': '249479aeb1msh08c923ea860a10dp1064cfjsn6e116865fd58',
    		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    	}
    };

    async function fetchData(){
      try {
    	const response = await fetch(url, options);
    	const result = await response.json();
        console.log(result);
        details(result.results);
    } catch (error) {
    	console.error(error);
    }  
    }

    fetchData();
}






// --------------------------Render Cards Page1--------------------------- //

function fetchData1(){
//Redirecting from page 1 to page 2

var location = document.getElementById('class5000input').value.trim();
var check_in = document.getElementById('checkin-date-display').textContent;
var check_out = document.getElementById('checkout-date-display').textContent;
var adultGuests = document.getElementById('adults-count').textContent;
var childrenGuests = document.getElementById('children-count').textContent;
var infantGuests = document.getElementById('infants-count').textContent;
var petGuests = document.getElementById('pets-count').textContent;


if(location === '' || location === null){
    location = 'Sikkim';
}

if(check_in === check_out){
    alert(`Please select different dates`);
    return;
}



userData [0] = location;
userData [1] = calculateDaysBetweenDates(check_in, check_out);
userData [2] = adultGuests + childrenGuests;
userData [3] = check_in;
userData [4] = check_out;

getData(location,check_in,check_out,adultGuests,childrenGuests,infantGuests,petGuests)

let checkin = check_in.split("-");
let checkout = check_out.split("-");

document.getElementById("page1").style.display = 'none';
document.getElementById("page2").style.display = "flex";
document.getElementById("page3").style.display = "none";

document.getElementById("location-page2").textContent = location;
document.getElementById("date-page2").textContent = checkin[2]+" "+month[Number(checkin[1]-1)]+ " - " +checkout[2]+" "+month[Number(checkout[1]-1)];
document.getElementById("guests-page2").textContent = Number(adultGuests)+Number(childrenGuests)+" guests";

}


function details(data){
    const renderCards = document.getElementById("cards-wrapper");
    const roomDetails = document.getElementById("text");


    roomDetails.innerHTML = `<div class="text-wrapper" id="text-wrapper">
    <span>${data.length}+</span> stays in <span>Bordeaux</span>
    </div>`




    for (let i=0;i<data.length ;i++){

        var amenities = data[i].previewAmenities;
        var amenityList="";
        for(let j=0;j<amenities.length;j++){
            amenityList += amenities[j];
            if(amenities.length-1){
                amenityList+= " - ";
            }
        }
        
    

        renderCards.innerHTML += `<div class="cards" id="cards" onclick="renderPage(${i})">
        <div class="cards-image">
            <img src="${data[i].images[0]}" alt="images">
        </div>
        <div class="details">
            <div class="location-details">
                <div class="location-details-spec">
                    <div class="location-property-status">${data[i].type} in ${data[i]. address.split(",")[0]}</div>
                    <div class="location-actual">${data[i].address}</div>
                </div>
                <div class="location-like-icon">
                    <img src="asset-like-icon.svg" alt="" width="32px">
                </div>
            </div>
            <div class="location-amenities">
                <div>
                    <p>${data[i].persons} guests · ${data[i].type} · ${data[i].beds} beds · ${data[i].bathrooms} bath</p>
                    <p>${amenities}</p>
                </div>
                <div></div>
            </div>
            <div class="location-review">
                <div class="location-ratings">
                    <div class="location-ratings-container">
                        <span>${data[i].rating} </span>
                        <img src="asset-star.png" alt=""> 
                        <span>(${data[i].reviewsCount})</span>
                    </div>
                </div>
                <div class="location-price">
                    $ <span>${data[i].price.priceItems[0].amount}</span> /night
                </div>
            </div>
            
        </div>                      
        </div>`
    }


    initMap();
}

/*-------------------- Guest Button and Dropdown  Page 1--------------------*/

function toggleGuestDropdown() {
    var guestsDropdown = document.getElementById("guestsDropdown");
    if (guestsDropdown.style.display === "block") {
        guestsDropdown.style.display = "none";
    } else {
        guestsDropdown.style.display = "block";
    }
}

function toggleInactive(){
    var guestsDropdown = document.getElementById("guestsDropdown");
    if (guestsDropdown.style.display === "block") {
        guestsDropdown.style.display = "none";
    }
}

// Function to increment the guest count Page1
var noOfGuests = 0;
function incrementGuest(guestType) {
    var guestCount = document.getElementById(guestType + "-count");
    var count = parseInt(guestCount.textContent);
    var numberOfGuests = count + 1;
    noOfGuests+=1;
    guestCount.textContent = numberOfGuests;
    document.getElementById("guests-button").textContent = noOfGuests +" Guest";
}

// Function to decrement the guest count Page1
function decrementGuest(guestType) {
    var guestCount = document.getElementById(guestType + "-count");
    var count = parseInt(guestCount.textContent);
    if (count > 0) {
        guestCount.textContent = count - 1;
        noOfGuests-=1;
        document.getElementById("guests-button").textContent = noOfGuests +" Guest";
    }
}

// Location Search Function Page1

function searchClear() {
    var input = document.getElementById("class5000input");
    var clearButton = document.getElementById("class5000clear-icon");

    if (input.value !== "") {
        clearButton.style.display = "block"; // Show the clear button
    } else {
        clearButton.style.display = "none"; // Hide the clear button
    }
}


// Function to clear the input field Page1
function clearInput() {
    var input = document.getElementById("class5000input");
    input.value = ""; // Clear the input field
    document.getElementById("class5000clear-icon").style.display = "none"; // Hide the clear button again
}

// -Date range Selector Page1//

$(document).ready(function() {
    const checkinDateDisplay = $('#checkin-date-display');
    const checkoutDateDisplay = $('#checkout-date-display');

    $('#checkin-btn').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        minDate: moment().startOf('day'),
        locale: {
            format: 'YYYY-MM-DD',
        }
    }, function(start) {
        checkinDateDisplay.text(start.format('YYYY-MM-DD'));
    });

    $('#checkout-btn').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        minDate: moment().startOf('day'),
        locale: {
            format: 'YYYY-MM-DD',
        }
    }, function(start) {
        checkoutDateDisplay.text(start.format('YYYY-MM-DD'));
    });

    checkinDateDisplay.on('click', function() {
        $(this).text('Add dates');
    });

    checkoutDateDisplay.on('click', function() {
        $(this).text('Add dates');
    });
});








// --------------------------Render Cards Page2--------------------------- //

function fetchData1Page2(){
    //Redirecting from page 1 to page 2
    
    var location = document.getElementById('class5000inputPage2').value.trim();
    var check_in = document.getElementById('checkin-date-displayPage2').textContent;
    var check_out = document.getElementById('checkout-date-displayPage2').textContent;
    var adultGuests = document.getElementById('adults-countPage2').textContent;
    var childrenGuests = document.getElementById('children-countPage2').textContent;
    var infantGuests = document.getElementById('infants-countPage2').textContent;
    var petGuests = document.getElementById('pets-countPage2').textContent;
    
   
    if(location === '' || location === null){
        location = 'Sikkim';
    }
    
    if(check_in === check_out){
        alert(`Please select different dates`);
        return;
    }
    
    let checkin = check_in.split("-");
    let checkout = check_out.split("-");
    
    document.getElementById("location-page2").textContent = location;
    document.getElementById("date-page2").textContent = checkin[2]+" "+month[Number(checkin[1]-1)]+ " - " +checkout[2]+" "+month[Number(checkout[1]-1)];
    document.getElementById("guests-page2").textContent = Number(adultGuests)+Number(childrenGuests)+" guests";
    
    
    // function details(data){
    //     const renderCards = document.getElementById("cards-wrapper");
    //     const roomDetails = document.getElementById("text");
    
    
    //     roomDetails.innerHTML = `<div class="text-wrapper" id="text-wrapper">
    //     <span>${data.length}+</span> stays in <span>Bordeaux</span>
    //     </div>`
    
    
    
    
    //     for (let i=0;i<data.length ;i++){
    
    //         var amenities = data[i].previewAmenities;
    //         var amenityList="";
    //         for(let j=0;j<amenities.length;j++){
    //             amenityList += amenities[j];
    //             if(amenities.length-1){
    //                 amenityList+= " - ";
    //             }
    //         }
            
        
    
    //         renderCards.innerHTML += `<div class="cards" id="cards" onclick="renderPage(${i})">
    //         <div class="cards-image">
    //             <img src="${data[i].images[0]}" alt="images">
    //         </div>
    //         <div class="details">
    //             <div class="location-details">
    //                 <div class="location-details-spec">
    //                     <div class="location-property-status">${data[i].type} in ${data[i]. address.split(",")[0]}</div>
    //                     <div class="location-actual">${data[i].address}</div>
    //                 </div>
    //                 <div class="location-like-icon">
    //                     <img src="asset-like-icon.svg" alt="" width="32px">
    //                 </div>
    //             </div>
    //             <div class="location-amenities">
    //                 <div>
    //                     <p>${data[i].persons} guests · ${data[i].type} · ${data[i].beds} beds · ${data[i].bathrooms} bath</p>
    //                     <p>${amenities}</p>
    //                 </div>
    //                 <div></div>
    //             </div>
    //             <div class="location-review">
    //                 <div class="location-ratings">
    //                     <div class="location-ratings-container">
    //                         <span>${data[i].rating} </span>
    //                         <img src="asset-star.png" alt=""> 
    //                         <span>(${data[i].reviewsCount})</span>
    //                     </div>
    //                 </div>
    //                 <div class="location-price">
    //                     $ <span>${data[i].price.priceItems[0].amount}</span> /night
    //                 </div>
    //             </div>
                
    //         </div>                      
    //     </div>`
    //     }
    
    
    //     initMap();
    // }
    
      
    //   details(results);
}

/*-------------------- Guest Button and Dropdown  Page 2--------------------*/

function toggleGuestDropdownPage2() {
    var guestsDropdown = document.getElementById("guestsDropdownPage2");
    if (guestsDropdown.style.display === "block") {
        guestsDropdown.style.display = "none";
    } else {
        guestsDropdown.style.display = "block";
    }
}

function toggleInactivePage2(){
    var guestsDropdown = document.getElementById("guestsDropdownPage2");
    if (guestsDropdown.style.display === "block") {
        guestsDropdown.style.display = "none";
    }
}

// Function to increment the guest count
noOfGuests = 0;
function incrementGuestPage2(guestTypePage2) {
    var guestCount = document.getElementById(guestTypePage2 + "-countPage2");
    var countPage2 = parseInt(guestCount.textContent);
    guestCount.textContent = countPage2 + 1;
    noOfGuests+=1;
    document.getElementById("guests-buttonPage2").textContent = noOfGuests +" Guest";
}

// Function to decrement the guest count
function decrementGuestPage2(guestTypePage2) {
    var guestCount = document.getElementById(guestTypePage2 + "-countPage2");
    var countPage2 = parseInt(guestCount.textContent);
    if (countPage2 > 0) {
        guestCount.textContent = countPage2 - 1;
        noOfGuests+=1;
        document.getElementById("guests-buttonPage2").textContent = noOfGuests +" Guest";
    }
}

// ------------------------Location Search Function Page2 ---------------------------//


function searchClearPage2() {
    var input = document.getElementById("class5000inputPage2");
    var clearButton = document.getElementById("class5000clear-iconPage2");

    if (input.value !== "") {
        clearButton.style.display = "block"; // Show the clear button
    } else {
        clearButton.style.display = "none"; // Hide the clear button
    }
}

// Function to clear the input field
function clearInputPage2() {
    var input = document.getElementById("class5000inputPage2");
    input.value = ""; // Clear the input field
    document.getElementById("class5000clear-iconPage2").style.display = "none"; // Hide the clear button again
}

// Date range Selector

$(document).ready(function() {
    const checkinDateDisplay = $('#checkin-date-displayPage2');
    const checkoutDateDisplay = $('#checkout-date-displayPage2');

    $('#checkin-btnPage2').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        minDate: moment().startOf('day'),
        locale: {
            format: 'YYYY-MM-DD',
        }
    }, function(start) {
        checkinDateDisplay.text(start.format('YYYY-MM-DD'));
    });

    $('#checkout-btnPage2').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        minDate: moment().startOf('day'),
        locale: {
            format: 'YYYY-MM-DD',
        }
    }, function(start) {
        checkoutDateDisplay.text(start.format('YYYY-MM-DD'));
    });

    checkinDateDisplay.on('click', function() {
        $(this).text('Add dates');
    });

    checkoutDateDisplay.on('click', function() {
        $(this).text('Add dates');
    });
});

// Toggle search bar

function toggleSearchBarPage2() {
    let searchBar = document.getElementById("search-container-page2");
    if(searchBar.style.display === 'none'){
        searchBar.style.display = 'flex';
    }
    else{
        searchBar.style.display = 'none'
    }
}








// Page 3
function fetchData1Page3(){
    //Redirecting from page 3 to page 2
    
    var location = document.getElementById('class5000inputPage3').value.trim();
    var check_in = document.getElementById('checkin-date-displayPage3').textContent;
    var check_out = document.getElementById('checkout-date-displayPage3').textContent;
    var adultGuests = document.getElementById('adults-countPage3').textContent;
    var childrenGuests = document.getElementById('children-countPage3').textContent;
    var infantGuests = document.getElementById('infants-countPage3').textContent;
    var petGuests = document.getElementById('pets-countPage3').textContent;
    
    
    if(location === '' || location === null){
        location = 'Sikkim';
    }
    
    if(check_in === check_out){
        alert(`Please select different dates`);
        return;
    }
    
    let checkin = check_in.split("-");
    let checkout = check_out.split("-");
    
    

    
    document.getElementById("location-page3").textContent = location;
    document.getElementById("date-page3").textContent = checkin[2]+" "+month[Number(checkin[1]-1)]+ " - " +checkout[2]+" "+month[Number(checkout[1]-1)];
    document.getElementById("guests-page3").textContent = Number(adultGuests)+Number(childrenGuests)+" guests";
    
    
    // function details(data){
    //     const renderCards = document.getElementById("cards-wrapper");
    //     const roomDetails = document.getElementById("text");
    
    
    //     roomDetails.innerHTML = `<div class="text-wrapper" id="text-wrapper">
    //     <span>${data.length}+</span> stays in <span>Bordeaux</span>
    //     </div>`
    
    
    
    
    //     for (let i=0;i<data.length ;i++){
    
    //         var amenities = data[i].previewAmenities;
    //         var amenityList="";
    //         for(let j=0;j<amenities.length;j++){
    //             amenityList += amenities[j];
    //             if(amenities.length-1){
    //                 amenityList+= " - ";
    //             }
    //         }
            
        
    
    //         renderCards.innerHTML += `<div class="cards" id="cards" onclick="renderPage(${i})">
    //         <div class="cards-image">
    //             <img src="${data[i].images[0]}" alt="images">
    //         </div>
    //         <div class="details">
    //             <div class="location-details">
    //                 <div class="location-details-spec">
    //                     <div class="location-property-status">${data[i].type} in ${data[i]. address.split(",")[0]}</div>
    //                     <div class="location-actual">${data[i].address}</div>
    //                 </div>
    //                 <div class="location-like-icon">
    //                     <img src="asset-like-icon.svg" alt="" width="32px">
    //                 </div>
    //             </div>
    //             <div class="location-amenities">
    //                 <div>
    //                     <p>${data[i].persons} guests · ${data[i].type} · ${data[i].beds} beds · ${data[i].bathrooms} bath</p>
    //                     <p>${amenities}</p>
    //                 </div>
    //                 <div></div>
    //             </div>
    //             <div class="location-review">
    //                 <div class="location-ratings">
    //                     <div class="location-ratings-container">
    //                         <span>${data[i].rating} </span>
    //                         <img src="asset-star.png" alt=""> 
    //                         <span>(${data[i].reviewsCount})</span>
    //                     </div>
    //                 </div>
    //                 <div class="location-price">
    //                     $ <span>${data[i].price.priceItems[0].amount}</span> /night
    //                 </div>
    //             </div>
                
    //         </div>                      
    //     </div>`
    //     }
    
    
    //     initMap();
    // }
    
      
    //   details(results);
}

/*-------------------- Guest Button and Dropdown  Page 3--------------------*/

function toggleGuestDropdownPage3() {
    var guestsDropdown = document.getElementById("guestsDropdownPage3");
    if (guestsDropdown.style.display === "block") {
        guestsDropdown.style.display = "none";
    } else {
        guestsDropdown.style.display = "block";
    }
}

function toggleInactivePage3(){
    var guestsDropdown = document.getElementById("guestsDropdownPage3");
    if (guestsDropdown.style.display === "block") {
        guestsDropdown.style.display = "none";
    }
}

// Function to increment the guest count
noOfGuests = 0;
function incrementGuestPage2(guestTypePage3) {
    var guestCount = document.getElementById(guestTypePage3 + "-countPage3");
    var countPage3 = parseInt(guestCount.textContent);
    guestCount.textContent = countPage3 + 1;
    noOfGuests+=1;
    document.getElementById("guests-buttonPage2").textContent = noOfGuests +" Guest";
}

// Function to decrement the guest count
function decrementGuestPage3(guestTypePage3) {
    var guestCount = document.getElementById(guestTypePage3 + "-countPage2");
    var countPage3 = parseInt(guestCount.textContent);
    if (countPage3 > 0) {
        guestCount.textContent = countPage3 - 1;
        noOfGuests+=1;
        document.getElementById("guests-buttonPage3").textContent = noOfGuests +" Guest";
    }
}

// ------------------------Location Search Function Page3 ---------------------------//


function searchClearPage3() {
    var input = document.getElementById("class5000inputPage3");
    var clearButton = document.getElementById("class5000clear-iconPage3");

    if (input.value !== "") {
        clearButton.style.display = "block"; // Show the clear button
    } else {
        clearButton.style.display = "none"; // Hide the clear button
    }
}

// Function to clear the input field
function clearInputPage3() {
    var input = document.getElementById("class5000inputPage3");
    input.value = ""; // Clear the input field
    document.getElementById("class5000clear-iconPage3").style.display = "none"; // Hide the clear button again
}

// Date range Selector

$(document).ready(function() {
    const checkinDateDisplay = $('#checkin-date-displayPage3');
    const checkoutDateDisplay = $('#checkout-date-displayPage3');

    $('#checkin-btnPage3').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        minDate: moment().startOf('day'),
        locale: {
            format: 'YYYY-MM-DD',
        }
    }, function(start) {
        checkinDateDisplay.text(start.format('YYYY-MM-DD'));
    });

    $('#checkout-btnPage3').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        minDate: moment().startOf('day'),
        locale: {
            format: 'YYYY-MM-DD',
        }
    }, function(start) {
        checkoutDateDisplay.text(start.format('YYYY-MM-DD'));
    });

    checkinDateDisplay.on('click', function() {
        $(this).text('Add dates');
    });

    checkoutDateDisplay.on('click', function() {
        $(this).text('Add dates');
    });
});

// Toggle search bar

function toggleSearchBarPage3() {
    let searchBar = document.getElementById("search-container-page2");
    if(searchBar.style.display === 'none'){
        searchBar.style.display = 'flex';
    }
    else{
        searchBar.style.display = 'none'
    }
}





//Method for data transfer 

function renderPage(index) {

    document.getElementById("page1").style.display = 'none';
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "flex";
    const dataObject = results[index];
    var superhostPage3 ;
    

    document.getElementById("property-detailPage3").innerHTML = `<div class="property-detail" id="property-detail"> 
    <div class="property-detail-Name" id="property-detail-NamePage3">${dataObject.name}</div>
    <div class="reviews-Ratings">
        <div class="reviews-Ratings-location">
            <img src="asset-rating.png" alt="">
            <span>${dataObject.rating} - ${dataObject.reviewsCount} reviews - </span>
            <span  id="isSuperHost">
                <img src="asset-superhostBadge.png" alt="">
                <span>Superhost -</span>
            </span>
            <span>  ${dataObject.address}</span>
        </div>
        <div class="share-Save">
            <img src="asset-share.png" alt=""><span>Share</span><img src="asset-save.png" alt=""><span>Save</span>
        </div>
    </div>
</div>`

if(!dataObject.isSuperhost){
    console.log(document.getElementById("isSuperHost"));
    document.getElementById("isSuperHost").style.display = 'none';
}



document.getElementById("imagesPage3").innerHTML = `<div id="img-2" style="background-image: url(${dataObject.images[0]});" ></div>
<div id="img-1" style="background-image: url(${dataObject.images[1]});"></div>
<div id="img-3" style="background-image: url(${dataObject.images[2]});"></div>
<div id="img-4" style="background-image: url(${dataObject.images[3]});"></div>
<div id="img-5" style="background-image: url(${dataObject.images[4]});"></div>`




document.getElementById("wrapper-left-descPage3").innerHTML = `<div class="container-left-desc">
<div class="container-left-desc-child1">Entire rental unit hosted by</div>
<div class="container-left-desc-child2">2 guests - ${dataObject.bedrooms} bedroom - ${dataObject.beds} bed - ${dataObject.bathrooms} bath</div>
</div>
<div class="container-right-desc">
<img src="${dataObject.hostThumbnail}" alt="">
</div>`



document.getElementById("wrapper-left-desc1-child").innerHTML = `<div><img src="asset-calendar.png" alt=""></div>
<div class="details-apartment-t">${dataObject.cancelPolicy}</div>`


for(let i=0;i<dataObject.amenityIds.length;i++){
   console.log(amenitiesid[Number(dataObject.amenityIds[i])]) ;
    if(amenitiesid[Number(dataObject.amenityIds[i])] !== undefined && i%2==0) {
        document.getElementById("class300base200").innerHTML += `<div class="class300base200base1000" id="class300base200base1000">
        <div><img src="Icon (2).png" alt=""></div>
        <div>${amenitiesid[Number(dataObject.amenityIds[i])]}</div>
        </div>`
        
    }
    else if(amenitiesid[Number(dataObject.amenityIds[i])] !== undefined){
        document.getElementById("class300base200Page3").innerHTML += `<div class="class300base200base1000" id="class300base200base1000">
        <div><img src="Icon (2).png" alt=""></div>
        <div>${amenitiesid[Number(dataObject.amenityIds[i])]}</div>
        </div>`
    }
   
}


document.getElementById("class-2").innerHTML = `<div class="class-3">
<div>$ ${dataObject.price.priceItems[0].amount} / night</div>
<div><img src="asset-rating.png" alt=""><span> ${dataObject.rating} - ${dataObject.reviewsCount} reviews</span></div>
</div>

<div class="class-4">

<div class="base1-class-4">
    <div class="base20-class-4">
        <p>check-in</p>
        <p>${userData[3]}</p>
    </div>
    <div class="base21-class-4">
        <p>check-out</p>
        <p>${userData[4]}</p>
    </div>
</div>

<div class="base10-class-4">
    <div class="base11-class-4">
        <p>Guests</p>
        <p>${userData[2]} guests</p>
    </div>
    <div class="base12-class-4">
        <div>
            <img src="asset-chevron-down.png" alt="">
        </div>
    </div>
</div>

</div>

<div class="reserve-button">
    <span onclick="reserve()">Reserve</span>
</div>

<div class="price">
    <div class="bill-split">
        <div>$ ${dataObject.price.priceItems[0].amount} x ${userData[1]} nights</div>
        <div>$ ${dataObject.price.priceItems[0].amount * userData[1]}</div>
    </div>
    <div class="bill-split">
        <div>Weekly discount</div>
        <div>-$ 0</div>
    </div>
    <div class="bill-split">
        <div>Cleaning fee</div>
        <div>$ ${dataObject.price.priceItems[1].amount}</div>
    </div>
    <div class="bill-split">
        <div>Service fee</div>
        <div>$ ${dataObject.price.priceItems[2].amount}</div>
    </div>
    <div class="bill-split">
        <div>Occupancy taxes and fees</div>
        <div>$ ${dataObject.price.priceItems[3].amount}</div>
    </div>
    
</div>

<div class="bill-split total">
    <div>Total</div>
    <div>$ ${dataObject.price.priceItems[0].amount* userData[1] + dataObject.price.priceItems[1].amount + dataObject.price.priceItems[2].amount + dataObject.price.priceItems[3].amount}</div>
</div>`

}

function reserve () {
    alert("Booking Confirmed");
}