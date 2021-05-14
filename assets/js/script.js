$(document).ready(function () {

    // array of session search history 
    var searchHistory = [];

    $("#search-button").on("click", function (event) {
        event.preventDefault();
        var band = $("#band-input").val();
        console.log("searched band", band);
        searchBand(band);
    })

    function searchBand(band) {
        var queryURL = "https://rest.bandsintown.com/artists/" + band + "?app_id=codingbootcamp";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // the searched band will be saved using the save search function
            saveSearch(band);

            $("#bands-view").empty();

            //test
            var list = $("<list>");
            list.attr("class", "list-group-item");
            $("#bands-view").append(list);

            var row = $("<div>");
            row.attr("class", "row");
            list.append(row);

            var col1 = $("<div>");
            col1.attr("class", "col-sm-4");
            row.append(col1);

            // var poster = $("<img>");
            // poster.attr("class", "img-thumbnail img-fluid w-100");
            // poster.attr("src", response.Poster);
            // poster.attr("alt", response.Title);
            // col1.append(poster);

            // var col2 = $("<div>");
            // col2.attr("class", "col-sm-8");
            // row.append(col2);

            // var head = $("<h3>").text(response.Title);
            // col2.append(head);

            // // Creates an element to hold the plot
            // var plot = $("<p>").text(response.Plot);
            // // Displays the plot
            // col2.append(plot);

            // // Creates an element to hold the release year
            // var year = $("<p>").text("Released: " + response.Released);
            // // Displays the release year
            // col2.append(year);

            // // Creates an element to hold the plot
            // var director = $("<p>").text("Director: " + response.Director);
            // // Displays the plot
            // col2.append(director);

            // // Creates an element to hold the plot
            // var actors = $("<p>").text("Actors: " + response.Actors);
            // // Displays the plot
            // col2.append(actors);

            //  // Creates an element to have the rating displayed
            // var rating = $("<p>").text("Rating: " + response.Rated);
            //  // Displays the rating
            // col2.append(rating);

        })
    }

    // this function saves the users band search in the local storage 
    function saveSearch(band) {

        // if the band isnt already in the search history array it will be added
        if(!searchHistory.includes(band)){
            searchHistory.push(band);
            console.log("search history", searchHistory);
            localStorage.setItem("savedSearch", band);

            // displays new search on the displayed search history card
            var bandName = $("<h6>").addClass("card-body").text(band);
            var card = $("<div>").addClass("card");
            card.append(bandName);
            $("#search-history").append(card);

            // if the user clicks on the past search it will re-run the search and display band info
            bandName.on("click", function() {
                searchBand(this.innerHTML);
            })
        }
    }

    function displaySearchHistory() {
        var history = localStorage.getItem("savedSearch");
        console.log("history: " + history)
        //if there is no search history nothing will be displayed
        if (history === "null") {
            return
        } 
        // if there is history the last search will be displayed on page reload
        else {
            searchBand(history);
        }
    }

    displaySearchHistory();

})