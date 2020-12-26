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

    const postList = $('#postList');
    if (postList.length) {
        $.get(baseURL + '/posts', function(data, status) {
            postList.html('');
            for (const post of data) {
                postList.append(`
                    <div class="post-item">
                        <div class="post-preview">
                        <a href="post.html?id=${post.id}">
                            <h2 class="post-title">
                                ${post.title}
                            </h2>
                            <h3 class="post-subtitle">
                                ${post.content}
                            </h3>
                        </a>
                        <p class="post-meta">Posted by
                            <a href="#">Start Bootstrap</a>
                            on September 24, 2019</p>
                        </div>
                        <hr>
                    </div>
                `);
            }
        });
    }
});