# Javascript Paginator  

## Usage:  

Initialize  
```javascript
const totalRecords = data.length  
const recordsPerPage = 6
const visiblePages = 5
const currentPage = 1

const pagi = new Paginator(totalRecords, recordsPerPage, visiblePages, currentPage)
```

Create functions for rendering the controls and data  
*(I'm using jquery for this example)*

```javascript
function renderNewDataAndControls() {

  // RENDER NEW DATA TO TABLE
  // for this example we're looping through an array to simulate pagination.
  // in a real world scenario, you can use ajax request here
  // using the pagi.getOffset() and pagi.getNumOfRecordsForCurrentPage() 
  // and use that as OFFSET and LIMIT in a database query

  // empty the table first
  $('table tbody').html('')
  
  // get new data
  let newDataArray = []
  const offset = pagi.getOffset()
  const recordsPerPage = pagi.getNumOfRecordsForCurrentPage()

  for(let x = offset; x < offset + recordsPerPage; x++ ){
    newDataArray.push( data[x] )
  }

  newDataArray.forEach(function(newDataEntry){
    
    const { userId, id, title, body } = newDataEntry
    $('table tbody').append(`
      <tr>
        <td>
          <div>${userId}</div>
        </td>
        <td>
          <div>${id}</div>
        </td>
        <td>
          <div>${title}</div>
        </td>
        <td>
          <div>${body}</div>
        </td>
      </tr>
    `)
  })

  // clear controls
  $('#controls').html('')

  // render new controls
  renderControls()
}


// define the controlsListener function
function controlsListener(){
  // add listener to pagination controls
  $(document.body).on('click','#controls *', function() {
    if( $( this ).hasClass('prev') ) {
      if( pagi.getCurrentPage() == 1 ) return

      pagi.goToPreviousPage()
      renderNewDataAndControls()
    }
    
    if( $( this ).hasClass('next') ) {
      if( pagi.getCurrentPage() == pagi.getTotalPages() ) return

      pagi.goToNextPage()
      renderNewDataAndControls()
    }
    
    if( $( this ).hasClass('num-controls') ) {
      if( $(this).attr('class').match('active') !== null ) return

      const page = parseInt( $( this ).html().trim() )
      pagi.goToPage( page )

      renderNewDataAndControls()
    }
  });
}

// define the renderControls function
function renderControls(){

  // get current page
  const currentPage = pagi.getCurrentPage() 

  // get the last page
  const lastPage = pagi.getTotalPages() 

  // get the controls array e.g. [ { page: 1, offset: 0}, ... ]
  const controls = pagi.getPaginationControlsArray() 

  // render previous button
  $('#controls').append(`<span class="prev ${currentPage == 1 && 'disabled'}">&laquo;</span>`);

  // render the controls or the buttons to use 
  // when navigating through pages
  // e.g. 1 2 3 4 5

  $.each(controls, function( index, {offset, page} ) {
    const active = currentPage === page && 'active'
    $('#controls').append(`<span class="num-controls ${active}">${page}</span>`);
  });

  // render next button
  $('#controls').append(`<span class="next ${lastPage == currentPage && 'disabled'}"}>&raquo;</span>`);

}


// render initial data and controls
renderNewDataAndControls() 

// add listener to controls
controlsListener()
```

Note the data variable is a dummy data  
from [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

## Demo  
[https://jsfiddle.net/nullvoid614/prjbe479/11/](https://jsfiddle.net/nullvoid614/prjbe479/11/)  


## LICENSE
[MIT](https://opensource.org/licenses/MIT)










