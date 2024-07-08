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
        $(".dashboard-filter-tab").removeClass("btn-primary ");
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
        // $(this).parents(".modal, .player").hide();
        $(this).parents(".modal, .player").removeClass("open");
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
        "#add-agrotechnika": "#agrotechnika",
        "#add-type-treatment": "#type-treatment",
        "#add-trailer": "#trailer",
        "#btn-add-treatment": ".modal-add-treatment",
        ".manual-open": ".modal-manual",
        "#btn-add-route": ".modal-add-route",
        "#btn-add-point": ".modal-add-point",
        "#btn-add-point-geo": ".modal-add-point-geo",
        "#btn-add-point-object": ".modal-add-point-object",
        ".add_schedule": ".modal-add-schedule",
        ".btn-drivers-history": ".modal-drivers-history",
        ".btn-add-object-to-driver": ".modal-add-object-to-driver",
        ".btn-add-shift": ".modal-add-shift",
        "#btn-add-driver": ".modal-add-driver",
        ".btn-edit-driver": ".modal-edit-driver",
        "#btn-add-trailer": ".modal-add-trailer",
        ".btn-edit-trailer": ".modal-edit-trailer",
        "#btn-add-trailers-group": ".modal-add-trailers-group",

        "#btn-add-passenger": ".modal-add-passenger",
        ".btn-edit-passenger": ".modal-edit-passenger",
        "#btn-add-passengers-group": ".modal-add-passengers-group",
        ".btn-modal-limits-setup": ".modal-limits-setup",
        "#btn-add-task": ".modal-add-new-comand",
        // ".btn-sort": ".modal-sort",
    };
    
    $.each(actionMappings, function(trigger, target) {
        $(document).on("click", trigger, function() {
            if (trigger === ".search-button") {
                $(target).toggleClass("open");
            } else {
                // $(target).show();
                $(target).addClass("open");
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
        slideBy: 10
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
         let first_elem_field = $(this).parents(".form-group-field");
         let first_elem_content = $(this).parents("tr").html();
         let first_elem_field_content = $(this).parents(".form-group-field").html();
         let form_group = '<tr class="cloned">' + first_elem_content + '<tr>';
         let form_group_field = '<div class="cloned form-group d-flex align-items-md-center gap-20 row-gap-2 form-group-field flex-column flex-md-row ">' + first_elem_field_content + '<div>';
         $(form_group).insertBefore(first_elem);
         $(form_group_field).insertBefore(first_elem_field);
    });

    $(document).on("click", ".modal-del-elem", function() {
       $(this).parents("tr").remove();
       $(this).parents(".form-group-field").remove();
    });

    $(document).on("click", ".btn-remove-treatment", function() {
       $(this).parents(".item").remove();
    });
    $(document).on("click", "#btn-add-manual-row", function() {
        const dataValues = $('#data-values');
            let collectedData = [];
            dataValues.find('select, input').each(function() {
                collectedData.push($(this).val());
            });

            let newRow = `
                <tr>
                    <td>${collectedData[0]}</td>
                    <td>${collectedData[1]}</td>
                    <td>${collectedData[2]}</td>
                    <td>${collectedData[3]}</td>
                    <td>${collectedData[4]}</td>
                    <td>${collectedData[5]} л/га</td>
                    <td class="text-right d-flex flex-nowrap gap-10 align-items-center justify-content-end">
                        <button class="btn btn-card rounded btn-hover">
                            <img src="assets/img/icon_filter_blue.svg" alt="" class="icon_black w-auto">
                            <img src="assets/img/icon_filter_white.svg" alt="" class="icon_white w-auto">
                        </button>
                        <button type="button" class="p-0 btn-remove-manual-row">
                            <img src="assets/img/remove.svg" alt="" class="w-auto">
                        </button>
                    </td>
                </tr>
            `;

            $('.table-manual tbody').append(newRow);

    });
    $(document).on("click", ".btn-remove-manual-row", function() {
        $(this).parents("tr").remove();
     });


    $(document).on("click", "[data-tab-point]", function() {
        let data_val = $(this).attr("data-tab-point");
        $("[data-target]").addClass("hide");
        $("[data-target='" + data_val + "']").removeClass("hide");
     });

     const $slider = $('#myRange');

     function updateSliderBackground() {
         const value = ($slider.val() - $slider.attr('min')) / ($slider.attr('max') - $slider.attr('min')) * 100;
         $slider.css('background', `linear-gradient(90deg, #007DF126 ${value}%, #007DF126 ${value}%)`);
     }

     function changeValue(change) {
         let newValue = parseInt($slider.val()) + change;
         if (newValue >= $slider.attr('min') && newValue <= $slider.attr('max')) {
             $slider.val(newValue);
             updateSliderBackground();
         }
     }

     $slider.on('input', updateSliderBackground);

     updateSliderBackground();

     function generateDividers() {
        const numLines = 14;
        const $slider = $('#myRange');
        const $wrap = $('.input-range-wrap');
        const inpWidth = $slider.width();
        const interval = inpWidth / (numLines - 1);
    
        for (let i = 0; i < numLines; i++) {
          const $line = $('<div class="line"></div>');
          $line.css({ left: `${i * interval}px` });
          $wrap.append($line);
        }
      }
    
     generateDividers();


     $(document).on("click", "#view__options", function() {
        $(".modal-routes-options").toggle();
     });
     $(document).on("click", ".route-name", function() {
        $("#panel-bottom").toggleClass("hidden");
     });



     $(".time-limit-row").click(function() {
        $(this).toggleClass("open");
        $(this).next().slideToggle();
     })


     $(document).on("click", ".btn-remove-avatar", function() {
        $(this).parents(".form-group").find(".object-preview").attr("src", "assets/img/trailer_avatar_default.png")
     });
     $(document).on("click", ".btn-red", function() {
        $(this).toggleClass("btn-green")
     });


   
     $(document).on("click", ".step-next", function() {
        var count_step = $(".count-step-text").text();
        +count_step;
        $(".tab-command").addClass("hide");
        $(".tab-command").eq(count_step).removeClass("hide");
        count_step++;
        let checked_command = $("input[name='command-type']:checked").attr("data-command");
        $("[data-command-target]").addClass("hide");
        $("[data-command-target='" + checked_command + "']").removeClass("hide");
        if(count_step == 5) {
            $(".step-next").addClass("step-finish");
            $(".step-finish").removeClass("step-next");
            $(".step-finish").text("Добавить команду");
        };

        $(".step-item-nav.active").next().addClass("active");
        $(".count-step-text").text(count_step);
        $(".step-back").attr("disabled", false);
     });

     $(document).on("click", ".step-back", function() {
        var current_count_step = $(".count-step-text").text();
        +current_count_step;
        $(".tab-command").addClass("hide");
        $(".tab-command").eq(current_count_step - 2).removeClass("hide");
        current_count_step--;
        let checked_command = $("input[name='command-type']:checked").attr("data-command");
        $("[data-command-target]").addClass("hide");
        $("[data-command-target='" + checked_command + "']").removeClass("hide");
        $(".step-finish").text("Далее");
        $(".step-finish").addClass("step-next");
        $(".step-next").removeClass("step-finish");

        $(".step-item-nav.active").last().removeClass("active");
        $(".count-step-text").text(current_count_step);
        if(current_count_step == 1) {
            $(".step-back").attr("disabled", true);
            $(".step-item-nav").first().addClass("active");
        }
     });


     const decreaseButton = document.getElementById('decrease');
     const increaseButton = document.getElementById('increase');
     const numberInput = document.getElementById('numberInput');
 
     decreaseButton.addEventListener('click', () => {
         let currentValue = parseInt(numberInput.value);
         if (currentValue > 1) {
             numberInput.value = currentValue - 1;
         }
     });
 
     increaseButton.addEventListener('click', () => {
         let currentValue = parseInt(numberInput.value);
         numberInput.value = currentValue + 1;
     });


    $("input[name='command-type']").change(function() {
        if ($("input[name='command-type']:checked").length > 0) {
            $('.step-next').attr("disabled", false);
        } else {
            $('.step-next').attr("disabled", true);
        }
    });
    
});
