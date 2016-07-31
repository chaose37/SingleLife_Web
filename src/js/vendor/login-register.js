/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 *
 */
// submit 회원가입
var error = $(".error");
$(".registerBoxForm").submit(function(event){
    event.preventDefault();

    var email =  $("#email_register").val();
    var password = $("#password_register").val();
    var repassword = $("#password_confirmation").val();
    var gender =  $('select option:selected').val();
    var birthday = $("#datepicker").val();
    var postCode =  $("#sample3_postcode").val();
    var address =  $("#sample3_address").val();
    var regEmail = /^[\w]{4,}@[\w]+(\.[\w-]+){1,3}$/;

    if(!email){
        error.html("이메일을 입력하세요.");
        return false;
    }
    if(regEmail.test(email)==false) {
        error.html("잘못된 이메일 형식입니다.");
        return false;
    }
    if(password.length < 6 || repassword.length > 16){
        error.html("6~16자 영문 대 소문자, 숫자를 사용하세요.");
        return false;
    }
    if(!password){
        error.html("비밀번호를 입력하세요.");
        return false;
    }
    if(!repassword){
        error.html("비밀번호를 확인하세요.");
        return false;
    }
    if(password != repassword){
        error.html("입력하신 패스워드가 일치하지 않습니다.");
        return false;
    }
    if(gender=="default"){
        error.html("성별을 선택하세요.");
        return false;
    }
    if(!birthday){
        error.html("생일을 선택하세요.");
        return false;
    }
    if(!postCode){
        error.html("우편번호를 입력하세요.");
        return false;
    }
    if(!address){
        error.html("주소를 입력하세요.");
        return false;
    }
    console.log("submit....................");
    createAccount();

});


function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    });
    $('.error').removeClass('alert alert-danger').html('');

}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login with');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');
    }, 230);

}

// 로그인
function loginAjax(){

    // 이메일인증 확인
    var email =  $("#email").val();
    var password = $("#password").val();
    var uuid = $("#uuidchk");
    var market = $("#marketchk").val();

    console.log("loginAjax called.....");

    // uuid 없을경우
    if(uuid.val()==""){
        $.ajax({
            url: "http://localhost:8000/board/login",
            data: { email : email, password : password },
            dataType: 'json',
            type: 'post',

            success: function(data){
                // id/비번 틀린경우 (id x)
                if(!data){
                    shakeModal("invalid email/password combination");
                }

                // data = JSON.parse(data);    // string -> json 파싱

                // uuid 체크
                if(data.email!=null && data.chk==null){
                    uuid.fadeIn('fast');

                    // 로그인
                } else if(data.email!=null && data.chk!=null){
                    $(".close").click();
                    $("#market").attr("data-target","");
                    $("#menu_logout").css("display","block");
                    $("#menu_login").css("display","none");
                    sessionStorage.setItem("user",data.email);
                    sessionStorage.setItem("pass",data.password);
                    $("#loginForm").submit();
                    // 로그아웃
                }

            }
        });

    } else {                                                    // uuid 있을경우
        $.ajax({
            url: "http://localhost:8000/board/changechk",
            data: { email : email, password : password, uuid : uuid.val() },
            dataType: 'json',
            type: 'post',

            success: function(data){                                    // 로그인
                alert(data);
                // data = json.parse(data);    // string -> json 파싱
                if(data=="success"){
                    uuid.fadeOut('fast');

                    $(".close").click();
                    sessionStorage.setItem("user",email);
                    sessionStorage.setItem("pass",password);
                    $("#market").attr("data-target","");
                    $("#menu_logout").css("display","block");
                    $("#menu_login").css("display","none");
                    //market login...
                    $("#loginForm").submit();
                } else {
                    shakeModal("invalid email/password combination");
                }
            }
        });
    }


    /*   simulate error message from the server   */
    // shakemodal("invalid email/password combination");
}

function logoutAjax(){
    sessionStorage.removeItem("user");
    $("#market").attr("data-target","#loginModal");
    $("#menu_logout").css("display","none");
    $("#menu_login").css("display","block");

}

function shakeModal(msg){
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').html(msg);
    $('input[type="password"]').val('');
    setTimeout( function(){
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000 );
}


// 회원가입
function createAccount() {
    var email = $("#email_register").val();
    var password = $("#password_register").val();
    var gender = $('select option:selected').val();
    var birthday = $("#datepicker").val();
    var postcode = $("#sample3_postcode").val();
    var address = $("#sample3_address").val();

    $.ajax({
        url: "http://localhost:8000/board/createaccount",
        data: { email : email, password : password, gender : gender, birthday : birthday, postcode : postcode, address : address},
        dataType: 'text',
        type: 'POST',

        success: function(){
            $(".close").click();
            alert("email로 가서 uuid 인증하세요.");
        }
    });

    var email =  $("#email_register").val("");
    var password = $("#password_register").val("");
    var repassword = $("#password_confirmation").val("");
    var gender =  $('select option:selected').val("");
    var birthday = $("#datepicker").val("");
    var postCode =  $("#sample3_postcode").val("");
    var address =  $("#sample3_address").val("");

    openLoginModal();
}

// 유효성 검사
$(function() {
    var error = $(".error");

    if(sessionStorage.getItem("user"))
    {
        $("#market").attr("data-target","");
        $("#menu_logout").css("display","block");
        $("#menu_login").css("display","none");
    }

    //이메일 유효확인
    $("input[name=email]").blur(function(){
        var msg = "";
        var regEmail = /^[\w]{4,}@[\w]+(\.[\w-]+){1,3}$/;
        if(regEmail.test($(this).val())==false) {
            msg = "잘못된 이메일 형식입니다.";
        }
        error.html(msg);
    });

    // 패스워드가 6~16자 메시지
    $("input[id=password_register]").keyup(function () {
        var msg = "";
        var password = $(this).val();
        if(password.length < 6 || password.length > 16){
            msg = "6~16자 영문 대 소문자, 숫자를 사용하세요.";
        }
        error.html(msg);
    });

    //패스워드 확인 불일치
    $("input[id=password_confirmation]").blur(function(){
        var msg = "";
        var password = $("#password_register").val();
        var repassword = $(this).val();
        if(password != repassword){
            msg = "입력하신 패스워드가 일치하지 않습니다.";
        }
        error.html(msg);
    });

    // $(".close").click(function(){
    //     var uuid = $("#uuidchk");
    //     uuid.fadeOut('fast');
    //     $("#email").val("");
    //     $("#password").val("");
    // });

    $("#loginForm").submit(function(){
        console.log("login from......try")
        setTimeout(function(){
            console.log("end ");
            // self.location="http://localhost:8000/board/list";
        }, 3000);
        return true;
    });


});
