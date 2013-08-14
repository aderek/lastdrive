$(window).load(function() {

	$(".rslides").responsiveSlides({
		auto: false,
        pager: false,
        nav: true,
        speed: 2500,
        namespace: "callbacks",
        before: function (idx) {
        	$('.rslides li:eq('+idx+')').find('video').get(0).play();
        },
        after: function (idx) {
        	
        	$('.rslides li:eq('+(idx - 1)+')').find('video').get(0).pause();
			$('.rslides li:eq('+(idx + 1)+')').find('video').get(0).pause();
			
        }
	});
	
	$('.callbacks_nav').on('click', function() {
	
		
	
	});


});