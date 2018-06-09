$(document).ready(function(){
  // // When you click the savenote button
  $(document).on("click", "#save", function() {
    // Grab the id associated with the article from the submit button
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

    // // When you click the delete button
    $(document).on("click", "#delete", function() {
      // Grab the id associated with the article from the submit button
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

    $('#modalTrigger').on('click', function(event) {
      $('#exampleModalLong').modal({show:true}) 
      console.log("is modal showing yet?") 
      event.preventDefault();
  });


  $('#addNote').on('click', function(event) {
    $('#notesModal').modal({show:true}) 
    console.log("is modal showing yet?") 
    event.preventDefault();
});

})