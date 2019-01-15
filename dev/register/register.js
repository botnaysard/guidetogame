$(document).ready(function() {

	$('#registration').on('submit', function(e) {
        e.preventDefault();
        
        //get the field values
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var bday = $('#birthday').val();
        var bmonth = $('#birthmonth').val();
        var byear = $('#birthyear').val();
        var sex = $('#regsex').val();
        var eyes = $('#eyecol').val();
        var height = $('#height').val();
        var address = $('#streetaddy').val();
        var postal = $('#postcode').val();
        var day = $('#dayphone').val();
        var night = $('#nightphone').val();
        var contactmethod = $('#prefcont').val();
        var email = $('#regemail').val();
        var courses = $('input:checkbox:checked.courses').map(function () {
            return this.value;
        }).get();
        var courseinfo = $('#courseinfo').val();
        var comments = $('#comments').val();
        var payment = $('#method').val();
        console.log(payment);
        
        //send to formspree
        $.ajax({
            url:'https://formspree.io/xgkkoynx',
            method:'POST',
            data:{
                firstname:fname,
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
                postalcode:postal,
                dayphone:day,
                nightphone:night,
                preferred:contactmethod,
                courses:courses,
                method:payment,
                comments:comments
            },
            dataType:"json",
            success:function() { 
                alert("Thanks - we have received your registration! An invoice will be sent to your e-mail address shortly - please pay upon receipt in order to secure your seat.");    
                var form = document.getElementById("registration");
				form.reset();
            }   

        });     
        
    });

});