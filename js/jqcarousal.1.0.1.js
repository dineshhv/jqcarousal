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
	   var itemWidth;
	   var id;
	   var item_Count;
	   var total_width;
	   var left_value;
	   var pos;
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
          circular		   : false,
          repeat		   : true,
          
          
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
                
       setup();

       function setup() {

	        id=elem.attr('id');  
	        $('#'+id).addClass('jqcarousal');
	        item_Count=$('#'+id).children().length;
	        itemWidth=$('#'+id+' li').outerWidth(true);
	        total_width=item_Count*itemWidth;
	        left_value = itemWidth * (-1);
	        $('#'+id).css('width',total_width);
	        
	        if(settings.direction=='left')
	        {
		       $('#'+id).css('left',left_value); 
		       $('#'+id+' li:first').before($('#'+id+' li:last'));  
	        }
	        else if(settings.direction=='right')
	        {
		        var list = $('#'+id);
				var listItems = list.children('li');
				list.append(listItems.get().reverse());
		        pos='-'+parseInt(total_width+(itemWidth*(-2)))+'px';
		        $('#'+id+' li:last').after($('#'+id+' li:first'));  
				$('#'+id).css('left',pos);
	        }
	        if(settings.auto==true)
	        {
	        	run = setInterval(function() { transit(); }, settings.delay);
	        	$('#'+id).hover(
		        
			       function() {
			            clearInterval(run);
			        }, 
			        function() {
			            run = setInterval(function() { transit(); }, settings.delay);  
			        }
			   );
	        } 

	       $(settings.prev).click(function(e){
		       e.preventDefault();
		       prevItem();
	       });
	       $(settings.next).click(function(e){
	       	   e.preventDefault();
		       nextItem();
	       });

       }
       function transit()
	   {
		   
		   if(settings.circular==true)
		   {
			  if(settings.repeat==true)
			  {
				   
				   var left_value = itemWidth * (-1);
				   if(settings.direction=='left')
				   {
					 	var leftseek = parseInt($('#'+id).css('left')) - itemWidth;  
					 	$('#'+id).animate({'left' : leftseek}, (settings.delay/8), function () {
			            $('#'+id+' li:last').after($('#'+id+' li:first'));                     
						$('#'+id).css({'left' :left_value});
			            });
				   }
				   else if(settings.direction=='right')
				   {
					    var r='-'+(itemWidth*($('#'+id).children().length-2))+'px';
					    var rightseek = parseInt($('#'+id).css('left')) + itemWidth;  
						$('#'+id).animate({'left' : rightseek}, (settings.delay/8), function () {
			            $('#'+id+' li:first').before($('#'+id+' li:last')); 
			            $('#'+id).css({'left' : r});
						});
				   } 
				   
			  }
			  else
			  {
				  
			  }
		   }
		   else
		   {
			   
		   } 
	   }
	   
	   function nextItem()
	   {
		   
	   	   var itemWidth = $('#'+id+' li').outerWidth(true);
	   	   var left_value = itemWidth * (-1);
	
		   if(settings.direction=='left')
		   {
			    
			    var leftseek = parseInt($('#'+id).css('left')) - itemWidth;
		        //slide the item
		        $('#'+id).animate({'left' : leftseek}, settings.speed/15, function () {
		            
		            //move the first item and put it as last item
		            $('#'+id+' li:last').after($('#'+id+' li:first'));                     
		            
		            //set the default item to correct position
		            $('#'+id).css({'left' : left_value});
					
		        });
		       
		   }
		   else if(settings.direction=='right')
		   {
			   var r='-'+(itemWidth*($('#'+id).children().length-2))+'px';
			   var leftseek = parseInt($('#'+id).css('left')) - itemWidth;  
			   $('#'+id).animate({'left' : leftseek}, (settings.delay/8), function () {
			    $('#'+id+' li:last').after($('#'+id+' li:first'));                     
				$('#'+id).css({'left' :r});
			   });
		   }
	   }
	   function prevItem()
	   {
		   var itemWidth = $('#'+id+' li').outerWidth(true);
	   	   var left_value = itemWidth * (-1);
		   if(settings.direction=='left')
		   {
			    var left_indent = parseInt($('#'+id).css('left')) + itemWidth;
		        //slide the item            
		        $('#'+id).animate({'left' : left_indent}, settings.speed/15,function(){    
		            //move the last item and put it as first item                
		            $('#'+id+' li:first').before($('#'+id+' li:last'));           
		            //set the default item to correct position
		            $('#'+id).css({'left' : left_value});
		        
		        });
		   }
		   else
		   {
			   var r='-'+(itemWidth*($('#'+id).children().length-2))+'px';
			   var rightseek = parseInt($('#'+id).css('left')) + itemWidth;  
			   $('#'+id).animate({'left' : rightseek}, (settings.delay/8), function () {
			      $('#'+id+' li:first').before($('#'+id+' li:last')); 
			      $('#'+id).css({'left' : r});
			   });
		   }
	   }
       
       
       // Public method
       this.addhighlight = function()
       {
           
       };
   };

  
  
   
  
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