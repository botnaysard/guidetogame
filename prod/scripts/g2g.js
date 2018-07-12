$(document).ready(function(){

	// BEGIN ANIMATE HEADER
	
		var windowPosition = $(window);
		var currentPosition = windowPosition.scrollTop();
		var goingUp = false;
		var scrollPosition;
		windowPosition.scroll(function () {
		    scrollPosition = windowPosition.scrollTop();
		    if (scrollPosition > currentPosition && !goingUp) {
		        $('nav').stop().slideToggle();
		        goingUp = !goingUp;
		        console.log(goingUp);
		    } else if(scrollPosition < currentPosition && goingUp) {
		        $('nav').stop().slideToggle();
		        goingUp = !goingUp;
		    }
		    currentPosition = scrollPosition;
		});
	
	// END ANIMATE HEADER

	// BEGIN ANIMATE SCROLL

	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top - 60}, 600);
	    return false;
	});
	
	//END ANIMATE SCROLL

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

	$('#storie-park').click(function(){
		$('#map-container').fadeOut(600, function(){
			$('#map-container').empty().append('<iframe width="450" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:EiMxMDEgTWlsbCBTdCwgT3NoYXdhLCBPTiBMMUosIENhbmFkYQ&key=AIzaSyAvV1NNof-L-8i92qx9G28D7O-XqLnUicI" allowfullscreen></iframe>').hide().fadeIn("fast");
		});
		$('.address-box').removeClass('selected-location');
		$(this).addClass('selected-location')
	});

	//END MAPS TOGGLE

	//BEGIN FORM SUBMIT

	$('#contact-g2g').on('submit', function(e) {
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
            url:'https://formspree.io/xgkkoynx',
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
                var form = document.getElementById("contact-g2g");
				form.reset();
                $('#initiate-contact').html("YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY!");
            }   

        });     
        
    });

	//END FORM SUBMIT

});