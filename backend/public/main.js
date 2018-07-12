// DELETE EVENT

var deleters = document.getElementsByClassName("delbutton");

for (var i = 0; i < deleters.length; i++) {
    deleters[i].addEventListener('click', function () {
      var itemToDelete = (this).previousSibling.innerHTML;
      fetch('events', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'event': itemToDelete
        })
      }).then(function (response) {
        window.location.reload()
      });
    })
}

// MODIFY EVENT

var updaters = document.getElementsByClassName("editbutton");

for (var i = 0; i < updaters.length; i++) {
  updaters[i].addEventListener('click', function () {
    
    // popup.  make current value = old value.  then findone and replace.

    /*
    fetch('events', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'event': 'NEW EVENT GOES HERE'
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
    })
    */
    alert("document edited");
  })
}