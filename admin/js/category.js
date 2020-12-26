$(document).ready(function() {
    const baseURL = 'http://localhost:3030';

     // Add item to table
    function addItemToTable(data) {
        const tdId = '<td>' + data.id + '</td>';
        const tdName = '<td>' + data.name + '</td>';
        const tdEdit = '<td><button class="btn btn-primary edit-category" data-id="' + data.id + '" data-name="' + data.name + '">Edit</button>';
        const tdDelete = '<button class="btn btn-danger delete-category" data-id="' + data.id + '">Delete</button></td>';
        $('#tableCategory tbody').append('<tr id="tr' + data.id + '">' + tdId + tdName + tdEdit + tdDelete + '</tr>');
    }

    // Load categories to list
    function loadCategories() {
        $('#tableCategory tbody').html('');
        $.get(baseURL + '/categories', (data, status) => {
            if (status === 'success') {
                for (const category of data) {
                    addItemToTable({
                        id: category.id,
                        name: category.name
                    });
                }
            }
        });
    }

    // Save category to server
    $('#frmNewCategory').submit(function(event) {
        event.preventDefault();

        const categoryElement = $('#categoryName');
        const categoryName = categoryElement.val();
        $.post(baseURL + '/categories', {name: categoryName}, function(data, status) {
            if (status === 'success') {
                addItemToTable({
                    id: data.id,
                    name: categoryName
                });

                categoryElement.val('');
                // Close modal
                $('#newCategoryModal').modal('hide');
            }
        });
    });

    // Edit category
    $('#frmEditCategory').submit(function(event) {
        event.preventDefault();

        const categoryElement = $('#editCategoryName');
        const categoryId = $('#editCategoryId').val();
        $.ajax({
            type: "PUT",
            url: baseURL + "/categories/" + categoryId,
            data: {
                name: categoryElement.val()
            },
            success: function() {
                loadCategories();
                categoryElement.val('');

                // Close modal
                $('#editCategoryModal').modal('hide');
            }
        });
    });

    // Edit category
    $('#tableCategory').on('click', '.edit-category', function() {
        const categoryId = $(this).attr('data-id');

        $('#editCategoryId').val(categoryId);
        $('#editCategoryName').val($(this).attr('data-name'));
        $('#editCategoryModal').modal('show');
    });

    // Delete category
    $('#tableCategory').on('click', '.delete-category', function() {
        if(confirm('Are you sure?')) {
            const categoryId = $(this).attr('data-id');
            $.ajax({
                type: "DELETE",
                url: baseURL + "/categories/" + categoryId,
                success: function(){
                    $('tr#tr' + categoryId).remove();
                }
            });
        }
    });

    // Load categories from server
    loadCategories();
});