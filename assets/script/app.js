

//API for Zomato
var restaurantURLBase = "https://developers.zomato.com/api/v2.1/";
var userKey = "86ebc43c3d2c4d48e6b136ad3a9c2214"; //Jemmmy' key
var cityID = "305"; // Boulder = 11184, Denver = 305, CO Springs = 529
var cuisineIDs = [];
var cuisineNames = [];
var markers = [];


$(document).ready(function () {

    initCuisines();

    $("#cuisine-select").change(function () {
        clearMarkers(markers);
        var selectedIndx = parseInt($(this).children("option:selected").val());
        var cuisineName = cuisineNames[selectedIndx];
        var cuisineID = cuisineIDs[selectedIndx];
        restaurantSearch(cuisineID);
        recipeSearch(cuisineName);
    });

});

// function to get an array of available cuisine names and a matching array of the cuisine ids
function initCuisines() {
    var restaurantURLCuisine = restaurantURLBase + "cuisines?city_id=" + cityID;

    $.ajax({
        url: restaurantURLCuisine,
        headers: { "user-key": userKey },
        method: "GET"
    }).done(function (response) {
        console.log(response);

        for (var i = 0; i < response.cuisines.length; i++) {
            cuisineIDs.push(response.cuisines[i].cuisine.cuisine_id);
            cuisineNames.push(response.cuisines[i].cuisine.cuisine_name);
            $("#cuisine-select").append('<option value="' + i + '">' + response.cuisines[i].cuisine.cuisine_name + '</option>');

        }
    });
}

function restaurantSearch(cuisineID) {
    var restaurantCard = ["#rest-card-one", "#rest-card-two", "#rest-card-three"];
    var restaurantURLSearch = restaurantURLBase + "search?entity_id=" + cityID + "&entity_type=city&count=10&radius=5&cuisines=" + cuisineID + "&sort=cost&order=asc";




    $.ajax({
        url: restaurantURLSearch,
        headers: { "user-key": userKey },
        method: "GET"
    }).then(function (response) {

        console.log(response.restaurants);

        for (var i = 0; i < restaurantCard.length; i++) {
            $(restaurantCard[i] + " #card-name").text(response.restaurants[i].restaurant.name);
            $(restaurantCard[i] + " img").attr("src", response.restaurants[i].restaurant.thumb);
            $(restaurantCard[i] + " #rest-card-rating").text("Rating is " + response.restaurants[i].restaurant.user_rating.rating_text);
            $(restaurantCard[i] + " #rest-card-address").text(response.restaurants[i].restaurant.location.address);
            $(restaurantCard[i] + " #rest-card-cost").text("Average Cost For Two: $" + response.restaurants[i].restaurant.average_cost_for_two);

            //console.log(response.restaurants[i].restaurant.location.latitude);
            //console.log(response.restaurants[i].restaurant.location.longitude);
            console.log(response.restaurants[i].restaurant.name);
            console.log(response.restaurants[i].restaurant.url);
            var coordinates = [parseFloat(response.restaurants[i].restaurant.location.latitude), parseFloat(response.restaurants[i].restaurant.location.longitude)];
            var restName = (response.restaurants[i].restaurant.name);
            var restLink = (response.restaurants[i].restaurant.url);
            console.log("coordinates", coordinates);


            var marker = L.marker(coordinates, { icon: chefIcon }).addTo(mymap);
            marker.bindPopup("<a href=" + restLink + " target='_blank'>" + restName + "</a>");
            marker.openPopup();
            mymap.addLayer(marker);

            markers.push(marker);
        }
    });

}

function clearMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        this.mymap.removeLayer(markers[i]);
    }
}


function recipeSearch(cuisineName) {

    var recipeData = [];
    var recipes = [];
    var cardNum = ["#card-one", "#card-two", "#card-three"];

    //API for food2fork.com
    var foodURLBase = "https://www.food2fork.com/api/search?key=70681d58b1a383e9f04015562d23961c&q=" + cuisineName + "&sort=r";

    $.ajax({
        url: foodURLBase,
        method: "GET"
    }).then(function (data) {
        // console.log(data);

        recipeData.splice(0, 1, JSON.parse(data));
        recipes = recipeData[0].recipes;
        console.log(recipeData);

        if (recipes.length === 0) {
            alert("There is no recipe for " + recipeSearch + "search.");
            return;
        }
        for (var i = 0; i < cardNum.length; i++) {
            $(cardNum[i] + " #card-header").text(recipes[i].title);
            $(cardNum[i] + " img").attr("src", recipes[i].image_url);
            $(cardNum[i] + " #card-publisher").text("Published by " + recipes[i].publisher);
            $(cardNum[i] + " #card-rating").text("Rating is " + parseInt(recipes[i].social_rank) + "%");
            $(cardNum[i] + " #card-link").text(recipes[i].source_url);
            $(cardNum[i] + " #card-link").attr("href", recipes[i].source_url);
        }
    })
}



var mymap = L.map('mapid').setView([39.7392, -104.9903], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGVyYnN0cGgiLCJhIjoiY2pvNTN0Ym84MDV6ZzNwczFwb3k1MWx3NiJ9.UOgaM2aU2GE_fjRMDnQglw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var chefIcon = L.icon({
    iconUrl: 'https://cdn2.iconfinder.com/data/icons/departments/100/icon_department-food-512.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize: [38, 80], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [22, 80], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);

