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
	   var run;
       // Merge options with defaults
       var settings = $.extend({
          responsive 	   : true,
          delay            : 3000,
          direction        : "left",
          paging           : true,
          buttons		   : true,
          auto			   : true,
          speed			   : 750,
          prev			   : "#prev",
          next 			   : "#next",
          circular		   : "false",
          
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
                
       setup(elem, settings, matched.browser, run);
       
       // Public method
       this.addhighlight = function()
       {
           
       };
   };

   function setup(element, options, browser, run) 
   {
        var id=element.attr('id');  
        $('#'+id).addClass('jqcarousal');
        var item_Count=$('#'+id).children().length;
        var itemWidth=$('#'+id+' li').outerWidth(true);
        var total_width=item_Count*itemWidth;
       
        $('#'+id).css('width',total_width);
        if(options.direction=='right')
        {
	        var pos='-'+parseInt(total_width-itemWidth)+'px';
			$('#'+id).css('left',pos);
        }
        if(options.auto==true)
        {
        	run = setInterval(function() { transit(options,id,total_width); }, options.delay);
        	if(options.direction=='right')
        	{
	        	var list = $('#'+id);
				var listItems = list.children('li');
				list.append(listItems.get().reverse());
				
        	}
        	$('#'+id).hover(
	        
		       function() {
		            clearInterval(run);
		        }, 
		        function() {
		            run = setInterval(function() { transit(options,id,total_width); }, options.delay);  
		        }
		   );
        } 
         
       $(prev).click(function(e){
	       e.preventDefault();
	       prevItem(options,id,total_width);
       });
       $(next).click(function(e){
       	   e.preventDefault();
	       nextItem(options,id,total_width);
       });
        
                                
   };
  
   function transit(options,id,width)
   {
	   var item_width = $('#'+id+' li').outerWidth(true); 
	   var left_value = item_width * (-1);
	   console.log((options.delay/8));
	   if(options.direction=='left')
	   {
		 	var leftseek = parseInt($('#'+id).css('left')) - item_width;  
		 	
		 	$('#'+id).animate({'left' : leftseek}, (options.delay/8), function () {
            
            $('#'+id+' li:last').after($('#'+id+' li:first'));                     
			
            $('#'+id).css({'left' :left_value});
           
        
			});
	   }
	   else if(options.direction=='right')
	   {

		    var r='-'+(item_width*($('#'+id).children().length-1))+'px';
		    var r2='-'+(item_width*($('#'+id).children().length))+'px';
		    var rightseek = parseInt($('#'+id).css('left')) + item_width;  

		 	$('#'+id).animate({'left' : rightseek}, (options.delay/8), function () {
            
            $('#'+id+' li:first').before($('#'+id+' li:last')); 
            //$('#'+id+' li:last').after($('#'+id+' li:first'));                     

            $('#'+id).css({'left' : left_value});
			
			});
	   }  
   }
   
   function nextItem(options,id,width)
   {
   	   var item_width = $('#'+id+' li').outerWidth(true);
   	   var left_value = item_width * (-1);

	   if(options.direction=='left')
	   {
		    var leftseek = parseInt($('#'+id).css('left')) - item_width;
	        //slide the item
	        $('#'+id).animate({'left' : leftseek}, (options.delay/15), function () {
	            
	            //move the first item and put it as last item
	            $('#'+id+' li:last').after($('#'+id+' li:first'));                     
	            
	            //set the default item to correct position
	            $('#'+id).css({'left' : left_value});
	        
	        });
	   }
	   else if(options.direction=='right')
	   {
		   
	   }
   }
   function prevItem(options,id,width)
   {
	   var item_width = $('#'+id+' li').outerWidth(true);
   	   var left_value = item_width * (-1);
	   if(options.direction=='left')
	   {
		    var left_indent = parseInt($('#'+id).css('left')) + item_width;
	        //slide the item            
	        $('#'+id).animate({'left' : left_indent}, (options.delay/15),function(){    
	            //move the last item and put it as first item                
	            $('#'+id+' li:first').before($('#'+id+' li:last'));           
	            //set the default item to correct position
	            $('#'+id).css({'left' : left_value});
	        
	        });
	   }
	   else
	   {
		   
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