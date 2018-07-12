$(document).ready(function(){

	// Display existing events

    $.getJSON("https://api.mlab.com/api/1/databases/gtgevents/collections/events?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr", function (data) {
        var eventList = [];
        for (var i = 0; i < data.length; i++) {
            eventList[i] = [data[i].event, data[i]._id];
        }
        
        eventList.sort();

        for (var i = 0; i < eventList.length; i++) {
            $('<li/>').html('<span>' + eventList[i][0] + '</span>' + '<span class="delbutton"><i class="far fa-times-circle"></i></span>').attr("id", eventList[i][1].$oid ).appendTo('.events');

        }

        // Add event listeners for deleting existing event

        var deleters = document.getElementsByClassName("delbutton"); 

        for (var i = 0; i < deleters.length; i++) {
          deleters[i].addEventListener('click', function () {
            var itemToDelete = $(this).parent().attr('id');
            var urlForDeletion = 'https://api.mlab.com/api/1/databases/gtgevents/collections/events/' + itemToDelete + '?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr' ;
            console.log(urlForDeletion);
            $.ajax( { url: urlForDeletion,
            type: "DELETE",
            async: true,
            timeout: 300000,
            success: function (data) { },
            error: function (xhr, status, err) { } } );
            setTimeout(location.reload.bind(location), 750);
          })
        }

    });

    // Add new event

    $('#addevent').click(function() {
        var newEvent = $("#new-event").val();
        console.log(newEvent);
        $.ajax( { url: "https://api.mlab.com/api/1/databases/gtgevents/collections/events?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr",
          data: JSON.stringify( { "event" : newEvent } ),
          type: "POST",
          contentType: "application/json" } );
          setTimeout(location.reload.bind(location), 750);
    });




    $('#add-event').keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            var newEvent = $("#new-event").val();
            $.ajax( { url: "https://api.mlab.com/api/1/databases/gtgevents/collections/events?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr",
              data: JSON.stringify( { "event" : newEvent } ),
              type: "POST",
              contentType: "application/json" } );
              setTimeout(location.reload.bind(location), 500);
        }
    });

  

    


    

});