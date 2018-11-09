$(document).ready(function () {

    $("#inputsm").val("");

    // function runSearch(recipeSearch) {

    //     var recipeData = [];
    //     var recipes = [];
    //     var cardNum = ["#card-one", "#card-two", "#card-three"];

    //     //API for food2fork.com

    //     var foodURLBase = "https://www.food2fork.com/api/search?key=70681d58b1a383e9f04015562d23961c&q=" + recipeSearch + "&sort=r";

    //     $.ajax({
    //         url: foodURLBase,
    //         method: "GET"
    //     }).then(function (data) {
    //         // console.log(data);

    //         recipeData.splice(0, 1, JSON.parse(data));
    //         recipes = recipeData[0].recipes;
    //         console.log(recipeData);

    //         if (recipes.length === 0) {
    //             alert("There is no recipe for " + recipeSearch + "search.");
    //             return;
    //         }
    //         for (var i = 0; i < cardNum.length; i++) {
    //             $(cardNum[i] + " #card-header").text(recipes[i].title);
    //             $(cardNum[i] + " img").attr("src", recipes[i].image_url);
    //             $(cardNum[i] + " #card-publisher").text("Published by " + recipes[i].publisher);
    //             $(cardNum[i] + " #card-rating").text("Rating is " + parseInt(recipes[i].social_rank) + "%");
    //             $(cardNum[i] + " #card-link").text(recipes[i].source_url);
    //             $(cardNum[i] + " #card-link").attr("href", recipes[i].source_url);
    //         }
    //     })
    // }

    //API for Zomato

    function searchTwo(recipeSearch) {

        var cityID = "305"; // Boulder = 11184, Denver = 305, CO Springs = 529
        var restaurantCard = ["#rest-card-one", "#rest-card-two", "#rest-card-three"];
        var restaurantURLBase = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=10&radius=5&cuisines=" + recipeSearch + "&sort=cost&order=asc"

        
        $.ajax({
            url: restaurantURLBase,
            headers: { "user-key": "232c5ded3389a0e20cc30d26fc948a4c" },
            method: "GET"
        }).then(function (response) {
            //console.log(response);

            console.log(response.restaurants);

            for (var i = 0; i < restaurantCard.length; i++) {
                $(restaurantCard[i] + " #rest-card-header").text(response.restaurants[i].restaurant.name);
                $(restaurantCard[i] + " img").attr("src", response.restaurants[i].restaurant.thumb);
                $(restaurantCard[i] + " #rest-card-rating").text("Rating is " + response.restaurants[i].restaurant.user_rating.rating_text);
                $(restaurantCard[i] + " #rest-card-address").text(response.restaurants[i].restaurant.location.address);
                $(restaurantCard[i] + " #rest-card-cost").text("Average Cost For Two: $" + response.restaurants[i].restaurant.average_cost_for_two);
                
            }

        });


    }
    $("button").on("click", function () {
        var recipeSearch = $("#inputsm").val().trim();
        //runSearch(recipeSearch);
        searchTwo(recipeSearch);
    })

    var mymap = L.map('mapid').setView([39.7392, -104.9903], 13);
         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGVyYnN0cGgiLCJhIjoiY2pvNTN0Ym84MDV6ZzNwczFwb3k1MWx3NiJ9.UOgaM2aU2GE_fjRMDnQglw', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: 'mapbox.streets',
         accessToken: 'your.mapbox.access.token'
         }).addTo(mymap);
         
         var lollicup = L.marker([39.7470250000, -104.8515333333]).addTo(mymap);
             cherryCricket = L.marker([39.7194800000, -104.9567300000]).addTo(mymap);
             lucilesCreoleCafe = L.marker([39.7115277778, -104.9829472222]).addTo(mymap);
             jerusalemRestaurant = L.marker([39.6783333333, -104.9656833333]).addTo(mymap);
             jellyCafe = L.marker([39.7367800000, -104.9797100000]).addTo(mymap);
             crêpesNCrêpes = L.marker([39.7208361111, -104.9542472222]).addTo(mymap);
             littleManIceCream = L.marker([39.7595722222, -105.0111694444]).addTo(mymap);
             petesKitchen = L.marker([39.7399027778, -104.9635388889]).addTo(mymap);
             bigBills = L.marker([39.5668194444, -104.9241250000]).addTo(mymap);
             vineStreetPub = L.marker([39.7434166667, -104.9619916667]).addTo(mymap);
         
         

         lollicup.bindPopup("<a href= 'http://lollicupdenver.com'>Lollicup</a>").openPopup();
         cherryCricket.bindPopup("<a href= 'https://cherrycricket.com/'>Cherry Cricket</a>").openPopup();
         lucilesCreoleCafe.bindPopup("<a href= 'https://www.luciles.com/'>Lucile's Creole Cafe</a>").openPopup();
         jerusalemRestaurant.bindPopup("<a href= 'http://www.jerusalemrestaurant.com/'>Jerusalem Restaurant</a>").openPopup();
         jellyCafe.bindPopup("<a href= 'http://www.eatmorejelly.com/'>Jelly Cafe</a>").openPopup();
         crêpesNCrêpes.bindPopup("<a href= 'http://crepesncrepes.net/'>Crêpes 'n Crêpes</a>").openPopup();
         littleManIceCream.bindPopup("<a href= 'http://www.littlemanicecream.com/>Little Man Ice Cream</a>").openPopup();
         petesKitchen.bindPopup("<a href= 'http://www.petesrestaurants.com/PetesKitchen.html'>Pete's Kitchen</a>").openPopup();
         bigBills.bindPopup("<a href= 'http://http://www.bigbillsnypizza.com/'>Big Bill's</a>").openPopup();
         vineStreetPub.bindPopup("<a href= 'http://www.mountainsunpub.com/locations.php'>Vine Street Pub</a>").openPopup();
        
         var popup = L.popup();

         function onMapClick(e) {
         popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
        }

        mymap.on('click', onMapClick);

});