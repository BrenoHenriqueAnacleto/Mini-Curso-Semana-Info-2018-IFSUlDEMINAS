$(document).ready(function(){
	//slide
    $('main').append('<p id="test">Text slideDown, slideUp and slideToggle!</p>');
   $('main').append('<button id="downbtn">SlideDown</button>');
   $('main').append('<button id="upbtn">SlideUp</button>');
   $('main').append('<button id="togglebtn">SlideToggle</button>');
   $('#test').css('border','1px solid green');
   $('#test').css('width','600px');
   $('#test').css('height','80px');
   $('#test').css('text-align','center');

   $('#downbtn').click(function () {
      $('#test').slideDown();
   });

   $('#upbtn').click(function () {
      $('#test').slideUp();
   });

   $('#togglebtn').click(function () {
      $('#test').slideToggle();
   });

    $('main').append('<p id="test2">Test Show, Hide and Toggle!</p>');
   $('main').append('<button id="showbtn">Show</button>');
   $('main').append('<button id="hidebtn">Hide</button>');
   $('main').append('<button id="togglebtn2">Toggle</button>');

   $('#showbtn').click(function () {
      $('#test2').show();
   });

   $('#hidebtn').click(function () {
      $('#test2').hide();
   });

   $('#togglebtn2').click(function () {
      $('#test2').toggle();
   });
});