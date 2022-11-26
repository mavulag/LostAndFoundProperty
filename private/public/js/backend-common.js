$(document).ready(function () {
    //Additional Photo JQuery
    $(document).on('change', '.add-ons-type #type', function () {
        if ($(this).val() == '1') {
            $("#additional_photo_div").addClass('show').removeClass('hide');
        } else {
            $("#additional_photo_div").addClass('hide').removeClass('show');
            $("#additional_photo_div #min").val('');
            $("#additional_photo_div #max").val('');
        }
    });

    if ($('.add-ons-type #type').val() == 1)
        $("#additional_photo_div").addClass('show').removeClass('hide');

    //Brand Lable Type
    $(document).on('change', '#category-select', function () {
        if ($(this).val() != '0' && $(this).val() != '') {
            //$("#brand_label").addClass('show').removeClass('hide');
            //$("#brand_label #label-select").val('');
            //$("#color_div").addClass('show').removeClass('hide');
            $("#is_free_div").addClass('hide').removeClass('show');
        } else {
            //$("#brand_label").addClass('hide').removeClass('show');
            //$("#color_div").addClass('hide').removeClass('show');
            //$("#brand_label #label-select").val('');
            $("#is_free_div").addClass('show').removeClass('hide');
        }
    });

    if ($('#category-select').val() != '0' && $('#category-select').val() != '' && $('#category-select').val() != null) {
        //$("#brand_label").addClass('show').removeClass('hide');
        //$("#color_div").addClass('show').removeClass('hide');
    }

    /* $(".chk-recover,.chk-my-item").bootstrapSwitch();*/


    /*$('.chk-recover').on('switchChange.bootstrapSwitch', function (event, state) {
     var propertyId = $(this).data('property-id');
     var recoveryStatus = $("#switch-recovery-status_" + propertyId).is(':checked') ? 1 : 0;
     lostings.startProgress();
     $.ajax({
     method: 'POST', // Type of response and matches what we said in the route
     url: window.Laravel.APP_URL + '/ajax/recoveryStatus', // This is the url we gave in the route
     data: {
     'id': recoveryStatus,
     'propertyId': propertyId,
     "_token": window.Laravel.csrfToken
     }, // a JSON object to send back
     success: function (response) { // What to do if we succeed
     if (response.success) {
     lostings.stopProgress();
     }
     },
     error: function (jqXHR, textStatus, errorThrown) { // What to do if we fail
     }
     });
     });*/

    $(document).on('click', '.chk-recover', function () {
        var propertyId = $(this).data('property-id');
        var status = $(this).val();
        var itemLostProperty = $(this).data('item-lost-property');
        var readirectUrl = $(this).attr('data-url');
        lostings.startProgress();
        $.ajax({
            method: 'POST', // Type of response and matches what we said in the route
            url: window.Laravel.APP_URL + '/ajax/recoveryStatus', // This is the url we gave in the route
            data: {
                'id': status,
                'propertyId': propertyId,
                'type': 'lost',
                "_token": window.Laravel.csrfToken
            }, // a JSON object to send back
            success: function (response) { // What to do if we succeed
                lostings.stopProgress();
                window.location.href = readirectUrl;
            },
            error: function (jqXHR, textStatus, errorThrown) { // What to do if we fail
            }
        });
    });

    $(document).on('click', '.chk-recover-found', function () {
        var propertyId = $(this).attr('data-property-id');
        var status = $(this).val();
        var itemFoundProperty = $(this).attr('data-item-found-property');
        var readirectUrl = $(this).attr('data-url');
        lostings.startProgress();
        $.ajax({
            method: 'POST', // Type of response and matches what we said in the route
            url: window.Laravel.APP_URL + '/ajax/recoveryStatus', // This is the url we gave in the route
            data: {
                'id': status,
                'propertyId': propertyId,
                'type': 'found',
                "_token": window.Laravel.csrfToken
            }, // a JSON object to send back
            success: function (response) { // What to do if we succeed
                lostings.stopProgress();
                window.location.href = readirectUrl;

            },
            error: function (jqXHR, textStatus, errorThrown) { // What to do if we fail
            }
        });
    });

    $(document).on('click', '.chk-feature', function () {
        var propertyId = $(this).data('property-id');
        var status = $(this).val();
        var itemLostProperty = $(this).data('item-lost-property');
        lostings.startProgress();
        $.ajax({
            method: 'POST', // Type of response and matches what we said in the route
            url: window.Laravel.APP_URL + '/ajax/featureItemStatus', // This is the url we gave in the route
            data: {
                'id': status,
                'propertyId': propertyId,
                "_token": window.Laravel.csrfToken
            }, // a JSON object to send back
            success: function (response) { // What to do if we succeed
                lostings.stopProgress();
                window.location.href = window.Laravel.APP_URL + '/item/lost';

            },
            error: function (jqXHR, textStatus, errorThrown) { // What to do if we fail
            }
        });
    });

    $(document).on('input', '.search_found_db', function () {
        var search = $(".search_found_db").val();
        var data_url = $(this).attr('data-url');
        getFoundSerachResults(search, data_url);
    });

    $(document).on('click', '.btn_found_searchdb', function () {
        var search = $(".search_found_db").val();
        var data_url = $(".search_found_db").attr('data-url');
        getFoundSerachResults(search, data_url);
    });

    $(document).on('input', '.search_lost_db', function () {
        var search = $(".search_lost_db").val();
        var data_url = $(this).attr('data-url');
        getLostSerachResults(search, data_url);
    });

    $(document).on('click', '.btn_lost_searchdb', function () {
        var search = $(".search_lost_db").val();
        var data_url = $(this).attr('data-url');
        getLostSerachResults(search, data_url);
    });

    function getFoundSerachResults(search, searchUrl) {
        //var searchUrl = window.Laravel.APP_URL + '/item/found/search';
        //var searchUrl = window.Laravel.APP_URL + '/item/found/create';

        lostings.startProgress();

        $.ajax({
            method: 'GET',
            url: searchUrl,
            data: {
                "q": search,
                "search": 'search',
                "_token": window.Laravel.csrfToken
            },
            success: function (response) {
                lostings.stopProgress();
                $("#found-list").html(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

    function getLostSerachResults(search, searchUrl) {
        //var searchUrl = window.Laravel.APP_URL + '/item/lost/search';
        //var searchUrl = window.Laravel.APP_URL + '/item/lost/create';
        lostings.startProgress();

        $.ajax({
            method: 'GET',
            url: searchUrl,
            data: {
                "q": search,
                "search": 'search',
                "_token": window.Laravel.csrfToken
            },
            success: function (response) {
                lostings.stopProgress();
                $("#lost-list").html(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

    var print_url = window.location.href;
    if (print_url.indexOf("print=1") > -1) {
         lostings.startProgress();
        $("#footer").hide();
        $("#header").hide();
        $("#map").ready(function () {
            setTimeout(function () {
                window.print()
            },3000);
            lostings.stopProgress();    
        });
    }

    /**
     * For Notification Page
     */
    $(document).on('click', '.notification-chk-recover', function () {
        var notificationId = $(this).data('notification-id');
        var readirectUrl = $(this).attr('data-url');
        var status = $(this).val();
        lostings.startProgress();
        $.ajax({
            method: 'POST', // Type of response and matches what we said in the route
            url: window.Laravel.APP_URL + '/ajax/notificationRecover', // This is the url we gave in the route
            data: {
                'recoverStatus': status,
                'notificationId': notificationId,
                "_token": window.Laravel.csrfToken
            }, // a JSON object to send back
            success: function (response) { // What to do if we succeed
                if (response.success) {
                    lostings.stopProgress();
                    window.location.href = readirectUrl;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) { // What to do if we fail
            }
        });
    });
    
    $(document).on('click', '.chk-my-item', function () {
        var notificationId = $(this).attr('data-id');
        var readirectUrl = $(this).attr('data-url');
        var myItem = $(this).val();
        lostings.startProgress();
        $.ajax({
            method: 'POST', // Type of response and matches what we said in the route
            url: window.Laravel.APP_URL + '/ajax/myItem', // This is the url we gave in the route
            data: {
                'myitem_status': myItem,
                'notification_id': notificationId,
                "_token": window.Laravel.csrfToken
            }, // a JSON object to send back
            success: function (response) { // What to do if we succeed
                if (response.success) {
                    lostings.stopProgress();
                    window.location.href = readirectUrl;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) { // What to do if we fail
            }
        });
    });

    
    
    /** Notification Settings ***/
    if ($('#btn_make_primary_ac').length > 0 ) {
        $(document).off('click','#btn_make_primary_ac').on('click','#btn_make_primary_ac',function(){
            var id = $(this).attr('data-id');
            lostings.startProgress();
            $.ajax({
                method: 'POST',
                url: window.Laravel.APP_URL + '/ajax/updateuseremailnotification',
                data: {
                    'id': id,
                    'type': 'make_primary',
                    "_token": window.Laravel.csrfToken
                },
                success: function(response) {
                    lostings.stopProgress();
                    if (response.success) {
                        location.reload();
                    } else {

                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    lostings.stopProgress();
                }
            });
        });
    }
    if ($('#btn_remove_primary_ac').length > 0 ) {
        $(document).off('click','#btn_remove_primary_ac').on('click','#btn_remove_primary_ac',function(){
            var id = $(this).attr('data-id');
            lostings.startProgress();
            $.ajax({
                method: 'POST',
                url: window.Laravel.APP_URL + '/ajax/updateuseremailnotification',
                data: {
                    'id': id,
                    'type': 'remove_primary',
                    "_token": window.Laravel.csrfToken
                },
                success: function(response) {
                    lostings.stopProgress();
                    if (response.success) {
                        location.reload();
                    } else {

                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    lostings.stopProgress();
                }
            });
        });
    }
    if ($('#deactive_account').length > 0 ) {
        $(document).off('click','#deactive_account').on('click','#deactive_account',function(){
            var txt;
            console.log(window.Laravel.APP_URL);
            var r = confirm("Are you sure you want to deactivate your account?");
            if (r == true) {
                var id = $(this).attr('data-id');
                lostings.startProgress();
                $.ajax({
                    method: 'POST',
                    url: window.Laravel.APP_URL + '/ajax/deactiveaccount',
                    data: {
                        'id': id,
                        "_token": window.Laravel.csrfToken
                    },
                    success: function(response) {
                        lostings.stopProgress();
                        if (response.success) {
                            document.getElementById('logout-form').submit();
                        } else {

                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        lostings.stopProgress();
                    }
                });
            } else {
              txt = "You pressed Cancel!";
            }
            
        });
    }
});
