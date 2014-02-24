var getToday = function() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (mm < 10)
        mm = '0' + mm;
    if (dd < 10)
        dd = '0' + dd;
    return yyyy + '-' + mm + '-' + dd;
};

var setDefaultDate = function() {
    $('#newTaskDueDate').val(getToday());
};

$(document).ready(function() {
    setDefaultDate();
});
