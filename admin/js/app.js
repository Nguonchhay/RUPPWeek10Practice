$(document).ready(function() {

    // Check authentication session
    const authUser = localStorage.getItem('auth-user');
    if (authUser === '' || authUser === null) {
        window.location.href = '../login.html';
    }
});