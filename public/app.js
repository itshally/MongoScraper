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

    $.ajax({
      method: "GET",
      url: `/notes/`
    }).then(function(data) {
      console.log(data)
      for(var x in data){
        console.log(data[x].body)

        $('.modal .list-group-flush').append(
          `<li class="list-group-item">
            ${data[x].body}
            <button type="button" class="btn btn-danger m-2 delete-note" id="{{id}}" data-delete="{{_id}}">Delete</button>
          </li>`
        );
        
      }
    });
  });

  //saving notes
  $('.save-note').on('click', (e) => {
    alert('saved')
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
