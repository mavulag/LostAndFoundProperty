jQuery(document).ready(function(){
	jQuery('.item-box .contact-box a.btn').click(function(){
		jQuery('.item-box .contact-box .contact-details').css('display','block');
		jQuery(this).css('display','none');
	})
	jQuery("#search_sub_cat").keyup(function () {
        var value = jQuery(this).val();
		
		jQuery.ajax({
		  method: "POST",
		  url: "https://www.lostings.com/private/api/ajax/searchItem",
		  data: { name: value, search_type: "sub_cat", _token: "9OXnsWco1P4lWa8jpIEPETkOSR8S8ycpWnFxMBUw" }
		}).success(function( msg ) {
			console.log(msg);
			jQuery("#search_sub_cat").parent().find(".search-box").html(msg);
		});
	});
	
	jQuery(document).on("click",".search-item-list", function(){
		jQuery("#search_sub_cat").val(jQuery(this).find('a').text());
		jQuery("#search_sub_cat_hidden").val(jQuery(this).find('a').attr('data-id'))
		jQuery("#search_sub_cat_hidden").attr('data-parent',jQuery(this).find('a').attr('data-parent'))
		jQuery('.search-frm .search-box').empty();
	})
	
	window.addEventListener('click', function(e){   
	  if (document.getElementById('search-form-auto').contains(e.target)){
		// Clicked in box
	  } else{
		jQuery('.search-frm .search-box').empty();
	  }
	});

	let initialOffset = jQuery('body').scrollTop();
	jQuery('input, textarea, select').focus(function(e) {
		let offset = jQuery(e.target).offset();
		initialOffset = jQuery('body').scrollTop();
		jQuery('body').scrollTop(offset.top-100);
	});
	jQuery('input, textarea, select').focusout(function(e) {
		// Reset to the initial offset
		jQuery('body').scrollTop(initialOffset);
	})

	jQuery('#search_sub_cat').bind('focusin focus', function(e){
		let offset = jQuery(e.target).offset();
		jQuery('body').scrollTop(offset.top-100);
	})
})
