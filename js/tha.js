        $(window).load(function() {
        
        	$(".splash").delay(5000).fadeOut(5000, function() {
        	
        		$(this).remove();
        	
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
            var $showContentButton = $('<div class="touchscreen-show-button box">Back</div>')
            
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
                
                autoHide(true);
                isShowingPlaylist = true;
                
            })



            function autoHide(enable) {
                if (enable) {
                    isHidden = true;
                    $('body').on('mousemove', function(event){
                        if (isHidden) {
                            isHidden = false;
                            $('.nav, .main').removeClass('transparent');
                        }
                        clearTimeout(autoHideTimer);
                        autoHideTimer = setTimeout(function() {
                            isHidden = true;
                            $('.nav, .main').addClass('transparent');
                        }, 1000);
                    });    
                } else {
                    clearTimeout(autoHideTimer);
                    $('body').off('mousemove');
                    $('.nav, .main').removeClass('transparent');
                }
            }
        });