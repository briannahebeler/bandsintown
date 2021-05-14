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
            list.attr("class", "list-group-item bg-dark text-light mx-auto");
            $("#bands-view").append(list);

            var row = $("<div>");
            row.attr("class", "row");
            list.append(row);

            var col1 = $("<div>");
            col1.attr("class", "col-sm-5");
            row.append(col1);

            var img = $("<img>");
            img.attr("class", "img-thumbnail img-fluid w-100");
            img.attr("src", response.thumb_url);
            img.attr("alt", band);
            col1.append(img);

            var col2 = $("<div>");
            col2.attr("class", "col-sm-7");
            row.append(col2);

            var head = $("<h3>").text(band);
            col2.append(head);

            var fans = $("<p>");
            fans.text("The number of fans tracking this artist: " + response.tracker_count);
            col2.append(fans);

            var events = $("<p>");
            events.text("The number of upcoming events for this artist: " + response.upcoming_event_count);
            col2.append(events);

            var url = $("<a>");
            url.text("bandsintown link");
            url.attr("href", response.url);
            col2.append(url);

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
            var card = $("<div>").addClass("card bg-dark text-light mx-auto m-1");
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