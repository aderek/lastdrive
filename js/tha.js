		$(document).ready(function() {
		
			var is_video = Modernizr.video;
			
			if (is_video) {
			
				$('html').removeClass('no-video');
			
			}
		
		});

        $(window).load(function() {
        	
	        	SC.initialize({
	        	  client_id: 'a9abff004db15575ced769669421e015'
	        	});
	        	
	        	// permalink to a track
	        	var track_url = 'http://soundcloud.com/thehundredthanniversary/last-drive-1/';
	        	
	        	var sound = null;
	        	
	        	SC.get('/resolve', { url: track_url }, function(track) {
	        	  SC.stream('/tracks/' + track.id, function(sc_sound){
	        	  	sound = sc_sound;
	        	  	
	        	  	// we only want to play the audio if we're on desktop
	        	  	if ($(window).width() > 568) {
	        	    	sound.play();
	        	    } 
	        	  });
	        	});
	        
	        	// remove the splash screen on click or after timer
	       if ($(window).width() > 568) {
	       
	        	$(".splash").on('click', function() {
	        	
	        		$(this).fadeOut(5000);
	        	
	        	});
	        
	        	setTimeout(function(){
	        	        $(".splash").fadeOut(5000, function() {
	        	        	$(".splash").remove();
	        	        });
	        	    },5000)      

			}

			$('.pauseplay').on('click', function(event) {
				
				event.preventDefault();
				
				$(this).toggleClass('play');
				
				if ($(this).find('.playIcon').is(':visible')) {
					sound.pause();
				} else {
					sound.play();
				}
					
			
			});  	
			
			$('.lyrics_button').on('click', function(event) {
			
				event.preventDefault();
				
				$('.lyrics').fadeToggle(1000);
			
			});
			
			$('.download_text').on('click', function() {
				
				$(this).fadeOut('fast', function() {
				
					$('.thanks').fadeIn('fast');
				
				});
				
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
            
            if ($(window).width() > 568) {
            
	            // initialize BigVideo
	            var BV = new $.BigVideo({forceAutoplay:isTouch});
	            BV.init();
	            // show background image
	            BV.show('media/1.m4v', {ambient:true});
	            
	        }
			
            // Playlist button click starts video, enables autohiding
            $('.playlist-btn').on('click', function(e) {
                e.preventDefault();

	
				if ($(this).data('src') != 8) { 

					if ($('.final').is(':visible')) {
						$('.final').fadeOut('slow');
					}

					// show the next video as normal
	                BV.show('media/'+$(this).data('src')+'.m4v', {ambient:true});

	                
	            } else {
	            
	            	// show the download page
	            	BV.triggerPlayer('pause');
	            	
	            	$('.final').fadeIn('slow');
	            
	            }
                
                // controls
                if ($(this).hasClass('next')) {
                
               		$('.next').data('src',(($('.next').data('src') + 1) > 8 ? 1 : ($('.next').data('src') + 1)))
               		$('.prev').data('src',(($('.prev').data('src') + 1) > 8 ? 1 : ($('.prev').data('src') + 1)))
               		
                
                } else {
                
               		$('.prev').data('src',(($('.prev').data('src') - 1) < 1 ? 8 : ($('.prev').data('src') - 1)))
               		$('.next').data('src',(($('.next').data('src') - 1) < 1 ? 8 : ($('.next').data('src') - 1)))
               		
                
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