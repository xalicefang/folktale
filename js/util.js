(function(window, document, undefined) {
  
  /*Util contains utility functions which may be used across modules.*/
  var Util = {};


  var pageTemplate = document.getElementById('page-template'); 
  

 //  /**
 // * A simple type for page items.
 // * @constructor
 // */
 //  Util.Page = function() {}; //empty constructor "Most custom collaborative objects should have empty constructors. (1)"
 //  gapi.drive.realtime.custom.registerType(Util.Page, 'Page');
 //  Util.Page.prototype.information = gapi.drive.realtime.custom.collaborativeField('string');

/**
 * A simple type for book items.
 * @constructor
 */
  Util.Book = function() {}; //empty constructor "Most custom collaborative objects should have empty constructors."
  gapi.drive.realtime.custom.registerType(Util.Book, 'Book');
  Util.Book.prototype.numPages = gapi.drive.realtime.custom.collaborativeField('numPages');
  Util.Book.prototype.curPage = gapi.drive.realtime.custom.collaborativeField('curPage');
  Util.Book.prototype.getnextPage =  function(){
    if (this.curPage < this.numPages) {return this.getPage(currentPage)} else{ return this.getPage(currentPage + 1)};
  } 
  Util.Book.prototype.getprevPage = function(){
    if (currentPage > 0) {return getPage(currentPage - 1)} else{ return getPage(currentPage)};
  } 

  function getPage(num){
    return BookModel.Pages[num];
  } 
  Util.Page.prototype.information = gapi.drive.realtime.custom.collaborativeField('string_arr');

  /**
 * Initializer for constructing via the realtime API
 *
 * @param title
 */
Util.Book.prototype.initialize = function (title) {
  var model = gapi.drive.realtime.custom.getModel(this);
  this.title = model.createString(title);
  this.setup();
};

  gapi.drive.realtime.custom.setInitializer(myApp.Book, doInitialize);

  window.Util = Util;

})(this, this.document);

//(1) https://developers.google.com/google-apps/realtime/custom-objects Section: "Lifecycle of a custom collaborative object"