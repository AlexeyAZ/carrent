/*global webshim $ wl MobileDetect*/

$(function () {

    var body = $("body");
    var thanksLocation = "thanks.html";
    var wlLand = false;
    var name;

    function addClass(el, cls) {
        var domEl = document.querySelector(el);

        if (domEl) {
            domEl.classList.add(cls);
        }
    }

    function appLoad() {

        setTimeout(function () {
            document.documentElement.classList.remove("loading");
        }, 100);

        setTimeout(function () {
            addClass(".header__logo", "header__logo_show");
            addClass(".sec1__car", "sec1__car_move");
        }, 200);

        $('.sec3__decor-img').viewportChecker({
            classToAdd: 'sec3__decor-img_move',
            offset: 100
        });

        $('.sec6__car').viewportChecker({
            classToAdd: 'sec6__car_move',
            offset: 100
        });

        $('.sec6__img').viewportChecker({
            //classToAdd: 'sec6__car_move',
            offset: 100,
            callbackFunction: function () {
                $('.sec6__timer').countTo({
                    speed: 2000
                });
            }
        });
    }

    window.addEventListener("load", appLoad);

    if ($('input[type="range"]').length) {
        $('input[type="range"]').rangeslider({
            polyfill: false
        });
    }

    webshim.setOptions('forms', {
        lazyCustomMessages: true,
        replaceValidationUI: true
    });
    webshim.polyfill('forms');

    function phoneLink() {
        var md = new MobileDetect(window.navigator.userAgent);
        var phoneLink = $("[data-phone]");

        if (md.mobile()) {
            phoneLink.attr("href", "tel:" + $(".phone-link").data("phone"));
            phoneLink.removeClass("js-small-btn");
        } else {
            phoneLink.attr("href", "");
            phoneLink.addClass("js-small-btn");
        }
    }
    phoneLink();

    // form handler

    $("input[name=phone]").inputmask({
        "mask": "+9(999)999-9999",
        greedy: false,
        clearIncomplete: true
    });

    body.on("click", ".js-small-btn", function (e) {
        e.preventDefault();

        if (!$(".thanks").length) {
            $("html").addClass("form-open");
            $(".form-wrap_small").addClass("form-wrap_open");
        }
    });

    body.on("click", function (e) {
        var self = $(e.target);

        if (self.hasClass("form-wrap") || self.hasClass("form__close")) {
            $("html").removeClass("form-open");
            $(".form-wrap").removeClass("form-wrap_open");
        }
    });

    if (typeof wl != "undefined") {
        wlLand = true;

        wl.callbacks.onFormSubmit = function ($form, res) {
            if ($form.data('next')) {

                if (res.status == 200) {
                    smallFormHandler($form);
                } else {
                    wl.callbacks.def.onFormSubmit($form, res);
                }
            } else {
                bigFormHandler($form);
            }
        };
    } else {
        wlLand = false;

        $("#smallForm, #bottomForm").submit(function (e) {
            e.preventDefault();
            var self = $(this);

            smallFormHandler(self);
        });

        $("#bigForm").submit(function (e) {
            e.preventDefault();
            var self = $(this);

            bigFormHandler(self);
        });
    }

    function formAction() {
        var smallFormWrap = document.querySelector(".form-wrap_small");
        var bigFormWrap = document.querySelector(".form-wrap_big");

        return {

            openSmallForm: function () {
                document.documentElement.classList.add("form-open");
                smallFormWrap.classList.add("form-wrap_open");
            },

            openBigForm: function (callback) {
                document.documentElement.classList.add("form-open");
                bigFormWrap.classList.add("form-wrap_open");

                callback();
            },

            closeSmallForm: function () {
                document.documentElement.classList.remove("form-open");
                smallFormWrap.classList.remove("form-wrap_open");
            },

            closeBigForm: function () {
                document.documentElement.classList.remove("form-open");
                bigFormWrap.classList.remove("form-wrap_open");
            },

            setInputValues: function () {
                var userInfo;

                if (localStorage.getItem("landUserInfo")) {
                    userInfo = JSON.parse(localStorage.getItem("landUserInfo"));
                }

                $("[name=name1]").val(userInfo.name);
                $("[name=phone1]").val(userInfo.phone);
                $("[name=email1]").val(userInfo.email);

                if (userInfo.city !== "") {
                    $("[name=city]").val(userInfo.city);
                }
            }
        };
    }

    function setInputTitle() {
        var titleVal = document.querySelector("title").innerText;
        var forms = document.querySelectorAll("form");
        var inputTitles;

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            var formInput = createInputEl();
            form.insertBefore(formInput, form.firstElementChild);
        }

        inputTitles = document.querySelectorAll(".js-hidden-title");

        for (var j = 0; j < inputTitles.length; j++) {
            var input = inputTitles[j];
            input.value = titleVal;
        }

        function createInputEl() {
            var input = document.createElement("input");
            input.classList.add("js-hidden-title");
            input.name = "title";
            input.type = "hidden";

            return input;
        }
    }
    setInputTitle();

    function smallFormHandler(form) {

        var selfName = form.find("input[name=name]");
        var selfPhone = form.find("input[name=phone]");
        var selfEmail = form.find("input[name=email]");
        var selfCity = form.find("input[name=city]");
        var formData = form.serialize();

        var landUserInfo = {
            "name": selfName.val(),
            "phone": selfPhone.val(),
            "email": selfEmail.val(),
            "city": selfCity.val()
        };

        localStorage.setItem("landUserInfo", JSON.stringify(landUserInfo));

        name = selfName.val();

        $.ajax({
            type: "POST",
            url: "php/send.php",
            data: formData,
            success: function () {
                window.location = thanksLocation;
            }
        });

        if (name) {
            localStorage.setItem("landclientname", name + ", наши");
        } else {
            localStorage.setItem("landclientname", "Наши");
        }
    }

    function bigFormHandler(form) {
        var formData;
        formData = form.serialize();

        $.ajax({
            type: "POST",
            url: "php/sendpresent.php",
            data: formData,
            success: function () {
                formAction().closeBigForm();
            }
        });
    }

    function thanksPageHandler() {

        if (isThanksPage()) {
            formAction().openBigForm(formAction().setInputValues);
            $("#thanksName").text(localStorage.getItem("landclientname"));
            document.querySelector("footer").classList.add("footer_bg_blue");
        }

        function isThanksPage() {

            if (document.querySelector(".thanks")) {
                return true;
            } else {
                return false;
            }
        }
    }
    thanksPageHandler();
});
//# sourceMappingURL=app.js.map
