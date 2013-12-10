/*******************************************************
*        Author: Dinesh Vadivel                        *
*        Plugin: jqcarousal.1.0.0.js                   *
*        Date:   20-06-2013                       	   *
*                                                      *
*                                                      *
*                                                      *
*                                                      *
*                                                      *
*                                                      *
*****************************************************/

(function($){
   var JQcarousal = function(element, options)
   {
       var elem = $(element);
       var obj = this;

       // Merge options with defaults
       var settings = $.extend({
          responsive 	   : true,
          speed            : 2500,
          direction        : "left",
          paging           : true,
          buttons		   : true,
          auto			   : true,
          
          
       }, options || {});
       
       var matched, browser;
       jQuery.uaMatch = function( ua ) {
           ua = ua.toLowerCase();
           var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

                    return {
                        browser: match[ 1 ] || "",
                        version: match[ 2 ] || "0"
                    };
                };

                matched = jQuery.uaMatch( navigator.userAgent );
                browser = {};
                
                if ( matched.browser ) {
                    browser[ matched.browser ] = true;
                    browser.version = matched.version;
                }
                
                // Chrome is Webkit, but Webkit is also Safari.
                if ( browser.chrome ) {
                    browser.webkit = true;
                } else if ( browser.webkit ) {
                    browser.safari = true;
                }
                
                jQuery.browser = browser;
                
       setup(elem, settings, matched.browser);
      
      
       
       
       // Public method
       this.addhighlight = function()
       {
           
       };
   };

   function setup(element, options, browser) 
   {
        var id=element.attr('id');  
        $('#'+id).addClass('jqcarousal');
        if(options.auto==true)
        {
        	var run = setInterval(function() { transit(options,id); }, options.speed);
        }                         
   };
  
   function transit(options,id)
   {
	   var item_width = $('#'+id+' li').outerWidth(true); 

	   if(options.direction=='left')
	   {
		 	var leftseek = parseInt($('#'+id).css('left')) - item_width;  
		 	
		 	$('#'+id).animate({'left' : leftseek}, 200, function () {
            
            $('#'+id+' li:last').after($('#'+id+' li:first'));                     

            $('#'+id).css({'left' : 0});
        
			});
	   }
	   else if(options.direction=='right')
	   {
		   var rightseek = parseInt($('#'+id).css('left')) + item_width;  
		 	
		 	$('#'+id).animate({'right' : rightseek}, 200, function () {
            
            $('#'+id+' li:last').after($('#'+id+' li:first'));                     

            $('#'+id).css({'left' : 0});
        
			});
	   }  
   }
  
  
   $.fn.jqcarousal = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('jqcarousal')) return;

           // pass options to plugin constructor
           var jqcarousal = new JQcarousal(this, options);
          
           // Store plugin object in this element's data
           element.data('jqcarousal', jqcarousal);
       });
   };
})(jQuery);