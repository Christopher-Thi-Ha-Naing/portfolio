$(function() {
  var $grid = $('.gridder').isotope({
    itemSelector: '.grid-item',
    percentPosition: true
  });
  
  // filter items on button click
  $('.filterable-button').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
  
  $('.testi-carousel').owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    items: 1,
  });
  
  // Nice select
  $('.vg-select').niceSelect();
  
  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();
  
  // Page animation initialize
  new WOW().init();
  
  // Back to top
  var backTop = $(".btn-back_to_top");
  
  $(window).scroll(function() {
    if($(document).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    }
    else if($(document).scrollTop() < 400) {
      backTop.css('visibility', 'hidden');
    }
  });
  
  backTop.click(function() {
    $('html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
  
  $.fn.toggleSelected = function(options) {
    var defaults = $.extend({
      classes: 'selected',
      itemSelector: this.children(),
    });
    
    return this.each(function() {
      var o = defaults;
      var sel = o.itemSelector;
      
      sel.click(function() {
        var self = $(this);
        self.addClass(o.classes);
        self.siblings().removeClass(o.classes);
      });
    });
  };
  
  $('[data-toggle="selected"]').toggleSelected();
});

$(document).ready(function () {
  
  /* Sticky nvigation */
  
  var sticky = {
    $sticky: $('.sticky'),
    offsets: [],
    targets: [],
    stickyTop: null,
    
    set: function () {
      var self = this;
      
      var windowTop = Math.floor($(window).scrollTop());
      
      self.offsets = [];
      self.targets = [];
      
      // Get current top position of sticky element
      self.stickyTop = self.$sticky.data('offset') ? self.$sticky.css('position', 'absolute').data('offset') : self.$sticky.css('position', 'absolute').offset().top;
      
      // Cache all targets and their top positions
      self.$sticky.find('a').map(function () {
        var $el = $(this),
        href = $el.data('target') || $el.attr('href'),
        $href = /^#./.test(href) && $(href);
        
        return $href && $href.length && $href.is(':visible') ? [[$href[0].getBoundingClientRect().top + windowTop, href]] : null;
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0]);
        self.targets.push(this[1]);
      });
    },
    
    update: function () {
      var self = this;
      
      var windowTop = Math.floor($(window).scrollTop());
      var $stickyLinks = self.$sticky.find('.navbar-nav .nav-item').removeClass('active');
      var stickyPosition = 'fixed';
      var currentIndex = 0;
      
      // Toggle fixed position depending on visibility
      if ($(window).width() < 800 || $(window).height() < 500 || self.stickyTop > windowTop) {
        stickyPosition = 'absolute';
        self.$sticky.removeClass('floating');
        
      } else {
        
        for (var i = self.offsets.length; i--;) {
          if (windowTop >= self.offsets[i] - 2 && (self.offsets[i + 1] === undefined || windowTop <= self.offsets[i + 1] + 2)) {
            currentIndex = i;
            
            break;
          }
        }
        
      }
      
      self.$sticky.css({ 'position': stickyPosition});
      
      if(stickyPosition == 'absolute') {
        self.$sticky.removeClass('floating');
      }
      else {
        self.$sticky.addClass('floating');
      }
      
      $stickyLinks.eq(currentIndex).addClass('active');
    },
    
    init: function () {
      var self = this;
      
      $(window).on('resize', function () {
        self.set();
        
        self.update();
      });
      
      $(window).on('scroll', function () {
        self.update();
      });
      
      $(window).trigger('resize');
    }
  }
  
  if($('.navbar').hasClass('sticky')) {
    sticky.init();
  }
  
});

$(document).ready(function() {
  $('#sideel').click(function() {
    $(this).parents('.config').toggleClass('active');
  });
  
  $('body').data('bodyClassList', '');
  
  $('.color-item').click(function() {
    var cls = $(this).data('class');
    
    $('body').attr('class', $('body').data('bodyClassList'));
    $('body').addClass(cls);
  });
  
  $('#change-page').on('change', function() {
    var url = $(this).val() + '.html';
    
    if($(this).val()) {
      window.location.assign(url);
    }
  });
  
  $('[data-animate="scrolling"]').each(function() {
    var self = $(this);
    var target = $(this).data('target') ? $(this).data('target') : $(this).attr('href');
    
    self.click(function(e) {
      $('body, html').animate({ scrollTop: $(target).offset().top }, 1000);
      return false;
    });
  });
});


/*
 *  Counter
 *
 *  Require(" jquery.animateNumber.min.js ", " jquery.waypoints.min.js ")
 */
$(document).ready(function() {
  var counterInit = function() {
    if ( $('.section-counter').length > 0 ) {
      $('.section-counter').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
          $('.number').each(function(){
            var $this = $(this),
              num = $this.data('number');
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step
              }, 5000
            );
          });
          
        }

      } , { offset: '95%' } );
    }

  }
  counterInit();
});

// List of sentences
var _CONTENT = [ 
  "Software Developer",
  "Web Application Developer",
	"Backend Developer", 
  "Java Developer"
];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#t-cursor");

// Cursor element 
var _CURSOR = document.querySelector("#cursor");

// Implements typing effect
function Type() { 
	// Get substring with 1 characater added
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === _CONTENT[_PART]) {
		// Hide the cursor
		_CURSOR.style.display = 'none';

		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 50);
		}, 1000);
	}
}

// Implements deleting effect
function Delete() {
	// Get substring with 1 characater deleted
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	// If sentence has been deleted then start to display the next sentence
	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		// If current sentence was last then display the first one, else move to the next
		if(_PART == (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		
		_PART_INDEX = 0;

		// Start to display the next sentence after some time
		setTimeout(function() {
			_CURSOR.style.display = 'inline-block';
			_INTERVAL_VAL = setInterval(Type, 100);
		}, 200);
	}
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);


function downloadCV() {
  // Create an anchor element
  var downloadLink = document.createElement("a");
  
  // Set the href attribute to the location of your CV file
  downloadLink.href = "./assets/Chris.pdf";
  
  // Set the download attribute with the desired file name
  downloadLink.download = "Chris_CV.pdf";

  // Set the target attribute to open in a new tab
  downloadLink.target = "_blank";

  // Add the rel attribute for security reasons
  downloadLink.rel = "noopener noreferrer";
  
  // Append the anchor element to the document
  document.body.appendChild(downloadLink);
  
  // Trigger a click on the anchor element to start the download
  downloadLink.click();
  
  // Remove the anchor element from the document
  document.body.removeChild(downloadLink);
}

function sendEmail(event) {
  event.preventDefault(); // Prevent default form submission

  var subject = document.getElementById("subjectInput").value;
  var name = document.getElementById("nameInput").value;
  var bodymsg = document.getElementById("messageInput").value;
  var message = "You have recieved a message from "+name+".\n\n"+bodymsg;
  var emailAddress = "christopher.thihanaing1996@gmail.com"; // Change to your recipient's email address

  // Construct the mailto URL
  var mailtoUrl = "mailto:" + emailAddress + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);

  // Open the default email client
  window.location.href = mailtoUrl;
}