$(document).ready(function() {

    // get events from database

    $.getJSON('https://api.mlab.com/api/1/databases/gtgevents/collections/events?apiKey=ScFe6KCjAOBrq8LDmzfXBCGViNrIuMdr', function (data) {
        var eventList = [];
        for (var i = 0; i < data.length; i++) {
            eventList[i] = data[i].event.toString();

        }
        
        eventList.sort();

        for (var i = 0; i < data.length; i++) {
            $('<option/>').val(eventList[i]).html(eventList[i]).appendTo('#courseinfo');
        }

        // sort the array so everything is in ascending order by date...

    });

	$('#registration').on('submit', function(e) {
        e.preventDefault();
        
        //get the field values
        var courseinfo = $('#courseinfo').val();
        console.log(courseinfo);
        var fname = $('#fname').val();
        var mname = $('#mname').val();
        var lname = $('#lname').val();
        var bday = $('#birthday').val();
        var bmonth = $('#birthmonth').val();
        var byear = $('#birthyear').val();
        var sex = $('#regsex').val();
        var eyes = $('#eyecol').val();
        var height = $('#height').val();
        var address = $('#streetaddy').val();
        var postal = $('#postcode').val();
        var city = $('#city').val();
        var prov = $('#prov').val();
        var day = $('#dayphone').val();
        var night = $('#nightphone').val();
        var contactmethod = $('#prefcont').val();
        var email = $('#regemail').val();
        var courseinfo = $('#courseinfo').val();
        var comments = $('#comments').val();
        var payment = $('#method').val();
        console.log(payment);
        
        //send to formspree
        $.ajax({
            url:'https://formspree.io/xgkkoynx',
            method:'POST',
            data:{
            	course: courseinfo,
                firstname:fname,
                middlename:mname,
                lastname:lname,
                _subject:'NEW REGISTRATION SUBMITTED',
                _replyto:email,
                email:email,
                birthday:bday,
                birthmonth:bmonth,
                birthyear:byear,
                sex:sex,
                eyes:eyes,
                height:height,
                address:address,
                city:city,
                province:prov,
                postalcode:postal,
                dayphone:day,
                nightphone:night,
                preferred:contactmethod,
                course:courseinfo,
                method:payment,
                comments:comments
            },
            dataType:"json",
            success:function() { 
                alert("Thank you for registering with Guide to Game!\n\nYou will receive an email from guidetogame.sharyl@gmail.com within 24 business hours with a course confirmation, course details, and payment options.\n\nPlease note that payment is due upon registration, all sales are final - no exceptions.");
                var form = document.getElementById("registration");
                form.reset();
            }     

        });  
        
    });

});


