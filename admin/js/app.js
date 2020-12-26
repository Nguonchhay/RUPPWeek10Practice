$(document).ready(function() {
    const baseURL = 'http://localhost:3030';

    // Check authentication session
    const authUser = localStorage.getItem('auth-user');
    if (authUser === '' || authUser === null) {
        window.location.href = '../login.html';
    }
});