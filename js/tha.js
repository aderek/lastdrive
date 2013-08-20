		$(document).ready(function() {
			
			if (Modernizr.video) {

			} else {
				$('.vidph').remove();
				$('html').addClass('no-video');
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
	        
	        	// hide the splash screen on click or after timer
	       if ($(window).width() > 568 && !$('html').hasClass('ie')) {
	       
	        	$(".splash").on('click', function() {
	        	
	        		$(this).fadeOut(5000);
	        	
	        	});
	        
	        	setTimeout(function(){
	        	        $(".splash").fadeOut(5000, function() {
	        	        	
	        	        });
	        	    },5000)      

			} // end if
			
			$('.download').hover(function(event) {
			
				$('.tools').toggleClass('show');
			
			});
			
			$('.about').click(function(event) {
			
				event.preventDefault();
			
				$('.about_container').fadeToggle('medium');
			
			});
			
			

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
            var isVideo = Modernizr.video;
            
            // vars for auto hiding
            var isShowingPlaylist = false;
            var isHidden = false;
            var autoHideTimer;
            autoHide(true);
            
            if ($(window).width() > 568 && isVideo) {
            
	            // initialize BigVideo
	            var BV = new $.BigVideo({forceAutoplay:isTouch});
	            BV.init();
	            // show first video
	            if(Modernizr.video.h264) {
	            	BV.show('http://aderek.github.io/lastdrive/media/1.mp4', {ambient:true});
	            } else if(Modernizr.video.webm) {
	            	BV.show('media/1.webm', {ambient:true});
	            }
	            
	            // start loading the next one
	            if(Modernizr.video.h264) {
		            $('.vidph').attr('src', 'media/2.m4v');
		            $('.vidph').get(0).pause()
	            }
	            
	        }
			
			$('video').on('click', function(e) {
			
				e.preventDefault();
			
				$('.playlist-btn.next').trigger('click');
			
			});
			
            // Playlist button click starts video, enables autohiding
            $('.playlist-btn').on('click', function(e) {
                e.preventDefault();

	
				if ($(this).data('src') != 12) { 

					if ($('.final').is(':visible')) {
						$('.final').fadeOut('slow');
					}

					// show the next video as normal
	                BV.show('media/'+$(this).data('src')+'.m4v', {altSource:'media/'+$(this).data('src')+'.webm', ambient:true});
	                
	                if ($(this).data('src') < 11) { 
	                	
	                	if(Modernizr.video.h264) {
							$('.vidph').attr('src', 'media/'+($(this).data('src')+1)+'.m4v');
							$('.vidph').get(0).pause()
						}
					
					}
	                
	            } else {
	            
	            	// show the download page
	            	BV.triggerPlayer('pause');
	            	
	            	$('.lyrics').fadeOut('fast');
	            	
	            	$('.final').fadeIn('slow');
	            
	            }
                
                // controls
                if ($(this).hasClass('next')) {
                
               		$('.next').data('src',(($('.next').data('src') + 1) > 12 ? 1 : ($('.next').data('src') + 1)))
               		$('.prev').data('src',(($('.prev').data('src') + 1) > 12 ? 1 : ($('.prev').data('src') + 1)))
               		
                
                } else {
                
               		$('.prev').data('src',(($('.prev').data('src') - 1) < 1 ? 12 : ($('.prev').data('src') - 1)))
               		$('.next').data('src',(($('.next').data('src') - 1) < 1 ? 12 : ($('.next').data('src') - 1)))
               		
                
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