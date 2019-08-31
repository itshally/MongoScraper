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
});
