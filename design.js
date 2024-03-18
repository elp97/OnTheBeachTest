let hotelData = [{
id: 0,
name: "Iberostar Grand Salome", 
location: "Costa Adeje, Tenerife",
rating: 5,
startDate: "3rd July 2019",
duartion: 7,
departingLocation: "East Midlands",
price: 1136.50,
pictureURL: "hotel-image-1.png",
adultNo: 2, 
childrenNo: 2,
infantNo: 1,
descriptionShowing: false,
description: "Experience the pinnacle of luxury at the 5-star Iberostar Grand Salome. Situated in the heart of Tenerife, our esteemed resort is a haven of sophistication and indulgence. From the moment you step into our elegant lobby, you'll be enveloped in a world of opulence and refinement."
},
{
id: 1,
name: "Aguamarina Golf Hotel", 
location: "Costa Adeje, Tenerife",
rating: 4,
startDate: "27th May 2019",
duartion: 7,
departingLocation: "Liverpool",
price: 696.80,
pictureURL: "hotel-image-2.png",
adultNo: 2, 
childrenNo: 1,
infantNo: 0,
descriptionShowing: false,
description: "With a championship golf course just steps away, Aguamarina Golf Hotel promises an unforgettable holiday experience tailored to perfection. Book your stay today and embark on a journey of relaxation and indulgence."
},
{
id: 2,
name: "Las Piramides Resort", 
location: "Costa Adeje, Tenerife",
rating: 3,
startDate: "3rd July 2019",
duartion: 7,
departingLocation: "Manchester",
price: 499.99,
pictureURL: "hotel-image-3.png",
adultNo: 2, 
childrenNo: 2,
infantNo: 0,
descriptionShowing: false,
description: "Nestled along the sun-kissed shores of Tenerife, our resort offers an enchanting retreat for guests of all ages. From the moment you arrive, you'll be greeted with warm smiles and unparalleled service, ensuring a memorable stay from start to finish."
}];


//when page is loaded, format data and add to screen
document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') {
        formatData();
    }
});

function changeSort(event) {
    let activeElements = document.getElementsByClassName("active-sort-btn");
    Array.from(activeElements).forEach(element => {
        element.classList.remove("active-sort-btn");
    });

    document.getElementById(event).classList.add("active-sort-btn");
    if (event === "alphabetically") {
        hotelData = hotelData.sort((a,b) => a.name.localeCompare(b.name));
    } else if (event === "rating") {
        hotelData = hotelData.sort((a,b) => b.rating - a.rating);
    } else {
        hotelData = hotelData.sort((a,b) => b.price - a.price);
    }
    formatData();
    
}

function changeText(hotelID) {
    hotelData[hotelID]["descriptionShowing"] = !hotelData[hotelID]["descriptionShowing"];
    const showHideText = hotelData[hotelID]["descriptionShowing"] ? "Less" : "More";
    const showHideIcon = hotelData[hotelID]["descriptionShowing"] ? "expand_more" : "chevron_right";
    const hotelDetails = document.getElementById(`hotel-summary-id-${hotelID}`);
    hotelDetails.innerHTML = `<b>Read ${showHideText}</b> about this hotel<i class="material-icons details-icon">${showHideIcon}</i>`;
}

function formatData() {
    const mainHotelSection = document.getElementById("hotel-section");
    mainHotelSection.innerHTML = "";

    hotelData.map(hotelItem => {
        const hotelSection = document.createElement('section'); 
        hotelSection.setAttribute("class", "hotel-item") 
        hotelSection.append(addHotelImage(hotelItem));
        hotelSection.append(addHotelInfoSection(hotelItem));
        hotelSection.append(addDescriptionDetails(hotelItem));
        mainHotelSection.append(hotelSection);
    })
}

function addHotelImage(hotelItem) {
    const hotelImg = document.createElement('img');
    hotelImg.setAttribute("src", `./assets/${hotelItem.pictureURL}`);
    hotelImg.setAttribute("class", "hotel-image");
    return hotelImg;
}

function addHotelInfoSection(hotelItem) {
    const hotelDetailsSection = document.createElement('section'); 
    hotelDetailsSection.setAttribute("class", "hotel-details");
    hotelDetailsSection.append(addHotelName(hotelItem));
    hotelDetailsSection.append(addLocationInfo(hotelItem));
    hotelDetailsSection.append(addRating(hotelItem));
    hotelDetailsSection.append(addPeopleInfo(hotelItem));
    hotelDetailsSection.append(addStayInfo(hotelItem));
    hotelDetailsSection.append(addLeavingInfo(hotelItem));
    hotelDetailsSection.append(addPriceBtn(hotelItem));
    return hotelDetailsSection;
}

function addHotelName(hotelItem) {
    const hotelName = document.createElement('p'); 
    hotelName.setAttribute("class", "hotel-name");
    hotelName.innerText = hotelItem.name;
    return hotelName;
}

function addLocationInfo(hotelItem) {
    const hotellocation = document.createElement('p'); 
    hotellocation.setAttribute("class", "hotel-location");
    hotellocation.innerText = hotelItem.location;
    return hotellocation;
}

function addRating(hotelItem) {
    const hotelRating = document.createElement('p'); 
    hotelRating.setAttribute("class", "hotel-rating");
    const hotelRatingStars = new Array(hotelItem.rating).fill('<i class="material-icons rating-icon">star</i>').join("");
    hotelRating.innerHTML = hotelRatingStars;
    return hotelRating;
}

function addPeopleInfo(hotelItem) {
    const hotelPeopleInfo = document.createElement('p'); 
    hotelPeopleInfo.setAttribute("class", "hotel-stay-details");   
    let adultText = "";
    if (hotelItem.adultNo > 1) {
        adultText += `<b>${hotelItem.adultNo}</b> adults`;
    } else if (hotelItem.adultNo === 1) {
        adultText += `<b>${hotelItem.adultNo}</b> adult`;
    }
    let childrenText = "";
    if (hotelItem.childrenNo > 1) {
        childrenText += `, <b>${hotelItem.childrenNo}</b> children`;
    } else if (hotelItem.childrenNo === 1) {
        childrenText += `, <b>${hotelItem.childrenNo}</b> child`;
    }
    let infantText = "";
    if (hotelItem.infantNo > 1) {
            infantText = ` & <b>${hotelItem.infantNo}</b> infants`;
    } else if (hotelItem.infantNo === 1) {
            infantText = ` & <b>${hotelItem.infantNo}</b> infant`;
    }
    hotelPeopleInfo.innerHTML = `${adultText}${childrenText}${infantText}</p>`;
    return hotelPeopleInfo;
}

function addStayInfo(hotelItem) {
    const hotelStayInfo= document.createElement('p'); 
    hotelStayInfo.setAttribute("class", "hotel-stay-details");
    hotelStayInfo.innerHTML = `<b>${hotelItem.startDate}</b> for <b>${hotelItem.duartion}</b> days</p>`;
    return hotelStayInfo;
}

function addLeavingInfo(hotelItem) {
    const hotelLeavingInfo = document.createElement('p'); 
    hotelLeavingInfo.setAttribute("class", "hotel-stay-details");
    hotelLeavingInfo.innerHTML = `departing from <b>${hotelItem.departingLocation}</b>`;
    return hotelLeavingInfo;
}

function addPriceBtn(hotelItem) {
    const priceBtn = document.createElement('button'); 
    priceBtn.setAttribute("class", "price-box");
    priceBtn.innerHTML = `<p class="price_book_now">Book Now</p><h2 class="price_box_price">£${hotelItem.price.toFixed(2)}</h2>`;
    return priceBtn;
}

function addDescriptionDetails(hotelItem) {
    const hotelDescriptionDetails = document.createElement('details'); 
    hotelDescriptionDetails.setAttribute("class", "hotel-description-details");
    hotelDescriptionDetails.append(addDescriptionSummary(hotelItem));
    hotelDescriptionDetails.append(addDescriptionSection(hotelItem));
    return hotelDescriptionDetails;
}

function addDescriptionSummary(hotelItem) {
    const hotelDescriptionSummary = document.createElement('summary');
    hotelDescriptionSummary.setAttribute("id", `hotel-summary-id-${hotelItem.id}`);
    hotelDescriptionSummary.setAttribute("class", `hotel-summary`);
    const showHideText = hotelItem.descriptionShowing ? "Less" : "More";
    const showHideIcon = hotelItem.descriptionShowing ? "expand_more" : "chevron_right";
    hotelDescriptionSummary.innerHTML = `<b>Read ${showHideText}</b> about this hotel<i class="material-icons details-icon">${showHideIcon}</i>`;
    hotelDescriptionSummary.onclick = function() {
        changeText(hotelItem.id);
    };
    return hotelDescriptionSummary;
}

function addDescriptionSection(hotelItem) {
    const hotelDescriptionSection = document.createElement('article');
    hotelDescriptionSection.setAttribute("class", "hotel-description-article");
    hotelDescriptionSection.innerHTML = `<p class="hotel-description-article-overview">Overview</p><p class="hotel-description-article-text">${hotelItem.description}</p>`;
    return hotelDescriptionSection;
}