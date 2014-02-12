$(document).ready(function() {
     $('.removeTask').click(function() {
         var id = $(this).parent().attr('id');
         console.log(id);
     });
});
