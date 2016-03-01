jQuery(document).ready(function($) {
   
   'use strict';
   
	
	//SMOOTH SCROLL
	smoothScroll.init({
		speed: 500, // How fast to complete the scroll in milliseconds
		easing: 'easeInOutCubic', // Easing pattern to use
		updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
		callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
		callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
	 });

	//Countdown
	var elem=document.getElementById("countdown");
	setInterval(ojidanieNG, 499,elem);
		
	//MILESTONE
    $('.timer').countTo();
	
	
	//MAGNIFIC POPUP LOAD CONTENT VIA AJAX
	$('.speaker-detail').magnificPopup({type: 'ajax'});
	$('.register').magnificPopup({type: 'ajax'});	
 	
	//MAGNIFIC POPUP IMAGE
	$('.image-link').magnificPopup({type:'image'});	
	
	//OWLCAROUSEL SCHEDULE
	var timetable = $("#timetable");
  var days = $("#days");
 
  timetable.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: false,
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
  });
 
  days.owlCarousel({
   	items : 4,
    itemsMobile       : [479,4],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });
 
  function syncPosition(el){
    var current = this.currentItem;
    $("#days")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#days").data("owlCarousel") !== undefined){
      center(current)
    }
  }
 
  $("#days").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    timetable.trigger("owl.goTo",number);
  });
 
  function center(number){
    var daysvisible = days.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in daysvisible){
      if(num === daysvisible[i]){
        var found = true;
      }
    }
 
    if(found===false){
      if(num>daysvisible[daysvisible.length-1]){
        days.trigger("owl.goTo", num - daysvisible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        days.trigger("owl.goTo", num);
      }
    } else if(num === daysvisible[daysvisible.length-1]){
      days.trigger("owl.goTo", daysvisible[1])
    } else if(num === daysvisible[0]){
      days.trigger("owl.goTo", num-1)
    }
    
  }

	//OWLCAROUSEL GALLERY
	var owl = $(".gallery");
 
	  owl.owlCarousel({
		  itemsCustom : [
			[0, 2],
			[450, 2],
			[600, 4],
			[700, 4],
			[1000, 4],
			[1200, 4],
			[1600, 4]
		  ],
		  navigation : true,
		  navigationText : ['<i class="fa fa-4x fa-chevron-circle-left"></i>','<i class="fa fa-4x  fa-chevron-circle-right"></i>'],
	  });

	  
	//OWLCAROUSEL TESTIMONIAL
	$("#quote").owlCarousel({
 
		pagination : false, 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		navigation : true,
		navigationText : ['<i class="fa fa-3x fa-chevron-circle-left"></i>','<i class="fa fa-3x  fa-chevron-circle-right"></i>'],
	});
	
	
	//FIX HOVER EFFECT ON IOS DEVICES
	document.addEventListener("touchstart", function(){}, true);
	
	

});
	
	


$(window).load(function(){
	
	
	//PARALLAX BACKGROUND
	$(window).stellar({
		horizontalScrolling: false,
	});
    
	
    //PRELOADER
    $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	
	
	//HEADER ANIMATION
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

});

	// CONTACT FORM FUNCTION
	var contact_send = function(){
	
	'use strict';
	
	var name  = $("#name").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var type  = $("#type").val();
	
		 if ( name=="" ){ alert("name area is empty!"); $("#name").focus(); }
	else if ( email=="" ){ alert("email address area is empty!"); $("#email").focus(); }
	else if ( phone=="" ){ alert("phone number area is empty!"); $("#phone").focus(); }
	else if ( type=="" ){ alert("register type isn't selected!"); $("#type").focus(); }
	else {
		$.post("contact.send.php", { name:name, email:email, phone:phone, type:type }, function( result ){
			if ( result=="SUCCESS" ){
				alert("Your contact form is sent.");
				setTimeout(function(){
					$("#name").val("");
					$("#email").val("");
					$("#phone").val("");
					$("#type").val("");
				}, 3000);
			} else {
				alert("Your contact form isn't sent. Please check fields and try again.");
			}
		});
	}

};

	/* Newsletter Functions */
	var newsletter_send = function(){
	
		'use strict';
		
		var email 	= $("#newsletter_email").val();
		if ( email=="" ){ alert("Your email address is empty!"); $("#newsletter_email").focus(); }
		else {
			$.post("newsletter.send.php", { email:email }, function( result ){
				
				console.log( result );
				
				if ( result=="SUCCESS" ){
					alert("Thank you. Your email is added to our database.");
					setTimeout(function(){ $("#newsletter_email").val(""); }, 3000);
				}
				
				else if ( result=="EXIST" ){
					alert("Error. Your email address is already exist our database.");
					$("#newsletter_email").focus();
				}
				
				else {
					alert("Error. Your email isn't added to our database.");
					$("#newsletter_email").focus();
				}
				
			});
		}
	
	};
	

	//GOOGLE MAP
	function init_map() {
    var myOptions = {
        zoom: 14,
        center: new google.maps.LatLng(39.869763,32.745618), 
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(39.869763,32.745618)
    });
    infowindow = new google.maps.InfoWindow({
        content: "<b>WTM ANKARA 2015</b><br/>Bilkent Cyberpark Konferans Salonu<br />B Blok Kat:1, Bilkent/Ankara"
    });
    google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
	}
	google.maps.event.addDomListener(window, 'load', init_map);
function ojidanieNG(elem)
{
	var today = new Date();
	 
	var BigDay = new Date("April 30, 2016 09:00:00 GMT+0200 ");
	var timeLeft = (BigDay.getTime() - today.getTime());
	 
	var e_daysLeft = timeLeft / 86400000;
	var daysLeft = Math.floor(e_daysLeft);
	 
	var e_hrsLeft = (e_daysLeft - daysLeft)*24;
	var hrsLeft = Math.floor(e_hrsLeft);
	 
	var e_minsLeft = (e_hrsLeft - hrsLeft)*60;
	var minsLeft = Math.floor(e_minsLeft);
	 
	var secsLeft = Math.floor((e_minsLeft - minsLeft)*60);
	if (BigDay.getTime() > today.getTime() )
		elem.innerHTML = (daysLeft ? daysLeft+' Gün, ' : '')+(!daysLeft&&!hrsLeft?'':hrsLeft+' Saat, ')+(!daysLeft&&!hrsLeft&&!minsLeft?'':minsLeft+' Dakika, ')+secsLeft+' Saniye';
	else 
		elem.innerHTML = 'Etkinlik Gerçekleşiyor'

}