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
    e.preventDefault();
    var id = $(e.target).attr('id') 
    $('.modal .modal-dialog .modal-title').text('Article ID: ' + id);
    var noteID="";
    $.ajax({
      method: "GET",
      url: `/notes/`
    }).then(function(data) {
      for(var x in data){
        $('.modal .list-group-flush').append(
          `<li class="list-group-item">
            ${data[x].body}
            <button type="button" class="btn btn-danger m-2 delete-note" id="${data[x]._id}" data-delete="${data[x]._id}">Delete</button>
          </li>`
        ); 
      }

      //deleting notes
      $('.modal .delete-note').on('click', (e) => {
        e.preventDefault();
        var id = $(e.target).data('delete');
          $.ajax({
            method: "DELETE",
            url: `/notes/${id}`
          }).then(function() {
            location.reload();
          });
        });
    });

    
  });

  //saving notes
  $('.save-note').on('click', (e) => {
    var id = $('h4').attr('id');
    console.log(id)
    let note = $('textarea').val();
    $.ajax({
      method: 'POST',
      url: `/notes/${id}`,
      data: { body: note }
    }).then((data) => { 
      $('textarea').val('');      
      location.reload();
    });
  });
});
