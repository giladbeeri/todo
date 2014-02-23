$(document).ready(function() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (mm < 10)
        mm = '0' + mm;
    if (dd < 10)
        dd = '0' + dd;
    var today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    $('#newTaskDueDate').val(today);
});
