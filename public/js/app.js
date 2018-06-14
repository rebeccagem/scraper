$(document).ready(function(){
  $(document).on("click", "#save", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/save/" + thisId,
      data: {
        saved: true,
      }
    })
    
      .then(function(data) {
 
        window.location.reload();
     
      });
  
  });

    $(document).on("click", "#delete", function() {
      var thisId = $(this).attr("data-id");
    
      $.ajax({
        method: "POST",
        url: "/delete/" + thisId,
        data: {
          saved: false,
        }
      })
    
        .then(function(data) {
    
          window.location.reload();

        });
    
    });



  $('#addNote').on('click', function() {
    console.log("is modal showing yet?") 
    var thisId = $(this).attr("data-id");
    console.log(thisId);


    $.ajax({
      method: "GET",
      url: "/episodes/" + thisId
    })
    .then(function(data){
      console.log(data)
  $('#notesModal').modal({show:true}) 

    });

});

})