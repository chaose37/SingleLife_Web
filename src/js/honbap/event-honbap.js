/**
 * Created by ko on 2016-07-15.
 */
$(document).ready(function () {
    var pageNo= 1;

    // webtoon
    $("#honbap").on("click", function () {

        $("#travel_content").html("");
        $("#youtube_content").html("");
        $("#recipe_content").html("");
        $("#invoice").val("");
        $("select[name=parcel]").val("");



        pageNo=1;
        $(".work_area").css("display", "none");
        $("#parcelArea").css("display","none");
        $("#resultArea").html("");
        common_module.moveYoutubeMenu();
        honbap_module.honbapTitle();
        honbap_module.showHonbap(1);

        $(window).unbind('scroll');

        $(window).scroll(function(){
            if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()) {
                pageNo +=1;
                honbap_module.showHonbap(pageNo);
                $(".loadingArea").html('<img src = "img/preloader.gif" style="width: 60px; height: 60px">');
            }
        });
        $("#portfolioArea").css("display", "none");
    });
});
