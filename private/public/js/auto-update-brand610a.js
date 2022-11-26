$(document).ready(function () {
    const getUrlParameter = function getUrlParameter(sParam) {
        let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    if (getUrlParameter('item') !== null && getUrlParameter('parent') !== null) {
        setTimeout(autoUpdateBrand(), 1000);
    }

    function autoUpdateBrand() {
        var id = getUrlParameter('item');
        var name = $("#search_sub_cat").val();

        $.ajax({
            url: window.Laravel.APP_URL + '/ajax/getBrandType',
            type: 'POST',
            data: {
                cat_name: name,
                sub_category_id: id,
                _token: window.Laravel.csrfToken
            },
            success: function (response) {
                console.log(response);
                //$(".brand_label").html(response);
                $(".brand_label").html(response.label);
                $(".brand_desc_text").html(response.desc_text);
                lostings.stopProgress();
            }
        });
    }
});