(function(window, document, undefined) {
  BookModel= {};
  // var model = gapi.drive.realtime.Model

/* TEST: Wed 7/8 Zheng
I was going to create the book object in this file,
however, becuase I was a bit confused about how
it was going to fit together,
 it ended up being in the file Util instead, with the intention of
 migrating it back, of course, but that hasn't happened yet*/
  // var BookModel = {
  // 	numPages = 5,
  // 	currentPage = 0
  // };
   
  // function newBook(){
  	
  // }

  // BookModel.Pages = []

  // function getNextPage(){
  // 	if (currentPage < numPages) {return getPage(currentPage)} else{ return getPage(currentPage + 1)};
  // } 

  // function getPrevPage(){
  // 	if (currentPage > 0) {return getPage(currentPage - 1)} else{ return getPage(currentPage)};
  // } 

  // function getPage(var num){
  // 	return BookModel.Pages[num];
  // } 


  window.BookModel = BookModel;
})(this, this.document);
