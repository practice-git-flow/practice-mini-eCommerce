
const baseUrl = 'http://localhost:3000'

$(document).ready(() => {
    auth()
})

const auth = () => {
    if (localStorage.access_token) {
        $('.section-login').hide()
        $('.section-register').hide()
        $('.section-homepage').show()
        $('header').show()
    } else {
        $('.section-login').show()
        $('.section-register').hide()
        $('.section-homepage').hide()
        $('header').hide()
    }
}

const registerPage = () => {
    $('.section-login').hide()
    $('.section-register').show()
    $('.section-homepage').hide()
}

const loginPage = () => {
    $('.section-login').show()
    $('.section-register').hide()
    $('.section-homepage').hide()
}

const register = (event) => {
    event.preventDefault()
    const name = $('#name-register').val()
    const email = $('#email-register').val()
    const password = $('#password-register').val()

    $.ajax({
        method: "post",
        url: baseUrl + '/users/register',
        data: {
            name, email, password
        }             
    })
        .done(data => {
            $('#name-register').val('')
            $('#email-register').val('')
            $('#password-register').val('')

            $('.section-login').show()
            $('.section-register').hide()

            $('.alert-login').empty()
            $('.alert-login').append(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Successfully create new account
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
        })
        .fail(err => {
            $('.alert-register').empty()
            $('.alert-register').append(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
            $('#password-register').val('')
        })
}

const login = (event) => {
    event.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $.ajax({
        method: "post",
        url: baseUrl + '/users/login',
        data: { email, password}
    })
        .done(data => {
            $('#email-login').val('')
            $('#password-login').val('')
            localStorage.access_token = data.access_token
            auth()
        })
        .fail(err => {
            $('.alert-login').empty()
            $('.alert-login').append(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
            $('#password-login').val('')
        })
}

const logout = () => {
    localStorage.clear()
    auth()
}