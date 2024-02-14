/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {


  //create a new instance of board
  var board = new Board({n: n});
  //set solution variable
  var solution = undefined;

  // function: (first check if our row equals n)
  // iterate thru column (to add rook piece)
  // check conflicts (hasAnyRooksConflicts)
  // increment to next row
  // true if solution is good, else delete piece
  // return false;

  //function will loop while i < n
  //for each iteration for example (0,0)
  //it will toggle the piece at that location
  //checks if the board doesnt have any rooks conflicts
  //if it does not have any conflicts
  var search = function(row) {
    if (row === n) {
      solution = board.rows().map(function(sliced) {
        return sliced.slice();
      });
      return true;
    }
    //i denoting column
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        if (search(row + 1)) {
          return true;
        }
      }
      board.togglePiece(row, i);
    }
    return false;

  };


  search(0);

  if (solution === undefined) {
    solution = board.rows();
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0; //fixme

  var search = function(row) {
    if (row === n) {
      return solutionCount++;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        search(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  search(0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

//solution is defined as no Queens sharing ANY row, column, and diagonals

// only works for n <= 4

//the time complexity of findNQueensSolution:
//-best case: O(n)
//worst case: O(n^4)

window.findNQueensSolution = function(n) {

  //create new board instance
  var board = new Board({'n': n});
  var solution = undefined; //fixme

  //within function we will check if board is valid
  var boardValidity = function() {
    return !board.hasAnyQueensConflicts();
  };

  //create recursive function that loops through matrix and places queens without conflicts
  var search = function(row) {
    //checks if there are the right amount of queens on board
    //if there are we set solution to
    if (row === n) {
      solution = board.rows().map(function(sliced) {
        return sliced.slice();
      });
      return true;
    }
    //y denotes column
    //
    for (var y = 0; y < n; y++) {
      board.togglePiece(row, y);
      if (boardValidity()) {
        if (search(row + 1)) {
          return true;
        }
      }
      board.togglePiece(row, y);
    }

    //remove previous queen placement callback

    return false;
  };

  search(0);

  //if n is < 4
  if (solution === undefined) {
    solution = board.rows();
  }



  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other


//the time complexity of countNQueensSolution:
//best: O(n)
//worst: O(n^4)
window.countNQueensSolutions = function(n) {

  var board = new Board({'n': n});
  //counter variable to track queen solutions
  var solutionCount = 0; //fixme

  //attack path checker
  var boardValidity = function() {
    return !board.hasAnyQueensConflicts();
  };

  //recursively places queen in each row/column
  var search = function(row) {
    //prints out a solution if row equals n
    if (row === n) {
      return solutionCount++;
    }

    //iterates through column (denoted by i) and checks paths
    //calls search
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (boardValidity()) {
        search(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  search(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
