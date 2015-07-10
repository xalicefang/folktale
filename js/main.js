(function(window, document, undefined) {
  /*strictly for testing. these thigns shouldnt be global. doc is assigned later on.*/
  book = {};
  myApp = {
    Book : undefined
  };

  var clientId = '106587098408-3eedm395hnoh8ge37dm7phvpspe3boso.apps.googleusercontent.com';
      var fileArr = [];

      if (!/^([0-9])$/.test(clientId[0])) {
        alert('Invalid Client ID - did you forget to insert your application Client ID?');
      }
      // Create a new instance of the realtime utility with your client ID.
      var realtimeUtils = new utils.RealtimeUtils({ clientId: clientId });

      authorize();

      function authorize() {
        // Attempt to authorize
        realtimeUtils.authorize(function(response){
          if(response.error){
            // Authorization failed because this is the first time the user has used your application,
            // show the authorize button to prompt them to authorize manually.
            var button = document.getElementById('auth_button');
            button.classList.add('visible');
            console.log("in: authorize, response.error");
            button.addEventListener('click', function () {
              realtimeUtils.authorize(function(response){
                start();
              }, true);
            });
          } else {
              console.log("in: authorize, authorise successful");
              start();//console.log("unauthorized user!");
          }
        }, false);
      }

      function start() {
        // With auth taken care of, load a file, or create one if there
        // is not an id in the URL.


        var id = realtimeUtils.getParam('id');
        if(!id){
            initializemyApp.Book();
          }
        // //register the myApp.Book Collboarative Object
        //   gapi.drive.realtime.custom.registerType(myApp.Book, 'myApp.Book');

        realtimeUtils.createRealtimeFile('New Quickstart File', function(createResponse) {
            window.history.pushState(null, null, '?id=' + createResponse.id);
            realtimeUtils.load(createResponse.id, onFileLoaded, onFileInitialize);
            gapi.load("auth:client,drive-realtime,drive-share", function(){

            })
            fileArr.push(createResponse.id);
          });
        

          /*UNCOMMENT THE BELOW CODE AFTER TESTING. I AM TESTING SETUP, SO I WANT THE CODE TO PREFORM SETUP/INITIALIZATION EVERY TIME*/
        // debugger;
        // if (id) {
        //   // Load the document id from the URL
        //   realtimeUtils.load(id.replace('/', ''), onFileLoaded, onFileInitialize);
        // } else {
        //   // Create a new document, add it to the URL
        //   realtimeUtils.createRealtimeFile('New Quickstart File', function(createResponse) {
        //     window.history.pushState(null, null, '?id=' + createResponse.id);
        //     realtimeUtils.load(createResponse.id, onFileLoaded, onFileInitialize);
        //     gapi.load("auth:client,drive-realtime,drive-share", function(){

        //     })
        //     fileArr.push(createResponse.id);
        //   });
        //   initializemyApp.Book();
        // }
      }

      function initializeBook(){
        console.log("initializing Book!")
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
          myApp.Book = function() {}; //empty constructor "Most custom collaborative objects should have empty constructors."
          //register the myApp.Book Collboarative Object
          gapi.drive.realtime.custom.registerType(myApp.Book, 'myApp.Book');
          gapi.drive.realtime.custom.setInitializer('myApp.Book', doInitialize);
          
          /**
          * Set fields for the myApp.Book Collaborative Object.
          * A book will contain a curPages field, a numPages field, sevearal functions,
          * and a collection (array?) of Pages which are themselves Custom Collaborative Objects
          */
          myApp.Book.prototype.numPages = gapi.drive.realtime.custom.collaborativeField('numPages');
          myApp.Book.prototype.curPage = gapi.drive.realtime.custom.collaborativeField('curPage');
          myApp.Book.prototype.Pages = [];
          myApp.Book.prototype.teststring = gapi.drive.realtime.custom.collaborativeField('test_string');
          myApp.Book.prototype.getnextPage =  function(){
            if (this.curPage < this.numPages) {return this.getPage(currentPage)} else{ return this.getPage(currentPage + 1)};
          } 
          myApp.Book.prototype.getprevPage = function(){
            if (currentPage > 0) {return getPage(currentPage - 1)} else{ return getPage(currentPage)};
          } 
          function getPage(num){
            return ;//????
          } 
          /**
         * Initializer for constructing myApp.Book via the realtime API
         *  This, I belileve, should be only called once in the creation of a unique myApp.Book Object.
         *  I'm not quite sure how to do this and will be looking at it next.
         */
        myApp.Book.prototype.initialize = function (title) {
          // var model = gapi.drive.realtime.custom.getModel(this);
          // this.title = model.createString(title);
          // this.setup();
        };



          /**
         * A simple type for page items.
         * @constructor
         */
          Page = function () {}
          gapi.drive.realtime.custom.registerType(Page, 'Page');

          /**
         * As of now, each page will only contain one collaborative string called information.
         * They can also contain other noncollborative strings.
         */
          Page.prototype.information = gapi.drive.realtime.custom.collaborativeField('string_arr');
      }

      //this the internal debugger; call fires, which means that this code is reached on normal runthrough.
      function doInitialize(numPages, initString) {
        debugger;
        var model = gapi.drive.realtime.custom.getModel(this);
        console.log("model ="+ model);
        if ( numPages > 0){
          this.numPages = numPages;
        }

        this.teststring = initString;
      }

      //the internal debugger; call DOES NOT fire, which means that this code is ONLY reached on the initial setup runthrough.
      // The first time a file is opened, it must be initialized with the
      // document structure. This function will add a collaborative string
      // to our model at the root.
      function onFileInitialize(model) {
        book = setUpAndDisplaymyApp.Book(model);
        console.log(model);
        // /**/ book = model.create('myApp.Book', 1, "Hello World")
        model.getRoot().set('mybook', book);
        console.log("mybook =");
        console.log(model.get('mybook'));
        var string = model.createString();
        string.setText('Welcome to the Quickstart App!');
        model.getRoot().set('demo_string', string);
        debugger;
      }

      // After a file has been initialized and loaded, we can access the
      // document. We will wire up the data model to the UI.
      //the internal debugger; call DOES NOT fire, which means that this code is ONLY reached on the initial setup runthrough.

      function onFileLoaded(doc) {
        DOC = doc;
        setUpAndDisplaymyApp.Book(doc.getModel());
        console.log("file loaded!")
        /* LEARNING REALTIME NOTE:
        root.get('name') gets the object with the given name at the root
        root.set('name') sets the object with the given name at the root*/
        var collaborativeString = doc.getModel().getRoot().get('mybook').teststring;
        debugger;
        wireTextBoxes(collaborativeString);


      }

      // Connects the text boxes to the collaborative string
      //the internal debugger; call DOES NOT fire, which means that this code is ONLY reached on the initial setup runthrough.
      function wireTextBoxes(collaborativeString) {
        var textArea1 = document.getElementById('text_area_1');
        var textArea2 = document.getElementById('text_area_2');
        gapi.drive.realtime.databinding.bindString(collaborativeString, textArea1);
        gapi.drive.realtime.databinding.bindString(collaborativeString, textArea2);
        debugger;
        doc.getModel().getRoot().addEventListener(gapi.drive.realtime.ObjectChangedEvent, function(event){
          //UPDATE PAGE
        })

      }

      //the internal debugger; call fires, which means that this code is reached on normal runthrough.
      function setUpAndDisplayBook(model){
         debugger;
         /**/ book = model.create('myApp.Book', 1, "Hello World")
        /**/
        book.numPages = 1;
        model.getRoot().set('mybook', book);
        book.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, function(event){});
        book.teststring = "Welcome to Google Realtime API."
        console.log(model.get('mybook'));
        var collaborativeString = doc.getModel().getRoot().get('mybook').teststring;
        wireTextBoxes(collaborativeString);
        console.log(book);
        return book;
      }

    /*this does nothing. book is still an empty object when exported to the global namespace
    I believe that one may ahve to call book through the model? in any case, we need to find a way to get ahold 
    of the model in anywhere.*/
  window.book = book;
  window.myApp = myApp;
})(this, this.document);
