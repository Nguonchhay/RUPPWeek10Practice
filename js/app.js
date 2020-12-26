$(document).ready(function() {
    const baseURL = 'http://localhost:3030';

    $('#frmLogin').submit(function(event) {
        event.preventDefault();

        const email = document.forms['frmLogin']['email'].value;
        const password = document.forms['frmLogin']['password'].value;
    
        $.get(baseURL + '/users', function(data, status) {
            if (status === 'success') {
                let isSuccess = false;
                for (const user of data) {
                    if (email === user.email && password === user.password) {
                        isSuccess = true;
                        localStorage.setItem('auth-user', user.email);
                        window.location.href = 'admin/index.html';
                    }
                }
                if (!isSuccess) {
                    alert('Invalid credentials');
                }
            }
        });
    });
});