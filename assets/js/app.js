$(document).ready(function() {
    //Инициализация Датапикера
    $('#date-range-from, #date-range-to').datepicker({
        format: 'dd.mm.yyyy',
        startDate: '01.01.2020',
        endDate: '31.12.2025',
        todayHighlight: true,
        language: 'ru',
        autoclose: true,
    });

    //Переключение табов в фильтре
    $(document).on("click", ".dashboard-filter-tab", function() {
        $(".dashboard-filter-tab").removeClass("btn-primary");
        $(this).addClass("btn-primary");
        // $(this).parents(".column-left-list").find(".card-list-wrapper-geo").toggleClass("hide")
        let data_tab = $(this).attr("data-tab");
        $("[data-tab-target]").addClass("hide")
        $("[data-tab-target='" + data_tab + "']").removeClass("hide")
    });

    
    // установка высоты карты
    var data_height = $(".data").height();
    $("#map, .data-wrapper").height(100 + 'vh' - 111 - data_height)

    // Переключение графиков
    $(document).on("click", ".btn-grafic", function(e) {
        if($(e.target).hasClass("active")) {
            return
        } else {
            $(".btn-grafic").removeClass("active");
            $(this).addClass("active");
            $(".grafic img").toggleClass("hide");
        }
    });

    // Установка значений прогресс бар
    function setProgressBarValue(progressBar, value) {
        var max = progressBar.attr('aria-valuemax');
        var percentage = (value / max) * 100;
        progressBar.css('width', percentage + '%').attr('aria-valuenow', value);
    }

    $(document).ready(function() {
        var progressBars = $('.progress-bar');
        // Установка значений для каждого прогресс-бара
        setProgressBarValue($(progressBars[0]), 600);
        setProgressBarValue($(progressBars[1]), 300);
        setProgressBarValue($(progressBars[2]), 900);
    });


    $(".js-select2").select2({
        closeOnSelect : false,
        placeholder : "Все объекты",
        allowHtml: true,
        allowClear: true
    });

    $(document).on("click", "#burger", function() {
        $(".navbar-collapse").addClass("open")
    })
    $(document).on("click", "#burger-close", function() {
        $(".navbar-collapse").removeClass("open")
    });


    // раскрытие дополнительной информации
    $(".detail").click(function() {
        $(this).parents(".card").find(".card-information").slideToggle();
        $(this).toggleClass("open");
        $(this).parents(".card").toggleClass("open");
    });
    $(document).on("click", ".more-information", function() {
        $(this).toggleClass("open");
    });
    $(document).on("click", ".more-information-track", function() {
        $(this).parents(".card").find(".card-information").slideToggle();
    });
    

    // выбор всех чекбоксов
    $(document).on("click", ".main-checkbox input[type='checkbox']", function() {
        if($(this).is(":checked")) {
            $(this).parents(".column-left-section, table").find(".card-heading input[type='checkbox']").prop("checked", true);
        } else {
            $(".card .card-heading input[type='checkbox']").prop("checked", false);
            $(this).parents(".column-left-section, table").find(".card-heading input[type='checkbox']").prop("checked", false);
        }   
    });

    // закрытие модального окна
    $(document).on("click", ".close-modal", function() {
        $(this).parents(".modal, .player").hide();
    });
    

    // дублирование полей в модальном окне
    $(document).on("click", "#modal_add_elem", function() {
        let form_group = '<div class="form-group d-flex align-items-center justify-content-between gap-10"><div class="select-wrapper bordered rounded w-100"><select name="" id="" class="rounded"><option value="Выберите имя" selected>Выберите имя</option><option value="Выберите имя">Имя</option></select></div>или<input type="text" class="w-100 bordered rounded" placeholder="Введите имя"><button class="btn btn-tool modal_remove_elem"><img src="assets/img/btn_remove.svg" alt=""></button></div>';
        let first_elem = $(this).parents(".form-group-wrapper").find(".form-group")[0];
       $(form_group).insertBefore(first_elem);
    });
    $(document).on("click", ".modal_remove_elem", function() {
       $(this).parents(".form-group").remove();
    });


    // открытие модальных окон
    const actionMappings = {
        "#monitoring_add": ".modal-add-objects",
        ".object-edit": ".modal-settings",
        "#btn-add-track": ".modal-add-track",
        ".play": ".player",
        ".card-title": ".modal-car-info",
        ".search-button": ".modal-sort",
        ".action button": ".modal-command-apply",
        ".btn-settings": ".modal-supporting-information",
        "#btn-add-messages": ".modal-add-messages",
        ".export-messages": ".modal-export",
        "#btn-import-messages": ".modal-import",
        "#format-to-export": ".format-to-export",
        "#btn-add-geozona": ".modal-add-geo, .modal-geo-info",
        "#btn-add-uchastok": ".modal-add-uchastok, .modal-uchastok-info",
        "#btn-add-uchastok-group": ".modal-add-uchastok-group",
        "#btn-add-uchastok-crops": ".modal-add-crop",
        ".uchastok-from-file": ".modal-import-uchastok",
        "#btn-add-geozona-group": ".modal-add-geo-group",
    };
    
    $.each(actionMappings, function(trigger, target) {
        $(document).on("click", trigger, function() {
            if (trigger === ".search-button") {
                $(target).toggle();
            } else {
                $(target).show();
            }
        });
    });
    
    $(document).on("click", ".btn-comand", function() {
        $(this).parents(".modal").hide();
    });
    


    // переключение вкладок в модальном окне настроек
    $(document).on("click", ".modal-nav-item", function() {
        $(".modal-nav-item").removeClass("active");
        $(this).addClass("active");
        var targetNav = $(this).attr("data");
        $(".modal-tab").addClass("hide");
        $(".modal-tab[data-target='" + targetNav + "']").removeClass("hide");
    });
    $(document).on("click", ".data-tab-inner", function() {
        $(".data-tab-inner").removeClass("active");
        $(this).addClass("active");
        var targetNav = $(this).attr("data");
        $(".data-data [data-target]").addClass("hide");
        $("[data-target='" + targetNav + "']").removeClass("hide");
    });
     


    //  загрузка изображения объекта
    const $fileInput = $('#fileInput');
    const $uploadedImage = $('#uploadedImage');

    $fileInput.on('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $uploadedImage.attr('src', e.target.result);
                $uploadedImage.show();
            };
            reader.readAsDataURL(file);
        }
    });
    //  загрузка файла 
    const $fileInputMessages = $('#fileInputMessages');
    const $uploadedList = $('.messages-list');
    
    $fileInputMessages.on('change', function() {
        const fileMessage = this.files[0];
        if (fileMessage) {
            let fileName = fileMessage.name;
            let reader = new FileReader();
            reader.onload = function(e) {
                const message_item = '<li class="d-flex align-items-center justify-content-between bordered p-10"><div class="group d-flex gap-10 align-items-center"><img src="assets/img/icon_additional.svg" alt="" class="w-auto">' + fileName + '</div><button type="button" class="btn p-0 btn_delete"><img src="assets/img/icon_remove.svg" alt=""></button></li>';
                $uploadedList.append(message_item);
            };
            reader.readAsDataURL(fileMessage);
        }
    });
    $(document).on("click", ".btn_delete", function() {
        $(this).parents("li").remove();
    });

    

    //  Просмотр пароля
    $(document).on("click", ".password_view", function() {
        var $passwordField = $(this).parent().find("input[type='password']");
        var $textField = $(this).parent().find("input[type='text']");
    
        if ($passwordField.length > 0) {
            $passwordField.attr("type", 'text');
        } else if ($textField.length > 0) {
            $textField.attr("type", 'password');
        }
    });
    
    // маска для телефона
    function initMask() {
        $('input[type="tel"]').mask('+38(999)999-99-99');
    }
    initMask();

    // добавление номера телефона
    $(document).on("click", "#modal_add_phone", function(e) {
        e.preventDefault();
        
        let form_group = '<div class="form-group d-flex align-items-center gap-10"><span class="text text-nowrap">Номер телефона:</span><input type="tel" value="" class="bordered rounded" placeholder="+38 (066) 969 1220"><button class="btn btn-tool modal_remove_elem"><img src="assets/img/btn_remove.svg" alt=""></button></div>';
        let first_elem = $(this).parents(".form-group-wrapper").find(".form-group")[0];
       $(form_group).insertBefore(first_elem);
       initMask();
    });
    $(document).on("click", ".modal_remove_elem", function() {
       $(this).parents(".form-group").remove();
    });


    // управление проигрывателем треков
    let interval;
    let isPlaying = false;
    const $customRange1 = $('#customRange1');
    const $playPauseIcon = $('#play_pause_icon');
    let speed = parseInt($('#speed_select').val(), 10);
    $customRange1.on("change", function() {
        if($(this).val() == 0) {
            $("#to_start, #rewind_back").css("opacity", ".5")
            $("#to_end, #rewind_forward").css("opacity", "1")
        } else if ($(this).val() == 100) {
            $("#to_start, #rewind_back").css("opacity", "1")
            $("#to_end, #rewind_forward").css("opacity", ".5")
        } else {
            $("#to_start, #rewind_back, #to_end, #rewind_forward").css("opacity", "1")
        }
    })
    $('#speed_select').on('change', function() {
        speed = parseInt($(this).val(), 10);
    });
    function setOpacity() {
        if($($customRange1).val() == 0) {
            $("#to_start, #rewind_back").css("opacity", ".5")
            $("#to_end, #rewind_forward").css("opacity", "1")
        } else if ($($customRange1).val() == 100) {
            $("#to_start, #rewind_back").css("opacity", "1")
            $("#to_end, #rewind_forward").css("opacity", ".5")
        } else {
            $("#to_start, #rewind_back, #to_end, #rewind_forward").css("opacity", "1")
        }
    }

    $(document).on("click", "#player_play", function() {
        if (isPlaying) {
            clearInterval(interval);
            isPlaying = false;
            $playPauseIcon.attr('src', 'assets/img/player_play.svg');
            $playPauseIcon.css('transform', 'scale(1)');
        } else {
            interval = setInterval(function() {
                let currentVal = parseInt($customRange1.val(), 10);
                if (currentVal < 100) {
                    $customRange1.val(currentVal + 1); 
                } else {
                    clearInterval(interval);
                    isPlaying = false;
                    $playPauseIcon.attr('src', 'assets/img/player_play.svg');
                    $playPauseIcon.css('transform', 'scale(1)'); 
                    setOpacity();
                }
            }, 100 / speed); 
            isPlaying = true;
            $playPauseIcon.attr('src', 'assets/img/player_pause.svg'); 
            $playPauseIcon.css('transform', 'scale(1.75)'); 
            
        }
    });

    $('#rewind_back').on('click', function() {
        let currentVal = parseInt($customRange1.val(), 10);
        $customRange1.val(Math.max(0, currentVal - 10)); 
        setOpacity();
    });

    $('#to_start').on('click', function() {
        $customRange1.val(0);
        setOpacity();
    });

    $('#to_end').on('click', function() {
        $customRange1.val(100); 
        setOpacity();
    });

    $('#rewind_forward').on('click', function() {
        let currentVal = parseInt($customRange1.val(), 10);
        $customRange1.val(Math.min(100, currentVal + 10));
        setOpacity();
    });

    // counter
    $('.btn-count-minus').click(function(){
        var $input = $(this).siblings('input');
        var value = parseInt($input.val()) || 0;
        if (value > 0) {
            $input.val(value - 1);
        }
    });

    $('.btn-count-plus').click(function(){
        var $input = $(this).siblings('input');
        var value = parseInt($input.val()) || 0;
        $input.val(value + 1);
    });


    // табличка дата под картой
    $(document).on("click", ".data-tab-inner", function() {
        $(".data-tab-inner").removeClass("active");
        $(this).addClass("active");
        var targetTab = $(this).attr("data");
        $(".data-tab-item").hide();
        $(".data-tab-item[data-target='" + targetTab + "']").show();
    });
    $(document).on("click", ".view-messages", function() {
        // $(".data").show();
        var selected_data = $(this).parents(".card").find("select").val()
        $(".data[data-target]").hide();
        $(".data[data-target='" + selected_data + "']").show();
        // $("[data-target='" + selected_data + "'] .data-tab-item:first-child").show();
    });

    var jsonCode = `[
        {
            "name": "Jane Doe",
            "favorite-game": "Stardew Valley",
            "subscriber": false
        },
        {
            "name": "John Doe",
            "favorite-game": "Dragon Quest XI",
            "subscriber": true
        },
        {
            "name": "John Doe",
            "favorite-game": "Dragon Quest XI",
            "subscriber": true
        },
        {
            "name": "John Doe",
            "favorite-game": "Dragon Quest XI",
            "subscriber": true
        }
    ]`;
    $('#json-code').text(jsonCode);

    function copyToClipboard(text) {
        const $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(text).select();
        document.execCommand("copy");
        $temp.remove();
    }
    function removeAlert() {
        $(".alert-success").addClass("hide")
    }
    $(document).on("click", "#copy-json", function() {
        copyToClipboard(jsonCode);
        $("#copy-json .alert-success").removeClass("hide")
        setTimeout(removeAlert, 1000);
    });
    $(document).on("click", ".btn-copy", function() {
        $(this).find(".alert-success").removeClass("hide")
        setTimeout(removeAlert, 1000);
    });
    
    // выбор цвета в геозонах
    $(document).on("click", ".color-list .custom-radio", function() {
            let color = $(this).find('input').attr("data-color");
            $(".new-color").removeClass().addClass(color + " new-color color");
    });

    // добавление новой группы при создании новой геозоны
    $(document).on("click", "#btn-add-geo-group", function(e) {
        e.preventDefault();
        
    //     let form_group = '<tr><td><div class="text">Группа:</div></td><td colspan="2"><div class="select-wrapper bordered rounded w-100"><select name="" id="" class="rounded"><option value="Без группы" selected="">Без группы</option><option value="В группе">В группе</option></select></div></td><td><button type="button" class="p-0 btn btn-add rounded" id="btn-remove-geo-group"><img src="assets/img/btn_remove.svg" alt=""></button></td></tr>';
    //     let first_elem = $(this).parents("tr");
    //    $(form_group).insertBefore(first_elem);
    });
    // $(document).on("click", "#btn-remove-geo-group", function() {
    //    $(this).parents("tr").remove();
    // });

    $(".card-list-wrapper-geo-group .card-title").on("click", function() {
        $(this).parents(".card").find(".geozony-group-list").slideToggle();
        $(this).parents(".card-group").toggleClass("open");
    });

    $(".navbar-nav-scroll").owlCarousel({
        items: 5,
        margin: 16,
        autoWidth:true,
        slideBy: 3
    });


    // единая кнопка для добавления участков груп и культур
    $(document).on("click", "#btn-add-uchastok", function() {
        // if($("[data-tab]").eq(0).hasClass("btn-primary")) {
            
        // } else if ($("[data-tab]").eq(1).hasClass("btn-primary")) {

        // } else if($("[data-tab]").eq(2).hasClass("btn-primary")) {

        // }
    });

    // раскрытие чекбоксов на модалке добавления участков
    $(document).on("click", "#checkbox-from-file", function() {
        $(this).closest(".form-group").find(".uchastok-from-file").toggleClass("hide");
    });
    $(document).on("click", "#checkbox-from-track", function() {
        $(this).closest(".row").find(".inputs-from-track").toggleClass("hide");
    });
    $(document).on("click", ".modal-add-elem", function() {
         let first_elem = $(this).parents("tr");
         let first_elem_content = $(this).parents("tr").html();
         let form_group = '<tr class="cloned">' + first_elem_content + '<tr>';
         $(form_group).insertBefore(first_elem);
    });
 $(document).on("click", ".modal-del-elem", function() {
       $(this).parents("tr").remove();
    });
    
});
