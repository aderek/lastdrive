        $(window).load(function() {
        
        	// remove the splash screen on click or after timer
        
        	$(".splash").on('click', function() {
        	
        		$(this).fadeOut(5000);
        	
        	});
        
        	setTimeout(function(){
        	        $(".splash").fadeOut(5000, function() {
        	        	$(".splash").remove();
        	        });
        	    },5000)      

			$('.pauseplay').on('click', function(event) {
				
				event.preventDefault();
				
				$(this).toggleClass('play');
			
			});  	
			
			$('.lyrics_button').on('click', function(event) {
			
				event.preventDefault();
				
				$('.lyrics').fadeToggle(1000);
			
			});
        
        });
        
        
        
        $(function() {

            // Use Modernizr to detect for touch devices, 
            // then serve them alternate background image content
            var isTouch = Modernizr.touch;
            
            // vars for auto hiding
            var isShowingPlaylist = false;
            var isHidden = false;
            var autoHideTimer;
            autoHide(true);
            
            // initialize BigVideo
            var BV = new $.BigVideo({forceAutoplay:isTouch});
            BV.init();
            // show background image
            BV.show('media/1.m4v', {ambient:true});

            // Playlist button click starts video, enables autohiding
            $('.playlist-btn').on('click', function(e) {
                e.preventDefault();

                BV.show('media/'+$(this).data('src')+'.m4v', {ambient:true});
                
                // controls
                if ($(this).hasClass('next')) {
                
                	$(this).data('src',(($(this).data('src') + 1) > 7 ? 1 : ($(this).data('src') + 1)))
                
                } else {
                
                	$(this).data('src',(($(this).data('src') - 1) < 1 ? 7 : ($(this).data('src') - 1)))
                
                }
                
                
                isShowingPlaylist = true;
                
            })

			// Turn off autohiding when mouse is over the nav 
			// (not necessary for touchscreens)
			if (!isTouch) {
			    $('.playlist-btn')
			        .on('mouseover', function() {
			            if (isShowingPlaylist) autoHide(false);
			        })
			        .on('mouseout', function() {
			            if (isShowingPlaylist) autoHide(true);
			        });
			} 

            function autoHide(enable) {
                if (enable) {
                    isHidden = true;
                    $('body').on('mousemove', function(event){
                        if (isHidden) {
                            isHidden = false;
                            $('.playlist-btn').removeClass('transparent');
                        }
                        clearTimeout(autoHideTimer);
                        autoHideTimer = setTimeout(function() {
                            isHidden = true;
                            $('.playlist-btn').addClass('transparent');
                        }, 1000);
                    });    
                } else {
                    clearTimeout(autoHideTimer);
                    $('body').off('mousemove');
                    $('.nav, .main').removeClass('transparent');
                }
            }
        });