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
  $('#notesModal').modal({show:true}) 
      $("#episodeTitle").text(data.title);
      $("#saveNotes").attr("data-id", thisId);
  
      console.log(data.note);
      if (data.note){
        $("#notesTitle").val(data.note.title);
        $("#notesBody").html(data.note.body);
      }
    });

});



//click "save article notes"
$(document).on("click", "#saveNotes", function(){
  var thisId = $(this).attr("data-id");
  var ntitle=$("#notesTitle").val();
  var nbody = $("#notesBody").val();
  console.log(ntitle, nbody);

  //api post request
  $.ajax({
    method: "POST",
    url: "/episodes/" + thisId,
    data: {
      title: ntitle,
      body: nbody
    }
  })
  .then(function(data){
    console.log(data);

    $("#notesTitle").val("");  
    $("#notesBody").val("");
  });
})



})