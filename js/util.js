(function(window, document, undefined) {
  
  /*Util contains utility functions which may be used across modules.*/

  /*As it stands, this page also */
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
  
  //register the Book Collboarative Object
  gapi.drive.realtime.custom.registerType(Util.Book, 'Book');
  
  /**
  * Set fields for the Book Collaborative Object.
  * A book will contain a curPages field, a numPages field, sevearal functions,
  * and a collection (array?) of Pages which are themselves Custom Collaborative Objects
  */
  Util.Book.prototype.numPages = gapi.drive.realtime.custom.collaborativeField('numPages');
  Util.Book.prototype.curPage = gapi.drive.realtime.custom.collaborativeField('curPage');
  Util.Book.prototype.getnextPage =  function(){
    if (this.curPage < this.numPages) {return this.getPage(currentPage)} else{ return this.getPage(currentPage + 1)};
  } 
  Util.Book.prototype.getprevPage = function(){
    if (currentPage > 0) {return getPage(currentPage - 1)} else{ return getPage(currentPage)};
  } 

  function getPage(num){
    return ;//????
  } 


  /**
 * Initializer for constructing Book via the realtime API
 *  This, I belileve, should be only called once in the creation of a unique Book Object.
 *  I'm not quite sure how to do this and will be looking at it next.
 */
Util.Book.prototype.initialize = function (title) {
  // var model = gapi.drive.realtime.custom.getModel(this);
  // this.title = model.createString(title);
  // this.setup();
};

  gapi.drive.realtime.custom.setInitializer(myApp.Book, doInitialize);


  /**
 * A simple type for page items.
 * @constructor
 */
  Util.Page = function () {}

  /**
 * As of now, each page will only contain one collaborative string called information.
 * They can also contain other noncollborative strings.
 */
  Util.Page.prototype.information = gapi.drive.realtime.custom.collaborativeField('string_arr');

  window.Util = Util;

})(this, this.document);

//(1) https://developers.google.com/google-apps/realtime/custom-objects Section: "Lifecycle of a custom collaborative object"