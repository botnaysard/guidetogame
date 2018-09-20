$(document).ready(function(){

	 
	// BEGIN ANIMATE DESKTOP HEADER
	
		var windowPosition = $(window);
		var currentPosition = windowPosition.scrollTop();
		var goingUp = false;
		var scrollPosition;
		windowPosition.scroll(function () {
		    scrollPosition = windowPosition.scrollTop();
		    if (scrollPosition > currentPosition && !goingUp) {
		        $("#d-menu").stop().fadeToggle();
		        goingUp = !goingUp;
		    } else if(scrollPosition < currentPosition && goingUp) {
		        $("#d-menu").stop().fadeToggle();
		        goingUp = !goingUp;
		    }
		    currentPosition = scrollPosition;
		});
	
	//END ANIMATE DESKTOP HEADER
	

	// START MOBILE HEADER TOGGLE

	$('#burger').click(function(){
		$('#m-menu').slideToggle();
	});

	// END MOBILE HEADER TOGGLE

	// START CLICK THRU TO REGISTRATION

	$('#events-preview').click(function() {
		window.location.href = 'http://www.guidetogame.com/register' 

	});

	/*

	 END CLICK THRU TO REGISTRATION

	$('.mobile-link').click(function() {
		$('#m-menu').slideUp();
	});

	*/


	// BEGIN ANIMATE SCROLL

	$('a').click(function(){
		

		if ($('#m-bar').is(":visible")) {
			adjuster = 500; //adjust scroll distance for tall, protrait orientation (mobile phone)
		} else {
			adjuster = 60; //regular scroll distance for desktop computers and landscape orientation
		}

		

	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top - adjuster}, 600);
	    return false;
		});
	
	//END ANIMATE SCROLL

	//BEGIN A

	//BEGIN STAFF TOGGLE

	$('.staff-box').click(function(){
		var whoisit = $(this).attr('id');
		$('.staff-box').not('#' + whoisit).fadeOut(600);
		$('#' + whoisit +'-bio').slideDown(600, "swing");
	});

	$('.close-bio').click(function(){
		$('.bio-box').slideUp(600);
		$('.staff-box').fadeIn(600);
	});

	//END STAFF TOGGLE

	//BEGIN SLIDE TOGGLE FOR COURSES
	
	$('.course-title').click(function(){
		var whichcourse = $(this).attr('id');
		$('#' + whichcourse + '-desc').slideToggle(500, "swing");
		$('#arrow-up-' + whichcourse).toggle();
		$('#arrow-down-' + whichcourse).toggle();
	});

	//END SLIDE TOGGLE FOR COURSES

	//PULL EVENTS FROM LIST AND DISPLAY THEM IN A select


	$.getJSON('https://api.mlab.com/api/1/databases/gtgevents/collections/events?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr', function (data) {
        var eventList = [];
        for (var i = 0; i < data.length; i++) {
            eventList[i] = data[i].event.toString();

        }
        
        eventList.sort();

        for (var i = 0; i < data.length; i++) {
            $('<p/>').val(eventList[i]).html(eventList[i]).appendTo('#event-list');
        }
    });

	//BEGIN MAPS TOGGLE

	$('#the-ranch').click(function(){
		$('#map-container').fadeOut(600, function(){
			$('#map-container').empty().append('<iframe width="450" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:EjIxMzA5IEh1dGNoaXNvbiBEciwgRnJhc2VydmlsbGUsIE9OIEswTCAxVjAsIENhbmFkYQ&key=AIzaSyAvV1NNof-L-8i92qx9G28D7O-XqLnUicI" allowfullscreen></iframe>').hide().fadeIn("fast");
		});
		$('.address-box').removeClass('selected-location');
		$(this).addClass('selected-location')
	});

	$('#easthill-outdoors').click(function(){
		$('#map-container').fadeOut(600, function(){
			$('#map-container').empty().append('<iframe width="450" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=4131%20Hwy%2035%2F115%20Orono%2C%20ON&key=AIzaSyAvV1NNof-L-8i92qx9G28D7O-XqLnUicI" allowfullscreen></iframe>').hide().fadeIn("fast");
		});
		$('.address-box').removeClass('selected-location');
		$(this).addClass('selected-location')
	});

	/*
	$('#storie-park').click(function(){
		$('#map-container').fadeOut(600, function(){
			$('#map-container').empty().append('<iframe width="450" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:EiMxMDEgTWlsbCBTdCwgT3NoYXdhLCBPTiBMMUosIENhbmFkYQ&key=AIzaSyAvV1NNof-L-8i92qx9G28D7O-XqLnUicI" allowfullscreen></iframe>').hide().fadeIn("fast");
		});
		$('.address-box').removeClass('selected-location');
		$(this).addClass('selected-location')
	});
	*/

	//END MAPS TOGGLE

	//BEGIN FORM SUBMIT

	$('#gform').on('submit', function(e) {
        e.preventDefault();
        
        //get the name field value
        var name = $('#name').val();
        //get the name field value
        var email = $('#email').val();
        //get the subject
        var subjectline = $('#subject').val();
        //get the comments
        var comments = $('#comments').val();
        //get preferred communication method
        var contactm = $('#contact-pref').val();
        
        //send to formspree
        $.ajax({
            url:'https://script.google.com/macros/s/AKfycbzP4rDY3g4CLA7zXXzPGAgy1EbYNZjyeog_0WKt/exec',
            method:'POST',
            data:{
                name:name,
                _replyto:email,
                 email:email,
                comments:comments,
                _subject:subjectline,
                contact:contactm
            },
            dataType:"json",
            success:function() {
                console.log('success'); 
                var form = document.getElementById("gform");
				form.reset();
                $('#initiate-contact').html("YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY!");
            }   

        });     
        
    });

	//END FORM SUBMIT
});