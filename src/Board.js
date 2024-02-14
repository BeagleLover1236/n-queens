// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //declare counter variable to keep track of conflicts
      var counter = 0;

      var row = this.get(rowIndex);
      // iterate through rowIndex
      //check if [i] at rowIndex is equal to 1
      //if it is increment counter
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
      }

      //return if counter variable is greater than 1
      return counter > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //size variable to hold n
      var size = this.get('n');
      //iterate through size
      for (var x = 0; x < size; x++) {
        if (this.hasRowConflictAt(x)) {
          return true;
        }
      }
      //check (call the hasRowConflict at index)
      //return true if has conflict, else false

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //create counter variable
      var counter = 0;

      //create size variable to hold n
      var size = this.get('n');

      //iterate through size, within iteration create variable to get index of row
      //increment count based on row at index [colIndex]
      //return boolean if Counter > 1

      for (var x = 0; x < size; x++) {
        var row = this.get(x);
        counter += row[colIndex];
      }

      return counter > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      //create size variable to hold n
      var size = this.get('n');
      //iterate through size
      //invoke hasColConflictAt x
      //return boolean
      for (var i = 0; i < size; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(rowIndex, columnIndex) {

      //check first row at specified column index
      //create counter variable to keep track of conflicts
      var counter = 0;
      //create size variable to hold n
      var size = this.get('n');

      //create row index variables
      for (var x = 0; x < size; x++) {
        //set row = row index
        var row = this.get(rowIndex + x);
        //if row and column index
        if (row && row[columnIndex + x]) {
          counter += row[columnIndex + x];
        }
        //increment counter variable based on row[column index];
      }

      return counter > 1;


      //return boolean counter > 1
      // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //size variable
      var size = this.get('n');

      //iterate through row index x
      //iterate through column index y
      //check if row/column index is 1
      //check by invoking hasMajorDiagaonlConflict at (rowindex, column index);
      //return true, else return false

      for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
          if (this.get(x)[y] === 1) {
            if (this.hasMajorDiagonalConflictAt(x, y)) {
              return true;
            }
          }
        }
      }


      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowIndex, columnIndex) {
      //change arguments

      //create counter variable to store conflicts
      var counter = 0;

      //create size variable to store n
      var size = this.get('n');
      //iterate through size except now its row+1 ,column - 1

      for (var i = 0; i < size; i++) {
        var row = this.get(rowIndex + i);
        if (row && row[columnIndex - i]) {
          counter += row[columnIndex - i];
        }
      }
      //if (row/column indexes exist)
      //then increase count by row[columnindex - for loop index]

      return counter > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      var size = this.get('n');

      for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
          if (this.get(x)[y] === 1) {
            if (this.hasMinorDiagonalConflictAt(x, y)) {
              return true;
            }
          }
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
