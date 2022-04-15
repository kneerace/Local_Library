function findAuthorById(authors, id) {
  // using find as to return as object for first matching one
  const result = authors.find((author)=>
              author.id === id);
  return result;
}

function findBookById(books, id) {
  // using find as to return as object for first matching one
    const book = books.find((book)=> book.id === id);
    return book;
}

function partitionBooksByBorrowedStatus(books) {
  // books that has been returned 
  //iterating through books using filter, and getting result based on the book.borrow.returned is true for all 
  const booksReturnedStatus = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true));
  
  // books thats yet with some account
  //iterating through books using filter, and getting result based on the book.borrow.returned is false for any 
  const booksBorrowedStatus = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false));
  
  // utilizing spread operator to have both result within an array
  const result = [[...booksBorrowedStatus],[...booksReturnedStatus]];
  //returning the result captured.
  return result;
}

function getBorrowersForBook(book, accounts) {
  // book object
  //accounts = array of all account objects
  // capturing all the account and the books based on the borrower id
const result = book.borrows.map((borrow)=>
    { const acct = accounts.find((account)=> account.id === borrow.id);
     // concating both the objects 
      return { ...borrow, ...acct};
    });
    //returning only 10 using slice
    return result.slice(0,10);
 }


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
