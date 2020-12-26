$(document).ready(function() {
    const baseURL = 'http://localhost:3030';

     // Add item to table
    function addItemToTable(data) {
        const tdId = '<td>' + data.id + '</td>';
        const tdCategory = '<td>' + data.categoryId + '</td>';
        const tdTitle = '<td>' + data.title + '</td>';
        const tdContent = '<td>' + data.content + '</td>';
        const tdEdit = '<td><button class="btn btn-primary edit-category" data-id="' + data.id + '" data-name="' + data.title + '">Edit</button>';
        const tdDelete = '<button class="btn btn-danger delete-category" data-id="' + data.id + '">Delete</button></td>';
        $('#tablePost tbody').append('<tr id="tr' + data.id + '">' + tdId + tdCategory + tdTitle + tdContent + tdEdit + tdDelete + '</tr>');
    }

    // Load posts to list
    function loadPosts() {
        $('#tablePost tbody').html('');
        $.get(baseURL + '/posts', (data, status) => {
            if (status === 'success') {
                for (const post of data) {
                    addItemToTable({
                        id: post.id,
                        categoryId: post.category_id,
                        title: post.title,
                        content: post.content
                    });
                }
            }
        });
    }

    // Save category to server
    $('#frmNewPost').submit(function(event) {
        event.preventDefault();

        const postTitleElement = $('#postTitle');
        const postTitle = postTitleElement.val();

        const postContentElement = $('#postContent');
        const postContent = postContentElement.val();

        const categoryId = $('#categoryId').val();
        $.post(
            baseURL + '/posts',
            {
                category_id: categoryId,
                title: postTitle,
                content: postContent
            }, 
            function(data, status) {
            if (status === 'success') {
                addItemToTable({
                    id: data.id,
                    categoryId: categoryId,
                    title: postTitle,
                    content: postContent
                });

                postTitleElement.val('');
                postContentElement.text('');
                // Close modal
                $('#newPostModal').modal('hide');
            }
        });
    });

    $('#newPost').click(function() {
        $('#categoryId').html('');
        $('#categoryId').append('<option value="">Please select category</option>');
        $.get(baseURL + '/categories', (data, status) => {
            if (status === 'success') {
                for (const category of data) {
                    $('#categoryId').append('<option value="' + category.id + '">' + category.name + '</option>');
                }
                $('#newPostModal').modal('show');
            }
        });
    });

    // Load categories from server
    loadPosts();
});