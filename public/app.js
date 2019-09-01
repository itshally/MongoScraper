$(() => {
  //for saving an article
  $('.save-button').on('click', function(e) {
    e.preventDefault();
    let id = $(this).attr('id');

    //posting the article's id to the 'saved' api path
    $.ajax({
      method: 'POST',
      url: `/api/saved/${id}`
    }).then(() => {
      location.reload();
    });
  });

  //undo the save function
  $('.unsave-button').on('click', function(e) {
    e.preventDefault();
    let id = $(this).attr('data');

    //posting the article's id to the 'removed' api path
    $.ajax({
      method: 'POST',
      url: `/api/removed/${id}`
    }).then(() => {
      location.reload();
    });
  });

  //displays article id on the modal's title
  $('.note-button').on('click', (e) => {
    var id = $(e.target).attr('id') 
    $('.modal .modal-dialog .modal-title').text('Article ID: ' + id);

    $.ajax({
      method: "GET",
      url: `/articles/${id}`
    }).then(function(data) {
      console.log(data)
      console.log(data.note)
      $(".save-note").attr("data", data._id);
      if (data.note) {
        $(".list-group-item").text(data.note.body);
      }
    });
  });

  //saving notes
  $('.save-note').on('click', (e) => {
    alert('saved')
    var id = $(e.target).attr('data');
    console.log(id)
    let note = $('textarea').val();
    $.ajax({
      method: 'POST',
      url: `/notes/${id}`,
      data: { body: note }
    }).then((data) => { 
      console.log(data)
      console.log(note)
      // location.reload(); 
    });

    $('textarea').val('');
    $("#exampleModal").modal("toggle");
  });
});
