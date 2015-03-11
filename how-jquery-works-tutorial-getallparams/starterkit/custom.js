jQuery(document).ready(function() {
  // do something here
  $('#orderedlist > li').addClass('blue');
});

$(document).ready(function() {
   $("#orderedlist li:last").hover(function() {
     $(this).addClass("red");
   },function(){
     $(this).removeClass("red");
   });
 });

$(document).ready(function() {
   $("#orderedlist").find("li").each(function(i) {
     $(this).append( " BAM! " + i );
   });
 });
