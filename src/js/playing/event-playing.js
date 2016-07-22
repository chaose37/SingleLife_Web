/**
 * Created by ko on 2016-07-12.
 */

// $("#allBtn").click();
// $("#monBtn").click();
$(document).ready(function () {
    var pageNo = 1;

    // webtoon

    $("#portfolioArea").css("display", "none");

    $("#watchWebtoon").on("click", function () {
        $(window).unbind('scroll');
        $("#portfolioArea").css("display", "block");
        $("#main_content").html("");
        $(".work_area").css("display", "none");
        common_module.moveMenu();
        play_module.showWebtoon();
    });

    // youtube
    $("#youtube").on("click", function () {
        pageNo=1;
        $(".work_area").css("display", "none");
        common_module.moveMenu();
        play_module.youtubeTitle();
        play_module.showYoutube(pageNo);
        $(window).unbind('scroll');

        $(window).scroll(function(){
            if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()) {
                pageNo +=1;
                play_module.showYoutube(pageNo);
                $(".loadingArea").html('<img src = "img/preloader.gif" style="width: 60px; height: 60px">');
            }
        });
        $("#portfolioArea").css("display", "none");
    });
});

//youtube 모달 호출
$(document).on("click",".youtubediv",play_module.youtubeModal);
//모달 초기화
$(document).on("click",".modalclose",play_module.clearModal);

$(document).on("mouseenter",".portfolio-wrapper",function () {
    $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
    $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');
});
$(document).on("mouseleave",".portfolio-wrapper",function () {
    $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
    $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');
});
