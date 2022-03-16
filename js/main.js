$(function () {

    //accordion
    (function () {
        var question = $(".question .title"),
            category = $(".category a");
        question.on("click", function () {
            var $this = $(this);
            $this.parent(".question").toggleClass("active").parent(".item").siblings().find(".question").removeClass("active")
            $this.next(".desc").slideToggle().parents(".item").siblings().find(".desc").slideUp()
        })


        category.on("click", function (e) {
            e.preventDefault();
            if ($(this).hasClass("active")) return
            var catID = $(this).data("catid");
            $(this).addClass("active").parent("li").siblings().find("a").removeClass("active")
            categoryGroup(".question-area-group .accordion-group", catID);
        })


        function categoryGroup(target, index) {
            $(target).slideUp().filter("[data-cat=" + index + "]").slideDown()
        }


    })(),

    //aos
    (function () {
        AOS.init();
    })(),

    //step slick
    (function () {
        var stepperItem = $(".stepper-item"),
            stepBoxItem = $(".step-list-area .list"),
            isSlide = true,
            listIndex,
            stepID;

        stepperItem.on("click", function () {
            var $this = $(this);
            if (isSlide) {
                stepID = false;
                $this.addClass("active").prevAll().addClass("active");
                $this.nextAll().removeClass("active")
                stepID = $this.data("stepid");
                listIndex = filterSlick(".step-list-area .list:not(.slick-cloned)", stepID);
                slickGoTo(".step-list-area", listIndex)
            }

        });

        stepBoxItem.on("click", function () {

            listIndex = $(this).data("listid")

            slickGoTo(".step-list-area", listIndex)
        })

        $('.step-list-area').slick({
            centerMode: true,
            slidesToShow: 5,
            speed: 300,
            arrows: false,
            infinite: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        centerMode: false,
                        slidesToShow: 1
                    }
                }
            ]
        }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
            stepperItemActive(".stepper-item", currentSlide)
        });

        function filterSlick(target, index) {
            return $(target).filter("[data-listid=" + index + "]").data("slick-index");
        }

        function slickGoTo(target, index) {
            isSlide = false
            $(target).slick("slickGoTo", index);
            setTimeout(() => {
                isSlide = true
            }, 300);
        }

        function stepperItemActive(target, index) {

            $(target).filter("[data-stepid=" + index + "]").addClass("active").prevAll().addClass("active").end().nextAll().removeClass("active");
        }

    })(),

    //pyramidPath
    (function () {

        var pyramidPath = $(".pyramid .path");

        pyramidPath.mouseenter(function () {
            pyramidPath.removeClass("active deactive")
            $(this).addClass("active").siblings().addClass("deactive")
            var index = $(this).data("index");
            sliderChange(".slider .slider-item", index)
        }).mouseleave(function () {
            pyramidPath.removeClass("active deactive");
            sliderChange(".slider .slider-item");
        });

        function sliderChange(target, index) {
            if (!index) {
                $(target).hide().siblings().filter(".slider-main").stop().fadeIn()
                return
            }
            $(target).hide()
            $(target).filter("[data-slideItem=" + index + "]").stop().fadeIn()
        }

    })(),

    //menu
    (function () {
        var mobilMenu = $("#mobil-menu");
        mobilMenu.on("click", function () {
            $("body").toggleClass("opened-mobil-menu")
        })

    })()


})//jQuery