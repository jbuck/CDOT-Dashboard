(function() {

  var getElementsByClassName = function( node, classname ) {

    // use native implementation if available
    if (node.getElementsByClassName) {

      return node.getElementsByClassName(classname);
    } else {

      return (function getElementsByClass(searchClass,node) {

          if ( node === null ) {

            node = document;
          }

          var classElements = [],
              els = node.getElementsByTagName("*"),
              elsLen = els.length,
              pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

          for (i = 0, j = 0; i < elsLen; i++) {

            if ( pattern.test(els[i].className) ) {

                classElements[j] = els[i];
                j++;
            }
          }

          return classElements;
      })(classname, node);
    }
  };

  dashBoard.widget( "sequence", function( id, options ){
		
    var sequences = document.getElementById( id ).getElementsByTagName('div'),
        index = 0,
        showSequence = function() {
          sequences[ index++ ].style.display = "none";

          if ( !sequences[ index ] ) {
            index = 0;
          }

          sequences[ index ].style.display = "block";

          setTimeout( showSequence, options.duration * 1000 );
        };

    for ( var i = 1, sl = sequences.length; i < sl; i++ ) {

      sequences[ i ].style.display = "none";
    }

    setTimeout( showSequence, options.duration * 1000 );

  });

})();
