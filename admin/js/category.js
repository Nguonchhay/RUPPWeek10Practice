$(document).ready(function() {
    const baseURL = 'http://localhost:3030';

     // Add item to table
    function addItemToTable(data) {
        const tdId = '<td>' + data.id + '</td>';
        const tdName = '<td>' + data.name + '</td>';
        const tdEdit = '<td><button class="btn btn-primary edit-category" data-id="category' + data.id + '">Edit</button>';
        const tdDelete = '<button class="btn btn-danger delete-category" data-id="category' + data.id + '">Delete</button></td>';
        $('#tableCategory tbody').append('<tr>' + tdId + tdName + tdEdit + tdDelete + '</tr>');
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

    // Load categories from server
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
});