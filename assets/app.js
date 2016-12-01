$(document).ready(function(){

    //initial array of topics of interest for buttons
    var topics = ["dogs", "sports", "travel"];

    //function creates buttons of topics array
    function createButtons() {
        // clears all buttons everytime they are create to prevent repeats
        $('#buttons-view').empty();

        for(var i = 0; i < topics.length; i++){
            var btnElement = $('<button>');
            //class for each button
            btnElement.addClass('topic btn btn-lg btn-danger');
            //data attribute with name of topic
            btnElement.attr('data-topic', topics[i]);
            //button text for showing topic created
            btnElement.text(topics[i]);
            $('#buttons-view').append(btnElement);
        }
    }
    createButtons();

    // click event listener for submitting new topic
    $('#add-topic').on('click', function(){
        //collects string input from textbox and eliminates extra spaces
        var topic = $('#topic-input').val().trim();
        console.log(topic);
        //text submitted is added to topics array
        topics.push(topic);
        //runs createButtons function to add button of newly enetered topic
        createButtons();
        //prevents page reload after form submit
        return false;
    });
    //click event listener for buttons, including dynamically created
    $(document.body).on('click','.topic', displayGiphy);
    $(document.body).on('click','.giphy', runGiphy)
    //function displays topic giphy API
    function displayGiphy() {
        //storing topic name from data attribute
        var topicName = $(this).attr('data-topic');
        //url for giphy AJAX with corresponding topic clicked
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=dc6zaTOxFJmzC&limit=10";
        //AJAX call
        $.ajax({url:queryURL, method:'GET'})
            .done(function(response){
                var results = response.data;
                console.log(results);
                //loops through all gyphs returned set by limit of 10(in url)
                for(var i = 0; i < results.length; i++){
                    //variable holds new div element
                    var giphyDiv = $('<div class="giphy">');
                    giphyDiv.attr('data-id', results[i].id);
                    // variable for still giph image
                    var stillImageURL = results[i].images.fixed_height_still.url;
                    // creates img element with source attribute from still giph by AJAX
                    var stillGiphy = $('<img>').attr('src', stillImageURL)
                    //creates img element
                    giphyDiv.append(stillGiphy);
                    // variable for rating
                    var rating = results[i].rating;
                    //creates <p> element with giphy rating;
                    var ratingP = $('<p>').text("rated: " + rating);
                    giphyDiv.append(ratingP);
                    $('#giphy-view').prepend(giphyDiv);
                }
            });
    }
    function runGiphy(){
        //retrieves giph id from clicked img
        var gifID = $(this).attr('data-id');
        var that = this;
        // url using giphy id for search
        var queryURL = "https://api.giphy.com/v1/gifs/" + gifID + "?api_key=dc6zaTOxFJmzC";
        //AJAX call using id search url
        $.ajax({url:queryURL, method:'GET'})
            .done(function(response){
                var results = response.data;
                //variable for img element clicked

                //variable for moving image url
                var movingImageURL = results.images.fixed_height.url;
                //variable for new img element with new src
                var movingGif = $(that).find('img').attr('src', movingImageURL);
            })
    }
});
