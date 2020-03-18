/* ======= FUNCTIONS ======= */

/* --- LOADERS --- */

function slideLoaded(obj){
	obj.addClass('loaded');
	var countImg = $('#FeatImg.home').find('img').length;
	var loadedImg = $('#FeatImg.home').find('img.loaded').length;
	if (loadedImg == countImg){
		$('#LoaderText > span').html('100%');
		$('#Loader, #LoaderText').fadeOut('slow',function(){
			$('#MovingParts, .cycle, .cycle_pager').fadeIn('fast', loadTitles());
		});	
	} else {
		var percentLoaded = loadedImg/countImg * 100;
		$('#LoaderText > span').html(percentLoaded+'%');
	}
};

function heroSlideLoaded(obj){
	obj.addClass('loaded');
	var countImg = $('#HeroCycle').find('img').length;
	var loadedImg = $('#HeroCycle').find('img.loaded').length;
	if (loadedImg == countImg){
		runHeroSlide();
		$('#LoaderText > span').html('100%');
		$('#Loader, #LoaderText').fadeOut('slow',function(){
				$('#HeroMovingParts').fadeIn('slow',function(){
				$('#HeroPager .left, #HeroOverlay').animate({marginLeft: '0'},'slow','easeOutBack');
				$('#HeroPager .right').animate({marginRight: '0'},'slow','easeOutBack');
			});
		});	
	} else {
		var percentLoaded = Math.round(loadedImg/countImg * 100);
		$('#LoaderText > span').html(percentLoaded+'%');
	}
};

function loadTitles(){
	$('.holder').find('h3').delay(500).animate({textIndent: ['0', 'easeOutBack'], opacity: '.999'},'slow');
	$('.holder').find('.blue_button').delay(500).animate({marginLeft: ['0', 'easeOutBack'], opacity: '.999'},'slow');
	$('.holder').find('h2').delay(500).animate({marginRight: ['0', 'easeOutBack'], opacity: '.999'},'slow');
}

function imgLoaded(obj){
	obj.fadeIn('slow', function(){
		if ($('#ParentTitle').length){
			$('#ParentTitle').find('h2').animate({textIndent: ['0', 'easeOutBack'], opacity: '.999'},'slow');
		}
	});
}

function logoLoaded(){
	$('header').find('.logo').addClass('loaded');
}

/* --- TEST FOR MOBILE/TABLET --- */

function mobileTest(){
	mobile = false;

	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
		mobile = true;
	};
	
	if (mobile == true){
		$('body').addClass('touch_device');
	};
};

/* --- GIVE MAIN HEIGHT --- */

function mainHeight(){
	var cOff = parseInt($('#ContentDS').css('top'));
	var ch = $('#Content').outerHeight();
	var mh = ch+cOff+40;
	$('#Main').height(mh);
}

/* --- INSTANTIATE BG SLIDESHOW --- */

function runBGSlide(){

	if($('#FeatImg.home').length){
		
		oldH2Height = 0;
		newH2Height = 0;
		h2 = $('.overlay').find('h2');
		
		$('#MovingParts').cycle({ 
			fx: 'fade',
			timeout: 40000,
			speed: 3500,
			fit: 1,
			width: '100%',
			pager: '.cycle_pager', 
			prev:  '.cycle.prev',
			next:  '.cycle.next',
			before: function(){
				var slide = $(this).find('img');
				var subt = slide.attr('data-subt');
				var titl = slide.attr('data-titl');
				var link = slide.attr('data-link');
				var src = slide.attr('data-src');
			
				$('.overlay').find('h3').html(subt);
				h2.find('span').animate({opacity: '0'}, 200, 
					function(){
						h2.find('span').html(titl);
						newH2Height = h2.height();
			
						if (oldH2Height != 0){
							h2.css('height', oldH2Height);
						}
						h2.animate({height: newH2Height}, 650, 'easeOutBack', function(){
						h2.css('height','auto');
						h2.find('span').animate({opacity: '.999'}, 1000);
					});
				});
			
				$('.overlay').find('.blue_button > span').html(link);
				$('.overlay').find('a').attr('href',src);
				$('.overlay').find('a').attr('target',"_blank");
			
			
			},
			after: function(){
				oldH2Height = h2.height();
				h2.css('height','auto');
			}
		});
	}
}

/* --- INSTANTIATE HERO SLIDESHOW --- */

function runHeroSlide(){
	if($('#HeroCycle').length){
		$('#HeroMovingParts').cycle({ 
			fx: 'fade',
			timeout: 8000,
			speed: 1000,
			fit: 1,
			width: '100%',
			pager: '#HeroPager .left',
			before: function(){
				slide = $(this);
				overlay = $('#HeroOverlay');
				hw = overlay.outerWidth();
				overlay.animate({marginLeft:'-'+hw+'px'},'slow',function(){
					var caption = slide.find('.caption').html();
					overlay.html(caption);
					overlay.animate({marginLeft:'0'},'slow','easeOutBack');
					mainHeight();
				});
				$('#HeroPager .right h4').fadeOut('slow',function(){
					var mname = slide.find('h5').html();
					$('#HeroPager .right h4').html(mname);
					$('#HeroPager .right h4').fadeIn('slow');
				});
			}
		});
	}
}

/* --- FEAT BOX TEXT SIZE --- */

function featTextSize(){
		$('.feat_box').each(function(){
			fbw = $(this).width() - 40;
			var h3fs = fbw/95;
			var pfs = fbw/130;
			if (fbw < 206){
				$(this).find('h3').css('font-size',h3fs+'em');
				$(this).find('p').css('font-size',pfs+'em');
			} else {
				$(this).find('h3').removeAttr('style');
				$(this).find('p').removeAttr('style');
			}
		})
}

/* --- GET TRACK INFO --- */

function getTrackInfo(){
		
		//console.log('refreshing titles');
		//console.info('old = '+old);
		
		$.getJSON("http://23.21.68.2/admin/services.php?callback=?",
			{q:'current_track'},	
			function(data){	
				var currentTrack = data.TrackInfo.Composer+" “"+data.TrackInfo.Track+"” — <em>"+data.TrackInfo.Album+"</em>  ["+data.TrackInfo.Duration+"]";
				//console.info('new = '+currentTrack);
				if (currentTrack != old){
					$('#Title').animate({opacity: '0'},'slow',function(){
						//console.log('updating titles');
						var oldW = $('#Title').width();
						clearInterval(dotsCounter);
						if ($('#Dots').length){
							$('#Dots').html('');
						}
						$('#Text').html(currentTrack);
						old = $('#Text').html().replace("&","&");
						$('#Title').css('width','auto');
						var newW = $('#Title').outerWidth();
						$('#Title').css('width',oldW+'px');
						$('#Title').animate({width: newW,opacity: '.999'},'fast');
					});
				} else {
					//console.log('no change');
				}
			}
		);		
}

function updateTrackInfo() {
	//console.log('refreshing titles');
	//console.info('old = '+old);
	
	$.getJSON("http://23.21.68.2/admin/services.php?callback=?",
		{q:'current_track_with_art'},	
		function(data){	
			var currentTrack = data.TrackInfo.Composer+" “"+data.TrackInfo.Track+"” — <em>"+data.TrackInfo.Album+"</em>  ["+data.TrackInfo.Duration+"]";
			//console.info('new = '+currentTrack);
			if (currentTrack != old){
				$('#Title').animate({opacity: '0'},'slow',function(){
					//console.log('updating titles');
					var oldW = $('#Title').width();
					clearInterval(dotsCounter);
					if ($('#Dots').length){
						$('#Dots').html('');
					}
					$('#Text').html(currentTrack);
					old = $('#Text').html().replace("&","&");
					$('#Title').css('width','auto');
					var newW = $('#Title').outerWidth();
					$('#Title').css('width',oldW+'px');
					$('#Title').animate({width: newW,opacity: '.999'},'fast');
				});
				if ($('#now_playing').length) {
					$('#now_playing').animate({opacity:0}, 'slow', function(){
						var out = "<div id='now_playing'><h3>Now Playing</h3>";
						if (typeof data.TrackInfo.CoverArt !== 'undefined' && data.TrackInfo.CoverArt[0] != null) {
							out += "<div style='float:left; width:15%;margin:5px 15px 0 0;'>";
							out += "<img style='border-bottom:none;' src='../NewMusic_files/" + data.TrackInfo.CoverArt[0] + "' />";
							out += "</div>";
						}
						out += "<p><strong>" + data.TrackInfo.Track + "</strong> by ";
						out += data.TrackInfo.Composer + "<br />";
						out += "From <em>" + data.TrackInfo.Album + "</em>";
						if (data.TrackInfo.Label) {
							var albumYear = data.TrackInfo.Year ? " " + data.TrackInfo.Year : "";
							out += " (" + data.TrackInfo.Label + albumYear + ")<br />";
						} else {
							out += "<br />";
						}
						if (data.TrackInfo.Performers) {
							out += "Performed by " + data.TrackInfo.Performers + "<br />";
						}
						if (typeof data.TrackInfo.AmazonDetailPage !== 'undefined' && data.TrackInfo.AmazonDetailPage[0] != null) {
							out += "<a href='../NewMusic_files/" + data.TrackInfo.AmazonDetailPage[0]  + "' target='_blank'>Buy on Amazon</a><br />";
						}
						out += "<span id='CS_inline_trigger' data-track_id='" + data.TrackInfo.ID + "'>Listen <span>▶</span></span></p></div>";

						$('#now_playing').html(out).animate({opacity:1}, 'fast');
					});
				}
			} else {
				//console.log('no change');
			}
		}
	);
}

/* --- RADIO EVENTS --- */

function radioLoading(){
	$('#Title').animate({width: '70px'},'fast','easeOutBack');
	$('#Text').html('Buffering ');
	$('#PlayPause').css('background-position','3px 26px');
	var dots = $('#Dots');
	dotsCounter = setInterval(function() {
	    if (dots.html().length == 3){
	        dots.html('');
		} else {
			dots.append('.')
		};	
	}, 400);	
}

function radioPlay(){
	$('#Title').animate({opacity: '0'},'fast','easeOutBack',function(){
		$('#Text').html('Getting Track Information');
		$('#Title').animate({opacity: '.999',width: ['128px','easeOutBack']},'fast',function(){
			old = $('#Text').html();
			getTrackInfo();
			refreshTitles = setInterval(function() {
			    updateTrackInfo();
			}, 10000);
			$('#PlayPause').css('background-position','3px 26px');
		});
		
	});
}

function radioStop(){
	clearInterval(dotsCounter);
	if (typeof refreshTitles != 'undefined'){
		clearInterval(refreshTitles);
	}
	$('#Dots').html('');
	$('#Text').html('Counterstream Radio');
	$('#Title').animate({width: '105px',minWidth: '0'},'fast','easeOutBack');
	$('#PlayPause').css('background-position','3px -21px');
}

function radioTextLinkClick() {
	$('#PlayPause').click();
	if ($('#CS_inline_trigger').html().indexOf('Listen') != -1) {
		$('#CS_inline_trigger').html('Playing <span id="inlineDots"></span>');
		var dots = $('#inlineDots');
		dotsCounter = setInterval(function() {
		    if (dots.html().length == 3){
		        dots.html('');
			} else {
				dots.append('.');
			};	
		}, 400);
	} else {
		$('#CS_inline_trigger').html('Listen ▶');
	}
}

/* --- EQUAL BOX HEIGHTS --- */

function eqlBox(box){
	if (box.length){
		tallest = 0;
		total = box.length;
		i = 0;
		box.css('height','auto');
		box.each(function(){
			i++;
			if ($(this).height() > tallest){
				tallest = $(this).height();
			};
			if (i == total){
				box.css('height',tallest);
			};
		});
		mainHeight();
	};
};

/* --- VERTICAL CENTER SLIDESHOW ELEMENTS --- */

function vCenter(){
	holderHeight = $('.holder').height() * .9;
	$('.holder').css('line-height',holderHeight+'px');
};

/* --- FORCE DISPLAY HEADER NAV ON RESIZE --- */

function forceNav(){
	if ((ww > 550) && ($('.collapsed').length)){
		$('header nav').removeAttr('style');
	};
};

/* --- HIDE AND SHOW BLOG CATAGORIES (because masonry is a bloated piece of crap) -- */

function hideShowCats(cat){
	if (cat != "all"){
		$('#Grid').find('.feat_box_alt:not(.'+cat+')').animate({ height: '0', width: '0', opacity: '0' }, 'slow', function(){
			$(this).removeAttr('style');
			$(this).hide();
			mainHeight();
		});
		$('#Grid').find('.feat_box_alt.'+cat).fadeIn('slow', function(){
			mainHeight();
		});
		
	} else {
		$('#Grid').find('.feat_box_alt:not(.'+cat+')').fadeIn('slow',function(){
			mainHeight();
		});
		
	};
};

/* --- EVENT LISTENERS --- */

function clickListen(){	
	
	$('#NavToggle').toggle(function(){
		$(this).find('.tg').addClass('hidden');
		$(this).find('.eg').addClass('only');
		$('header nav').slideDown();
		$('header nav').removeClass('collapsed');
		$('header nav').addClass('expanded');
	}, function(){
		$(this).find('.tg').removeClass('hidden');
		$(this).find('.eg').removeClass('only');
		$('header nav').slideUp();
		$('header nav').addClass('collapsed');
		$('header nav').removeClass('expanded');
	});
	
	$('a').click(function(){
		if ($('header nav').hasClass('expanded') && !$(this).closest('li').hasClass('about_nav_link')){
			$('#NavToggle').click();
		};
	});
	
	$('.filter').click(function(){
		$('#DropToggle').click();
		$('.filter').removeClass('active');
		$(this).addClass('active');
		
		var cat = $(this).attr('data-cat');
		var pos = $(this).position();
		var fw = $(this).width();
		var carratDest = fw/2 + pos.left - 10;
		$('#Carrat').animate({left: carratDest},'fast','easeOutBack');
		hideShowCats(cat);
	});
	
	$('#DropToggle').toggle(function(){
		$('#Filters').addClass('expanded');
	},function(){
		$('#Filters').removeClass('expanded');
	});
	
	$('header nav li').hover(function(){
		if(mobile != true && $.support.leadingWhitespace == true){
			var linkPos = $(this).position();
			var linkMar = parseInt($(this).find('a').css('marginLeft'));
			var linkW = $(this).find('a').width();
			var navPos = $('header nav').position();
			var slidePos = linkPos.left + navPos.left + linkMar + 19;
			$('#Slider').css({left:slidePos+'px', opacity: '.999', width:linkW+'px'});
		};
	},function(){
		$('#Slider').css('opacity','0');
	});
	
	$('.ajaxable_post').click(function(){
		$(this).find('.prop').click();
	});
	
	$('.about_menu_wrapper div').toggle(function(){
		$(this).removeClass('collapsed');
		$(this).addClass('expanded');
		$('.sub-menu').slideDown();
	}, function(){
		$(this).removeClass('expanded');
		$(this).addClass('collapsed');
		$('.sub-menu').slideUp();
	});
	
	//CS popup player link
	$('#CS_popup_link').click(function(e){
		e.preventDefault();
		$('#GUI').fadeOut('slow');
		window.open($(this).attr('href'), 'popup_player', 'width=550,height=260,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=yes,resizable=yes,left=120,top=250,screenX=120,screenY=250');
	});
	
	//text link to start CS player
	$('#CS_inline_trigger').click(function(){
		radioTextLinkClick();
	});
	
	//more info for CS tracks
	$('.track_more_trigger').click(function(){
		var track_id = $(this).data('track_id');
		var more = $(this).next('.track_more');
		more.toggle('slow', 'easeOutBack', function(){
			$.getJSON('http://23.21.68.2/admin/services.php?callback=?', {q:'track_detail',id:track_id}, function(data){
				var coverArt = data.TrackInfo.CoverArt[0] ? '<img src="../NewMusic_files/' + data.TrackInfo.CoverArt[0] + '" />' : '';
				var buyLink = data.TrackInfo.AmazonDetailPage[0] ? '<a href="../NewMusic_files/' + data.TrackInfo.AmazonDetailPage[0] + '">Buy on Amazon</a><br />' : '';
				var albumLabel = data.TrackInfo.Label ? data.TrackInfo.Label + ' ' : '';
				var albumYear = data.TrackInfo.Year ? '(' + albumLabel + data.TrackInfo.Year + ')' : '';
				var performers = data.TrackInfo.Performers ? 'Performed by: ' + data.TrackInfo.Performers + '<br />' : '';
				var yearComposed = data.TrackInfo.Composed ? 'Work composed: ' + data.TrackInfo.Composed + '<br />' : '';
				more.children('.loading').fadeOut('slow', function(){
					$(this).next('.inner').html(
						coverArt +
						'From: <em>' + data.TrackInfo.Album + '</em> ' + albumYear + '<br />' +  
						performers +
						yearComposed +
						buyLink + '<div style="clear:both"></div>'
					).animate({height:'auto'}, 'slow').fadeIn();
					$(this).parent().animate({height: $(this).next('.inner').height() + 'px'});
				});
			});
		});
	});

	$('.job_desc').click(function(){
		var show = $(this).data('show');
		$('html, body').animate({ scrollTop: $(show).offset().top - 125 }, 2000);
	});
};

/* --- RESPONSIVE IFRAMES --- */

function wrapIframes(){
	$("#Content").find('.lower').find('iframe').each(function(){
		$(this).attr('height','100%').attr('width','100%');
		if ($(this).attr('src').indexOf('soundcloud') == -1)
			$(this).wrap('<div class="iframe_wrapper" />');
		else
			$(this).wrap('<div class="iframe_wrapper soundcloud" />');
		mainHeight();
	});
}


/* --- CREATE AND THEN THANKFULLY DESTROY THE AWFUL DISQUS (AND NOT A MOMENT TOO SOON..) --- */

function disqusHeight(){
	if (($('.post').length) && ($('.single').length)){ // if on single blog view
		var disqus_shortname = 'newmusicusa';
	    
	    (function() {
	        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	        dsq.src = 'https://newmusicusa.disqus.com/embed.js';
	        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	    })();
		
		checkHeight = setInterval(function() {
		    mainHeight();
		}, 3000);
		
	} else if (($('.post').length) && ($('.grid').length)){ // if on blog landing view
		if ($.support.leadingWhitespace == true){
			$('.ajaxable_post:first-of-type .feat_box_alt').addClass('latest');
		};
		
		 var disqus_shortname = 'newmusicusa';

        (function () {
            var s = document.createElement('script'); s.async = true;
            s.type = 'text/javascript';
            s.src = 'https://newmusicusa.disqus.com/count.js';
            (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
        }());     
		
	} else {
		$('script').each(function(){
			if (this.src.indexOf("embed.js") > -1 || this.src.indexOf("count.js") > -1){
				$(this).remove();
			};
		});
		if (typeof checkHeight != 'undefined'){
			clearInterval(checkHeight);
		};
	};
};

/* --- AJAX POSTS LOAD --- */

function ajaxPosts(){
	if ($('.grid').length){

		if ($('.post').length){
			var pageNum = parseInt($('#pager-info').data('posts_startpage')) + 1;
			var max = parseInt($('#pager-info').data('posts_maxpages'));
			var nextLink = $('#pager-info').data('posts_nextlink');
		} else if ($('.page').length){
			var pageNum = parseInt($('#pager-info').data('mustor_startpage')) + 1;
			var max = parseInt($('#pager-info').data('mustor_maxpages'));
			var nextLink = $('#pager-info').data('mustor_nextlink');
		};

		$('#LoadMore').click(function() {

			if(pageNum <= max) {
	
				$(this).find('#Message').text('Loading Posts');
				$(this).find('#Message.ms').text('Loading Musician Stories');
				$(this).append('<span id="MoreDots"></div>');
				var dots = $(this).find('#MoreDots');
				moreDotsCounter = setInterval(function() {
				    if (dots.html().length == 3){
				        dots.html('');
					} else {
						dots.append('.')
					};	
				}, 400);
				
				$('.ib.last').before('<div id="AjaxPostsWrapper" class="ib"></div>');
				
				$('#AjaxPostsWrapper').load(nextLink + ' .ajaxable_post',
					function(response, status, xhr) {
						if (status == "error") {
						    $(this).find('#Message').text('Loading failed');
							clearInterval(moreDotsCounter);
							$('#MoreDots').remove();
						  }
						
						if ($('.page').length){
							var currentFilter = "all";
						} else {
							var currentFilter = $('.filter.active').attr('data-cat');
						};
						
						if (currentFilter != "all"){
							$('#AjaxPostsWrapper').find('.feat_box_alt').css('opacity','0');
							$('#AjaxPostsWrapper').find('.feat_box_alt:not(.'+currentFilter+')').css('display','none');
						};
						var newContent = $('#AjaxPostsWrapper').html();
						$('#AjaxPostsWrapper').remove();
						$('.ib.last').before(newContent);
						eqlBox($('.feat_box_alt .lower'));	
						mainHeight();
						$('.feat_box_alt').animate({opacity: '.999'},'slow');
						
						pageNum++;
						nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);
						
						if(pageNum <= max) {
							$('#LoadMore').find('#Message').text('Load More Posts');
							$('#LoadMore').find('#Message.ms').text('Load More Musician Stories');
							clearInterval(moreDotsCounter);
							$('#MoreDots').remove();
						} else {
							$('#LoadMore').addClass('no_more').find('#Message').text('No More Posts to Load');
							$('#LoadMore').addClass('no_more').find('#Message.ms').text('No More Musician Stories to Load');
							clearInterval(moreDotsCounter);
							$('#MoreDots').remove();
						}
					}
				);
			} else {
				$('#LoadMore').addClass('no_more').find('#Message').text('No More Posts to Load');
				$('#LoadMore').addClass('no_more').find('#Message.ms').text('No More Musician Stories to Load');
			}	
	
			return false;
		});
	}
}

/* --- NANO SCROLLER... EUGH... --- */

(function(c,f,g){var j,h,k,l,m;l={paneClass:"pane",sliderClass:"slider",contentClass:"content",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null};j="Microsoft Internet Explorer"===f.navigator.appName&&/msie 7./i.test(f.navigator.appVersion)&&f.ActiveXObject;h=null;m=function(){var b,a;b=g.createElement("div");a=b.style;a.position="absolute";a.width="100px";a.height="100px";a.overflow="scroll";a.top="-9999px";g.body.appendChild(b);
a=b.offsetWidth-b.clientWidth;g.body.removeChild(b);return a};k=function(){function b(a,b){this.el=a;this.options=b;h||(h=m());this.$el=c(this.el);this.doc=c(g);this.win=c(f);this.generate();this.createEvents();this.addEvents();this.reset()}b.prototype.preventScrolling=function(a,b){this.isActive&&("DOMMouseScroll"===a.type?("down"===b&&0<a.originalEvent.detail||"up"===b&&0>a.originalEvent.detail)&&a.preventDefault():"mousewheel"===a.type&&a.originalEvent&&a.originalEvent.wheelDelta&&("down"===b&&
0>a.originalEvent.wheelDelta||"up"===b&&0<a.originalEvent.wheelDelta)&&a.preventDefault())};b.prototype.updateScrollValues=function(){var a;a=this.content[0];this.maxScrollTop=a.scrollHeight-a.clientHeight;this.contentScrollTop=a.scrollTop;this.maxSliderTop=this.paneHeight-this.sliderHeight;this.sliderTop=this.contentScrollTop*this.maxSliderTop/this.maxScrollTop};b.prototype.createEvents=function(){var a=this;this.events={down:function(b){a.isBeingDragged=!0;a.offsetY=b.pageY-a.slider.offset().top;
a.pane.addClass("active");a.doc.bind("mousemove",a.events.drag).bind("mouseup",a.events.up);return!1},drag:function(b){a.sliderY=b.pageY-a.$el.offset().top-a.offsetY;a.scroll();a.updateScrollValues();a.contentScrollTop>=a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&a.$el.trigger("scrolltop");return!1},up:function(){a.isBeingDragged=!1;a.pane.removeClass("active");a.doc.unbind("mousemove",a.events.drag).unbind("mouseup",a.events.up);return!1},resize:function(){a.reset()},panedown:function(b){a.sliderY=
(b.offsetY||b.originalEvent.layerY)-0.5*a.sliderHeight;a.scroll();a.events.down(b);return!1},scroll:function(b){a.isBeingDragged||(a.updateScrollValues(),a.sliderY=a.sliderTop,a.slider.css({top:a.sliderTop}),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,"down"),a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,"up"),a.$el.trigger("scrolltop"))))},wheel:function(b){if(null!=b)return a.sliderY+=
-b.wheelDeltaY||-b.delta,a.scroll(),!1}}};b.prototype.addEvents=function(){var a;this.removeEvents();a=this.events;this.options.disableResize||this.win.bind("resize",a.resize);this.slider.bind("mousedown",a.down);this.pane.bind("mousedown",a.panedown).bind("mousewheel DOMMouseScroll",a.wheel);this.content.bind("scroll mousewheel DOMMouseScroll touchmove",a.scroll)};b.prototype.removeEvents=function(){var a;a=this.events;this.win.unbind("resize",a.resize);this.slider.unbind();this.pane.unbind();this.content.unbind("scroll mousewheel DOMMouseScroll touchmove",
a.scroll).unbind("keydown",a.keydown).unbind("keyup",a.keyup)};b.prototype.generate=function(){var a,b,i,c,d;i=this.options;c=i.paneClass;d=i.sliderClass;a=i.contentClass;!this.$el.find(""+c).length&&!this.$el.find(""+d).length&&this.$el.append('<div class="'+c+'"><div class="'+d+'" /></div>');this.content=this.$el.children("."+a);this.content.attr("tabindex",0);this.slider=this.$el.find("."+d);this.pane=this.$el.find("."+c);h&&(b={right:-h},this.$el.addClass("has-scrollbar"));i.iOSNativeScrolling&&
(null==b&&(b={}),b.WebkitOverflowScrolling="touch");null!=b&&this.content.css(b);i.alwaysVisible&&this.pane.css({opacity:1,visibility:"visible"});return this};b.prototype.restore=function(){this.stopped=!1;this.pane.show();return this.addEvents()};b.prototype.reset=function(){var a,b,c,f,d,g,e;this.$el.find("."+this.options.paneClass).length||this.generate().stop();this.stopped&&this.restore();a=this.content[0];c=a.style;f=c.overflowY;j&&this.content.css({height:this.content.height()});b=a.scrollHeight+
h;g=this.pane.outerHeight();e=parseInt(this.pane.css("top"),10);d=parseInt(this.pane.css("bottom"),10);d=g+e+d;e=Math.round(d/b*d);e<this.options.sliderMinHeight?e=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&e>this.options.sliderMaxHeight&&(e=this.options.sliderMaxHeight);"scroll"===f&&"scroll"!==c.overflowX&&(e+=h);this.maxSliderTop=d-e;this.contentHeight=b;this.paneHeight=g;this.paneOuterHeight=d;this.sliderHeight=e;this.slider.height(e);this.events.scroll();this.pane.show();
this.isActive=!0;this.pane.outerHeight(!0)>=a.scrollHeight&&"scroll"!==f?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&"scroll"===f?this.slider.hide():this.slider.show();return this};b.prototype.scroll=function(){this.sliderY=Math.max(0,this.sliderY);this.sliderY=Math.min(this.maxSliderTop,this.sliderY);this.content.scrollTop(-1*((this.paneHeight-this.contentHeight+h)*this.sliderY/this.maxSliderTop));this.slider.css({top:this.sliderY});return this};b.prototype.scrollBottom=
function(a){this.reset();this.content.scrollTop(this.contentHeight-this.content.height()-a).trigger("mousewheel");return this};b.prototype.scrollTop=function(a){this.reset();this.content.scrollTop(+a).trigger("mousewheel");return this};b.prototype.scrollTo=function(a){this.reset();a=c(a).offset().top;a>this.maxSliderTop&&(a/=this.contentHeight,this.sliderY=a*=this.maxSliderTop,this.scroll());return this};b.prototype.stop=function(){this.stopped=!0;this.removeEvents();this.pane.hide();return this};
b.prototype.flash=function(){var a=this;this.pane.addClass("flashed");setTimeout(function(){a.pane.removeClass("flashed")},this.options.flashDelay);return this};return b}();c.fn.nanoScroller=function(b){return this.each(function(){var a;if(!(a=this.nanoscroller))a=c.extend({},l),b&&"object"===typeof b&&(a=c.extend(a,b)),this.nanoscroller=a=new k(this,a);if(b&&"object"===typeof b){c.extend(a.options,b);if(b.scrollBottom)return a.scrollBottom(b.scrollBottom);if(b.scrollTop)return a.scrollTop(b.scrollTop);
if(b.scrollTo)return a.scrollTo(b.scrollTo);if("bottom"===b.scroll)return a.scrollBottom(0);if("top"===b.scroll)return a.scrollTop(0);if(b.scroll&&b.scroll instanceof c)return a.scrollTo(b.scroll);if(b.stop)return a.stop();if(b.flash)return a.flash()}return a.reset()})}})(jQuery,window,document);

/* --- FORM UI, VALIDATION AND SUBMISSION --- */


function clearProducts(radio){
	if(radio.attr('name') == "input_1"){
		$('input[name="input_11"]').prop('checked', false);
		$('#Amount input').val('');
	} else if (radio.attr('name') == "input_11"){
		$('input[name="input_1"]').prop('checked', false);
	};
};

function donType(option){
	donTypeOp = option.val();
	if(option.val() == "Public" || option.val() == "Tribute"){
		$('.hidden_field').slideDown('slow','easeOutBack');
		var a = $('.display_name').text();
		if (option.val() == "Tribute"){
			$('.display_name').text('Enter the name of the person or organization you would like to associate your contribution with .');
		} else {
			$('.display_name').text(a);
		};
	} else {
		$('.hidden_field').slideUp('slow','easeOutBack');
	};
};

function cleanCC(){
	var userCC = $('#CC').val();
	var cleanCC = userCC.replace(/[^0-9]/g, ''); 
	$('input[name="input_7.1"]').val(cleanCC);
};

function donateForm(){
	if ($('#Donate').length){
		
		//detect mobile or tablet
		if(mobile == true || typeof isIE != 'undefined'){
		 	$('#Donate').addClass('mobile');
		}
		
		if($('.confirmed').length){
			
			$('#ThankYou').fadeIn();
		
		} else {	
			
			//make sure only one type of donation can be submitted
			$('#Amount input').focus(function(){
				$('#AmountSelect').click();
			});
			
			if(mobile != true){
				
				//create drop downs
				$('.select_wrapper').each(function(){
					select = $(this);
					select.find('option').each(function(){
						var label = $(this).html();
						var opIndex = $(this).index();
						if ($(this).val().length){
							select.find('ul').append('<li>'+label+'</li>');
						} else {
							select.find('ul').append('<li style="display: none;">'+label+'</li>');
						};
						if (($(this).attr('selected') == 'selected') && (opIndex != 0)){
							select.find('.selected').addClass('in_use').html(label);
						};
					});

				});
		
				//listen for toggle
				$('.toggle_select').toggle(function(){
					$(this).closest('.select_wrapper').find('.tab_trap').focus();
				}, function(){
					$(this).closest('.select_wrapper').find('.tab_trap').blur();
				});
			
			
			
				//listen for select focus/blur and fade in drop downs
				$('.select_wrapper').find('.tab_trap').focus(function(){
					$(this).closest('.select_wrapper').find('.nano').fadeIn('fast', function(){
					 	var notFF = (window.mozInnerScreenX == null);
						if(notFF) {
							$('.nano').nanoScroller();
						};
					});
					$(this).addClass('open');
				});
			
				$('.select_wrapper').find('.tab_trap').blur(function(){
					$(this).closest('.select_wrapper').find('.nano').fadeOut('fast');
					$(this).removeClass('open');
				});
		
				//listen for li clicks
				$('.select_wrapper').find('li').click(function(){
					var parentWrapper = $(this).closest('.select_wrapper');
					var liIndex = $(this).index();
					var liText = $(this).text();
					parentWrapper.find('option').eq(liIndex).attr('selected','selected').change();
					parentWrapper.find('.selected').addClass('in_use').html(liText);
				
					var nextFocus = parseInt(parentWrapper.find('.tab_trap').attr('tabindex')) + 1;
					var skipFocus = nextFocus + 1;
					if ($('[tabindex='+nextFocus+']').closest('.hidden_field').length && !$('[tabindex='+nextFocus+']').closest('.hidden_field').is(':visible')){
						$('[tabindex='+skipFocus+']').focus();
					} else {
						$('[tabindex='+nextFocus+']').focus();
					};
					parentWrapper.find('select').valid();
				});
			};
			
			function hideLabel(a,b) {
				$(a).siblings('label').css('color', b);
			};
			
			//fade labels	
			$('input[type=text]').each(function(){
		    	if ($(this).val()){
					hideLabel(this, '#fff');
			    };

				$(this).focus(function(){
					if (!$(this).val()){
						hideLabel(this, '#ccc');
					};
				});

				$(this).blur(function(){
					if(!$(this).val()){
						hideLabel(this, '#808080');
				    };
				});

				$(this).keypress(function(){
					hideLabel(this, '#fff');
				});
			
				$(this).bind('paste', function(e){
					hideLabel(this, '#fff');
				});
			});
	
		
			//make clicking hella easier
			$('.radio_wrapper').click(function(){
				$(this).find('input')[0].click();			
			});
			$('.checkbox_wrapper.subscribe').click(function(){
				$(this).find('input')[0].click();
			});
			
			//auto populate billing
			$('.checkbox_wrapper.billing').click(function(){
				$(this).find('input')[0].click();
			
				function copyData(origin) {
					if ($(origin).val().length){
						var idLength = origin.length;
						var input = origin.slice(8,idLength);
						$('#Billing'+input).val($('#Address'+input).val()).focus().blur();
						hideLabel($('#Billing'+input),'#fff');
						$('#BillingZip').focus();
					};
				};
			
				$('#AddressCountry').find('option').each(function(){
					if ($(this).attr('selected') == 'selected'){
						var sel = $(this).index();
						var label = $(this).text();
						$('#BillingCountry').find('option').eq(sel).attr('selected','selected').change(); 
						$('#BillingCountry').siblings('.styled_select').find('.selected').addClass('in_use').html(label);
					
					};
				});
			
				copyData('#AddressSt1');
				copyData('#AddressSt2');
				copyData('#AddressCity');
				copyData('#AddressState');
				copyData('#AddressZip');
					
			});
		
		
		
		
			//validation
			/* $.getScript(templateDir+"/js/jquery.validate.min.js", function(data, textStatus, jqxhr) { */
			
				$('#Donate').fadeIn();
				mainHeight();
			
				
				$('#Donate').validate({
					groups: {
						name: "input_3.3 input_3.6"
					},
					rules: {
					   	input_1: {
									required: function(){
										return $('input[name="input_11"]').prop('checked') == false;
									}
								},
						input_2: {
									required: function() {
										return $('input[name="input_11"]').prop('checked') == true;
									},
									number: true,
									min: 1
								},
						"input_7.2[]": { 
									required: true
								},	
						input_8: {required: true},
						"input_3.3": {required: true},
						"input_3.6": {required: true},
						"input_4.1": {required: true},
						"input_4.3": {required: true},
						"input_4.4": {required: true},
						"input_4.5": {required: true},
						"input_6": {
								required: true,
								email: true
							},
						cc: {
									required: true,
									creditcard: true,
									minlength: 12
								},
						"input_7.3": {
									required: true,
									minlength: 3,
									maxlength: 4,
									digits: true
								},
						"input_7.5": {required: true},
						"input_10.1": {required: true},
						"input_10.3": {required: true},
						"input_10.4": {required: true},
						"input_10.5": {required: true},
						input_12: {
							required: {
								depends: function(element){
									return donTypeOp == "Public" || "Tribute";
								}
							}
						}
					},
					errorPlacement: function(error, element) {
						var name = element.attr("name");
						if (name == "input_1")
					    	error.insertAfter("#EndDonations");
						else if (name == "input_2")
					    	error.insertAfter("#EndDonations");
						else if (name == "input_8" || name == "input_12")
					    	error.insertAfter("#EndDonType");
						else if (name == "input_3.3" || name == "input_3.6")
					    	error.insertAfter("#EndName");
						else if (name == "input_4.1" || name == "input_4.3" || name == "input_4.4" || name == "input_4.5")
					    	error.insertAfter("#EndAddress");
						else if (name == "input_6")
						    	error.insertAfter("#EndEmail");
						else if (name == "input_10.1" || name == "input_10.3" || name == "input_10.4" || name == "input_10.5")
						    	error.insertAfter("#EndBilling");
						else if (name == "cc" || "input_7.2[]" || name == "input_7.3" || name == "input_7.5")
								error.insertAfter("#EndPayment");
					},
					messages: {
						input_1: {required: "Please select a donation amount."},
						input_2: {
									required: "Please enter a donation amount.",
									number: "Please enter only numbers."
								},
						input_8: {required: "Please select a donation type."},
						"input_3.3": {required: "Please enter a name."},
						"input_3.6": {required: "Please enter a name."},
						"input_4.1": {required: "Please enter a street address."},
						"input_4.3": {required: "Please enter a city."},
						"input_4.4": {required: "Please enter a state or region."},
						"input_4.5": {required: "Please enter a postal or zip code."},
						"input_6": {
									required: "Please enter an email address.",
									email: "Please enter a valid email address."
								},
						"input_10.1": {required: "Please enter a street address."},
						"input_10.3": {required: "Please enter a city."},
						"input_10.4": {required: "Please enter a state or region."},
						"input_10.5": {required: "Please enter a postal or zip code."},
						"input_7.5": {required: "Please enter the cardholder name."},
						cc: {
									required: "Please enter a credit card number.",
									creditcard: "Please enter a valid credit card number."
								},
						"input_7.2[]": {
									required: "Please select an expiration date.",
								},
						"input_7.3": {
									required: "Please enter a CVV number.",
									minlength: "Please enter a valid CVV number.",
									maxlength: "Please enter a valid CVV number.",
									digits: "Please enter a valid CVV number."
								},
						input_12: {
							required: "Please enter a name."
						}
					},
					invalidHandler: function(form) {
						checkHeight = setInterval(function() {
						    mainHeight();
						}, 3000);
					},
					submitHandler: function(form){
						form.submit(); 
						return false;
					}
				}); 
			/* }); */ 
		
		};	
			
	};
};

/* --- Counterstream Search Form --- */
function csSearchForm() {
	if ($('form#gform_3').length) {
		
		//detect mobile or tablet
		if(mobile == true || typeof isIE != 'undefined'){
		 	$('#gform_3').addClass('mobile');
		}
		
		if(mobile != true){
			
			//create drop downs
			$('.select_wrapper').each(function(){
				select = $(this);
				select.find('option').each(function(){
					var label = $(this).html();
					var opIndex = $(this).index();
					if ($(this).val().length){
						select.find('ul').append('<li>'+label+'</li>');
					} else {
						select.find('ul').append('<li style="display: none;">'+label+'</li>');
					};
					if (($(this).attr('selected') == 'selected') && (opIndex != 0)){
						select.find('.selected').addClass('in_use').html(label);
					};
				});

			});
	
			//listen for toggle
			$('.toggle_select').toggle(function(){
				$(this).closest('.select_wrapper').find('.tab_trap').focus();
			}, function(){
				$(this).closest('.select_wrapper').find('.tab_trap').blur();
			});
		
		
		
			//listen for select focus/blur and fade in drop downs
			$('.select_wrapper').find('.tab_trap').focus(function(){
				$(this).closest('.select_wrapper').find('.nano').fadeIn('fast', function(){
				 	var notFF = (window.mozInnerScreenX == null);
					if(notFF) {
						$('.nano').nanoScroller();
					};
				});
				$(this).addClass('open');
			});
		
			$('.select_wrapper').find('.tab_trap').blur(function(){
				$(this).closest('.select_wrapper').find('.nano').fadeOut('fast');
				$(this).removeClass('open');
			});
	
			//listen for li clicks
			$('.select_wrapper').find('li').click(function(){
				var parentWrapper = $(this).closest('.select_wrapper');
				var liIndex = $(this).index();
				var liText = $(this).text();
				parentWrapper.find('option').eq(liIndex).attr('selected','selected').change();
				parentWrapper.find('.selected').addClass('in_use').html(liText);
			
				var nextFocus = parseInt(parentWrapper.find('.tab_trap').attr('tabindex')) + 1;
				var skipFocus = nextFocus + 1;
				if ($('[tabindex='+nextFocus+']').closest('.hidden_field').length && !$('[tabindex='+nextFocus+']').closest('.hidden_field').is(':visible')){
					$('[tabindex='+skipFocus+']').focus();
				} else {
					$('[tabindex='+nextFocus+']').focus();
				};
				parentWrapper.find('select').valid();
			});
		};
	}
}

/* --- PREPARE INLINE IMAGES --- */

function prepInlineImg(){
	$('.wysiwyg').find('img').load(function(){
		$(this).removeAttr('height').removeAttr('width');
		$(this).closest('.wp-caption').removeAttr('style');
		mainHeight();	// Fire again when inline (auto-height) images are loaded
	});
}

/* --- PARALLAX SCROLL BACKGROUND --- */

/*
$(window).scroll(function(){
	var scrollPos = $(this).scrollTop();
	var multiplier = -0.225;
	var offSet = scrollPos * multiplier;
	$('body').css('background-position', '0 '+offSet+'px');
})
*/

/* --- DJAX --- */

$.fn.djax = function (selector, exceptions) {

	if (!history.pushState) {
		return $(this);
	};

	var self = this,
	    blockSelector = selector,
	    excludes = (exceptions && exceptions.length) ? exceptions : [],
		djaxing = false;

	window.history.replaceState(
		{
			'url' : window.location.href,
			'title' : $('title').text()
		},
		$('title').text(),
		window.location.href
	);
	
	self.clearDjaxing = function() {
		self.djaxing = false;
	};

	self.attachClick = function (element, event) {

		var link = $(element),
			exception = false;

		$.each(excludes, function (index, exclusion) {
			if (link.attr('href').indexOf(exclusion) !== -1) {
				exception = true;
			}
			if (window.location.href.indexOf(exclusion) !== -1) {
				exception = true;
			}
		});

		if (exception) {
			return $(element);
		};

		event.preventDefault();

		if (self.djaxing) {
			setTimeout(self.clearDjaxing, 1000);
			return $(element);
		};

		$(window).trigger('djaxClick');
		self.reqUrl = link.attr('href');
		self.triggered = false;
		self.navigate(link.attr('href'), true);
	};

	self.navigate = function (url, add) {

		var blocks = $(blockSelector);

		self.djaxing = true;

		$.get(url, function (response) {
			if (url !== self.reqUrl) {
				self.navigate(self.reqUrl, false);
				return true;
			};

			var result = $('"' + response + '"'),
			    newBlocks = $(result).find(blockSelector);
			
			if (add) {
				window.history.pushState(
					{
						'url' : url,
						'title' : $(result).filter('title').text()
					},
					$(result).filter('title').text(),
					url
				);
			};

			$('title').text($(result).filter('title').text());

			blocks.each(function () {

				var id = '"#' + $(this).attr('id') + '"',
				    newBlock = newBlocks.filter(id),
				    block = $(this);

				if (newBlock.length) {
					if (block.html() !== newBlock.html()) {
						block.replaceWith(newBlock);
					};
				} else {
					block.remove();
				};

			});

			$.each(newBlocks, function () {

				var newBlock = $(this),
				    id = '#' + $(this).attr('id'),
				    $previousSibling;

				if (!$(id).length) {

					$previousSibling = $(result).find(id).prev();

					if ($previousSibling.length) {
						newBlock.insertAfter('#' + $previousSibling.attr('id'));
					} else {
						newBlock.prependTo('#' + newBlock.parent().attr('id'));
					};
				};

			});

			

			if (!self.triggered) {
				$(window).trigger(
					'djaxLoad',
					[{
						'url' : url,
						'title' : $(result).filter('title').text(),
						'response' : response
					}]
				);
				self.triggered = true;
				self.djaxing = false;
			};
		});
	};

	
	$(window).bind('popstate', function (event) {
		self.triggered = false;
		if (event.originalEvent.state) {
			self.reqUrl = event.originalEvent.state.url;
			self.navigate(event.originalEvent.state.url, false);
		};
	});

};
/*end dajax*/

/* --- EASING --- */


$.easing['jswing'] = $.easing['swing'];

$.extend( $.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return $.easing[$.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}
});

/* --- FAQ TABLE --- */

function faqTable(){
	if($('.empty').length){
		var table = $('.chart');
		$('.empty').replaceWith(table);
		mainHeight();
	};
};

/* ================ DOCUMENT READY BEGIN ================ */

$(function(){
	
/* --- SET VARS -- */

ww = $(window).width();

/* --- INSTANTIATE DJAX --- */

$('body').djax('.ajax', ['pdf','doc','admin', 'logo', 'pls', 'wpl', 'cs_popup']);

/* --- TEST FOR MOBILE/TABLET --- */

mobileTest();

/* --- DETECT SVG SUPPORT --- */
	
var svgSupport = (window.SVGAngle) ? true : false;

var svgSupportAlt = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) ? true : false;

var ff3x = (/Gecko/i.test(navigator.userAgent) && /rv:1.9/i.test(navigator.userAgent)) ? true : false;

var isltIE8 = ($.support.leadingWhitespace) ? true : false;

if (svgSupport == false || svgSupportAlt == false || isltIE8 == false || ff3x == true) {
	
	$('.wysiwyg').find('blockquote').each(function(){
		$(this).addClass('svg');
	});
	
	$('.svg').each(function(){					
		var svgBI = $(this).css('background-image');
		if (svgBI.indexOf("svg") > -1){
			if (isltIE8 == false) {	
				pngBI = svgBI.replace(/.svg/g, '.1x.png'); // serve non-scaling png assets to IE8
			} else {
				pngBI = svgBI.replace(/.svg/g, '.2x.png'); // serve high-ppi png assets to IE9, Android 2.x, Firefox 3.x etc
			};
			$(this).css('background-image',pngBI);
		};
	});	

	logoLoaded();
};
	
/* --- INSTATIATE BG SLIDESHOW --- */

runBGSlide();

/* --- VERICAL CENTER SLIDESHOW ELEMENTS --- */

vCenter();

/* --- FAQ TABLE ---*/

faqTable();

/* --- GIVE MAIN HEIGHT --- */

mainHeight();

/* --- PREPARE INLINE IMAGES --- */

prepInlineImg();

/* --- FEAT BOX TEXT SIZE --- */

featTextSize();

/* --- EQUAL BOX HEIGHTS --- */

eqlBox($('.grid_box'));
eqlBox($('.feat_box_alt .lower'));

/* --- RESPONSIVE IFRAMES --- */

wrapIframes();

/* --- AUTO UPDATE MAIN HEIGHT IF DISQUS --- */

disqusHeight();

/* --- AJAX POSTS LOAD ---*/

ajaxPosts();

/* --- CLICK LISTENERS --- */

$('#BackToTop').click(function(){	// does not work in seperate function as instantiates multiple times
	$('#NavToggle').click();
	$('html,body').animate({scrollTop: 0},'fast');
});

clickListen();

/* --- DONATE FORM UI, VALIDATION AND SUBMISSION --- */

donateForm();

/* --- COUNTERSTREAM SEARCH FORM --- */

csSearchForm();

/* --- FUNCTIONS TO RUN ON DJAX OR RESIZE--- */

function run() {
	ww = $(window).width();
	vCenter();
	mainHeight();
	featTextSize();
	eqlBox($('.grid_box'));	
	eqlBox($('.feat_box_alt .lower'));	
};

/* --- FIRE ON DJAX CLICK --- */

$(window).bind('djaxClick', function(e, data) {
	if($('#FeatImg.home').length){
		$('#MovingParts').cycle('stop');
	};
	if($('#HeroCycle').length){
		$('#HeroMovingParts').cycle('stop');
	};
	$('#PageLoader').fadeIn();
});

/* --- FIRE ON DJAX LOAD --- 

$(window).bind('djaxLoad', function(e, data) {
	//console.log('DJAX LOAD');
	_gaq.push(['_trackPageview']);
	mobileTest();
	runBGSlide();
	clickListen();
	prepInlineImg();
	faqTable();
	wrapIframes();
	run();
	$('html,body').animate({scrollTop: 0},'fast');
});
*/

/* --- FIRE ON RESIZE --- */

$(window).resize(function(){
	forceNav();
	run();
});

/* === DOCUMENT READY END === */

});