(function(window, document, undefined) {
  var model = gapi.drive.realtime.Model

  var Book = {
  	Pages = Pages[5],
  	numPages = 5,
  	currentPage = 0
  };
   
  function newBook(){
  	
  }

  Book.Pages = []

  function newPage(text){
  		var string = model.createString();
        string.setText('Welcome to the Quickstart App!');
        model.getRoot().set('demo_string', string);
  } 


  function onFileInitialize(model) {
        var string = model.createString();
        string.setText('Welcome to the Quickstart App!');
        model.getRoot().set('demo_string', string);
      }

      // After a file has been initialized and loaded, we can access the
      // document. We will wire up the data model to the UI.
      function onFileLoaded(doc) {
        console.log("file loaded!")
        /* LEARNING REALTIME NOTE:
        root.get('name') gets the object with the given name at the root
        root.set('name') sets the object with the given name at the root*/
        var collaborativeString = doc.getModel().getRoot().get('demo_string');
        wireTextBoxes(collaborativeString);
      }

      // Connects the text boxes to the collaborative string
      function wireTextBoxes(collaborativeString) {
        var textArea1 = document.getElementById('text_area_1');
        var textArea2 = document.getElementById('text_area_2');
        gapi.drive.realtime.databinding.bindString(collaborativeString, textArea1);
        gapi.drive.realtime.databinding.bindString(collaborativeString, textArea2);
        doc.getModel().getRoot().addEventListener(gapi.drive.realtime.ObjectChangedEvent, function(event){
          //UPDATE PAGE
        })

  function getNextPage(){
  	if (currentPage < numPages) {return getPage(currentPage)} else{ return getPage(currentPage + 1)};
  } 

  function getPrevPage(){
  	if (currentPage > 0) {return getPage(currentPage - 1)} else{ return getPage(currentPage)};
  } 

  function getPage(var num){
  	return Book.Pages[num];
  } 


  window.Book = Book;
})(this, this.document);
