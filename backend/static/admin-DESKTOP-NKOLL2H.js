$(document).ready(function(){

	// Display existing events

    $.getJSON("https://api.mlab.com/api/1/databases/gtgevents/collections/events?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr", function (data) {
        var eventList = [];
        for (var i = 0; i < data.length; i++) {
            eventList[i] = [data[i].event, data[i]._id];
        }
        
        eventList.sort();

        for (var i = 0; i < eventList.length; i++) {
            $('<li/>').html('<span>' + eventList[i][0] + '</span>' + '<span class="delbutton"><i class="fas fa-times-circle"></i></span><span class="editbutton"><i class="fas fa-edit"></i></span>').attr("id", eventList[i][1].$oid ).appendTo('.events');

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
          });
        }

        //  Edit existing events

        var editors = document.getElementsByClassName("editbutton"); 

        for (var a = 0; a < editors.length; a++) {
          editors[a].addEventListener('click', function () {
            var textToEdit = $(this).prev().prev().html();
            var itemToModify = $(this).parent().attr('id');
            document.getElementById("edit-text").value = textToEdit;
            $('#edit-screen, #edit-popup').fadeIn();
              $('#modify').click(function() {
                var modifiedEntry = document.getElementById('edit-text').value;
                $.ajax( { url: 'https://api.mlab.com/api/1/databases/gtgevents/collections/events/' + itemToModify + '?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr', 
                data: JSON.stringify( { "event" : modifiedEntry } ),
                type: "PUT",
                contentType: "application/json" } );
                setTimeout(location.reload.bind(location), 750);
              });
          });
        }


    });

    // Add new event

    // On button click

    $('#addevent').click(function() {
        var newEvent = $("#new-event").val();
        console.log(newEvent);
        $.ajax( { url: "https://api.mlab.com/api/1/databases/gtgevents/collections/events?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr",
          data: JSON.stringify( { "event" : newEvent } ),
          type: "POST",
          contentType: "application/json" } );
          setTimeout(location.reload.bind(location), 750);
    });

    // On enter keypress

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

    // close edit popup on esc keypress

    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          $('#edit-popup, #edit-screen').hide();
        }   
    });

    // close popop on click of "X"

    $('#pop-close').click(function() {
      $('#edit-popup, #edit-screen').hide();
    })
});