import sweet from "sweetalert2";
import _ from "lodash";

$(function () {
    
    function getValuesInForm([...selectors]: Array<string>): Array<any> {
        let values = [];
        selectors.forEach(element => {
            values.push(<string>$(`${element}`).val());
        })
        return _.without(values, "", " ");
    }
    $(".btn-register").on("click", async (e) => {
        e.preventDefault();
        //box captcha register
        const responseCaptcha = grecaptcha.getResponse(1);
        let values = getValuesInForm(["#username", "#email", "#password", "#re-password"])
        if (values.length != 4) {
            sweet.fire('Notification', 'Please fill information into the form', 'warning')
        } else {
            if (values[2] != values[3]) {
                $(".validate-text-re-password").css("visibility", "visible")
            }
            if (values[0].length < 6 || values[0].length > 20) {
                $(".validate-text-username").css("visibility", "visible")
            }
            if (values[2].length < 6) {
                $(".validate-text-password").css("visibility", "visible")
            }
            if (responseCaptcha == "") {
                $(".validate-text-captcha").css("visibility", "visible")
            }
            if (!(values[2] != values[3]) && !(values[0].length < 6 || values[0].length > 20) && !(values[2].length < 6) && (responseCaptcha != "")) {
                $(".validate-text").css("visibility", "hidden");
                $.ajax({
                    type: "POST",
                    url: "/user/register",
                    data: { username: values[0], email: values[1], password: values[2], captcha: responseCaptcha },
                    success: function (response) {
                        //reset box captcha register
                        grecaptcha.reset(1);
                        sweet.fire('Notification', 'Your account is registered success', 'success')
                    },
                    error: function (response) {
                        grecaptcha.reset(1);
                        if (response.responseJSON.both) {
                            sweet.fire("Notification", "Your username & email already exist. Please try again !!", "error")
                        } else if (response.responseJSON.account) {
                            sweet.fire("Notification", "Your username already exist !!", "error")
                        } else if (response.responseJSON.email) {
                            sweet.fire("Notification", "Your email already exist! Please try again with different email", "error")
                        } else {
                            sweet.fire("Notification", "Failed when passing captcha, please try again !!", "error")
                        }
                    }
                });
            }
        }
    })

    $(".btn-login").on("click", (e) => {
        e.preventDefault();
        //box captcha login
        const responseCatpcha = grecaptcha.getResponse(0);
        let values = getValuesInForm(["#username-login", "#password-login"]);
        if(responseCatpcha == ""){
            $(".validate-text-captcha-login").css("visibility", "visible")
        }else if (values.length != 2) {

        } else {
            $(".validate-text").css("visibility", "hidden")
            $.ajax({
                type: "POST",
                url: "/user/login",
                data:{username : values[0], password : values[1]},
                success: function (response) {
                    window.location.replace(`${window.location.origin}/shop`);
                },
                error : function (response) {
                    sweet.fire("Notification", "Username or password incorrect. Please try again !!", "error")
                }
            });
        }



    })

})