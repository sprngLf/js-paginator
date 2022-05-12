class Paginator
{

  constructor(totalRecords, recordsPerPage, visiblePages, currentPage){ //visiblePages is the number of pages on pagination controls
    // initialize Paginator
    this.totalRecords = totalRecords
    this.recordsPerPage = recordsPerPage
    this.visiblePages = visiblePages
    this.currentPage = currentPage
    this.totalPages = Math.ceil( this.totalRecords / this.recordsPerPage )
    this.offset = 0
  }

  goToPage(pageNum){
    pageNum = pageNum < 1 ? 1 : pageNum
    pageNum = pageNum > this.totalPages ? this.totalPages : pageNum

    this.currentPage = pageNum
    this.offset = (pageNum - 1) * this.recordsPerPage
  }

  goToLastPage(){
    this.currentPage = Math.ceil( this.totalRecords / this.recordsPerPage )
    this.offset = (this.currentPage - 1) * this.recordsPerPage
  }

  goToNextPage(){
    this.offset = this.currentPage < this.totalPages ? 
            this.currentPage * this.recordsPerPage  : 
            (this.currentPage - 1) * this.recordsPerPage
    this.currentPage = this.currentPage < this.totalPages ? 
                      this.currentPage + 1 : this.currentPage
  }

  goToPreviousPage(){
    this.offset = this.currentPage > 1 ? 
                  (this.currentPage - 2) * this.recordsPerPage  : 0
    this.currentPage = this.currentPage > 1 ? 
                      this.currentPage - 1 : this.currentPage
  }

  goToFirstPage(){
    this.offset = 0
    this.currentPage = 1
  }

  getCurrentPage(){
    return this.currentPage
  }

  getOffset(){
    return this.offset
  }

  getNumOfRecordsForCurrentPage(){
    // if current page less than total pages
    // set records per page to default
    return this.getCurrentPage() < this.getTotalPages() 
      ? this.recordsPerPage

      // else, get the difference of offset from total pages
      // and set the result to records per page
      : this.getTotalRecords() - this.getOffset()
  }

  getTotalPages(){
    return this.totalPages
  }

  getTotalRecords(){
    return this.totalRecords
  }

  getPaginationControlsArray(){
    let incrementStart
    let incrementEnd

    if(this.currentPage < this.visiblePages){
      //if current page less than visible pages
      incrementStart = 1
      incrementEnd = this.totalPages < this.visiblePages ?
                    this.totalPages
                    : this.visiblePages
    }else if( this.currentPage >= this.visiblePages ){
      
      // We're keeping the current page closest to the center as possible
      // by setting the number of controls to the left and right from the current page
      const numOfControlsToLeft = this.visiblePages % 2 === 0 ? //if visiblePages is an even number
                      Math.floor(this.visiblePages / 2) - 1 
                      //set numOfControlsToLeft to visiblePages divided by 2 rounded lower and subtract 1

                      : Math.floor(this.visiblePages / 2)
                      //if visiblePages is odd, set numOfControlsToLeft to visiblePages divided by 2 rounded lower

      let numOfControlsToRight = Math.floor(this.visiblePages / 2) 

      incrementStart = this.currentPage - numOfControlsToLeft
      incrementEnd = this.currentPage + numOfControlsToRight >= this.totalPages ? 
                    this.totalPages : this.currentPage + numOfControlsToRight

      if(this.currentPage > this.totalPages - numOfControlsToRight){
        // this is true if the current page is closest or equal to totalPages

        numOfControlsToRight = this.totalPages - this.currentPage

        incrementStart = numOfControlsToRight > 0 ?
                  this.currentPage - ( this.visiblePages + 1 - numOfControlsToRight - numOfControlsToLeft)
                  // if currentPage is not equal to totalPages yet, add 1 to visiblePages to be substracted from currentPage

                  : this.currentPage - (this.visiblePages - 1)
                  // if currentPage is the last page, subtract 1 from visiblePages 
                  // and then substract the result to currentPage

        incrementEnd = this.currentPage + numOfControlsToRight 

      }

    }

    let paginationControls = [] // initialize paginationControls array

    for(let x = incrementStart; x <= incrementEnd; x++){
      // we're just setting the page number and offset for every controls
        let obj = {
            page: x,
            offset: ( x - 1 ) * this.recordsPerPage
        }
        paginationControls.push(obj) // add obj to paginationControls
    }

    return paginationControls

  }

}
