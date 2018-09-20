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

	$('#gform').on('submit', function(e) {
        e.preventDefault();
        
        //get the field values
        console.log(courseinfo);
        var fname = $('#fname').val();
        var mname = $('#mname').val();
        var lname = $('#lname').val();
        var wholeName = fname + ' ' + mname + ' ' + lname;
        var bday = $('#birthday').val();
        var bmonth = $('#birthmonth').val();
        var byear = $('#birthyear').val();
        var wholeBirthday = bmonth + ' ' + bday + ', ' + byear;
        var sex = $('#regsex').val();
        var eyes = $('#eyecol').val();
        var height = $('#height').val();
        var address = $('#streetaddy').val();
        var postal = $('#postcode').val().toUpperCase();
        var city = $('#city').val();
        var prov = $('#prov').val();
        var wholeAddress = address + ' ' + city + ' ' + prov + ' ' + postal;
        var day = $('#dayphone').val();
        var night = $('#nightphone').val();
        var contactmethod = $('#prefcont').val();
        var email = $('#regemail').val();
        var courseInfo = $('#courseinfo').val();
        var comments = $('#comments').val();
        var payment = $('#method').val();

        $.ajax({
            url:'https://script.google.com/macros/s/AKfycbzvEFTyT3emWHCRmTFRZcRjDXBKZIy0MY5FUCQg/exec',
            //url:'https://script.google.com/macros/s/AKfycbyHw0NFP6a0MGjwnmQbdk0fGTtmAHI03xtzceMlHQ/exec',
            method:'POST',
            data:{
                name: wholeName,
                birthdate: wholeBirthday,
                height: height,
                eyes: eyes,
                sex:sex,
                dayphone: day,
                nightphone: night,
                email: email,
                address: wholeAddress,
                preferredcontact: contactmethod,
            	course: courseInfo,                                     
                paymentmethod: payment,
                comments: comments
            },
            dataType:"json",
            success:function() { 
                if (payment == "cc") {
                    alert("Thanks - we have received your registration! An invoice has been sent to your e-mail address. Click 'OK' to be redirected to Square (our e-commerce platform).");
                    window.location.href = "https://squareup.com/store/guidetogame";
                } else if (payment == "e-transfer") {
                    alert("Thanks - we have received your registration! Please check your e-mail for an invoice and transfer funds via online banking promptly to secure your seat.");
                } else if (payment =="other") {
                    alert("Thanks - we have received your registration! A member of our staff will contact you to discuss payment.")
                }
                var form = document.getElementById("gform");
                form.reset();
            }     

        }); 
    
    });

});