$('#scrape-article').click((e) => {
     e.preventDefault();

     alert('scrape');
     $.ajax({
          url : "/scrape",
          method : "GET"
      }).then(()=>{
          location.reload();
      });

});
