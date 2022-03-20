$(function () {

    //accordion
    (function () {
        var question = $(".question .title"),
            category = $(".category a"),
            benefitTitle = $(".benefits .item > .title");
        question.on("click", function () {
            var $this = $(this);
            $this.parent(".question").toggleClass("active").parent(".item").siblings().find(".question").removeClass("active")
            $this.next(".desc").slideToggle().parents(".item").siblings().find(".desc").slideUp()
        })

        benefitTitle.on("click", function () {
            $(this).next(".question").children(".title").trigger("click")
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
            var btnClose = $(".close-info-box"),
                infoBox = $(".info-box");
            btnClose.on("click", function () {
                infoBox.addClass("closed")
            })
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
            var mobilMenu = $("#mobil-menu"),
                menuLink = $(".site-menu a");

            mobilMenu.on("click", function () {
                $("body").toggleClass("opened-mobil-menu")
            })

            menuLink.on("click", function () {
                $("body").removeClass("opened-mobil-menu");
            })

        })(),

        //form
        (function () {

            const email = document.querySelector('input[name=email]');
            const button = document.querySelector('#btn');
            const text = document.querySelector('.form-result');

            const validateEmail = (email) => {
                var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(String(email).toLowerCase());
            }

            button.addEventListener('click',(e)=>{
                e.preventDefault()
                if(validateEmail(email.value)){                    
                  text.innerText="E-postanızı Başarıyla Kaydettik";
                  text.classList.remove("text-danger")
                  text.classList.add("text-success")     
                }else{                  
                    text.innerText="Geçerli Bir E-posta Giriniz";    
                    text.classList.remove("text-success")
                    text.classList.add("text-danger")           
                }
            })

        })()


})//jQuery