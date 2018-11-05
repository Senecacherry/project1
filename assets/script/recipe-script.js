

$(document).ready(function () {
    $("#inputsm").val("");


    function runSearch(recipeSearch) {
        var recipeData = [];
        var recipes = [];
        var cardNum = [".card-one", ".card-two", ".card-three"];

        //API for food2fork.com
        var foodURLBase = "https://www.food2fork.com/api/search?key=70681d58b1a383e9f04015562d23961c&q=" + recipeSearch + "&sort=r";

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
                $(cardNum[i] + " .card-header").text(recipes[i].title);
                $(cardNum[i] + " img").attr("src", recipes[i].image_url);
                $(cardNum[i] + " .card-publisher").text("Published by " + recipes[i].publisher);
                $(cardNum[i] + " .card-rating").text("Rating is " + parseInt(recipes[i].social_rank) + "%");
                $(cardNum[i] + " .card-link").text(recipes[i].source_url);
                $(cardNum[i] + " .card-link").attr("href", recipes[i].source_url);
            }
        })
    }

    $("button").on("click", function () {
        var recipeSearch = $("#inputsm").val().trim();
        runSearch(recipeSearch);
    })
})

