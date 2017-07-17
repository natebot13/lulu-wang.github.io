$(document).ready(function(){
    $('.link').click(function(){
	$(this).css('padding-bottom', '2px');
	$(this).css('border-bottom','solid 2px');
	var section = '#' + $(this).text();
	$('.hide').hide();
	$(section).fadeIn();

    });
});
