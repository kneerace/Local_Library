function findAccountById(accounts, id) {
  // utilizing find so that it returns first matching objectß
  const acct = accounts.find((item)=> item.id === id);
  return acct;  
}

function sortAccountsByLastName(accounts) {
  //using sort(), getting last name and then lowering to lowercase before comparision
  return accounts.sort((first, second)=>
    first.name.last.toLocaleLowerCase() > second.name.last.toLocaleLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  // account is an object
  // books is an array with all book objects
  const acctID = account.id;
  // variable to hold count, so should be updatable 
  let count = 0;
  // iterating through books object Array
  books.filter((book)=>{
    const borr = book.borrows; // during iteration holding values of borrows i.e. array
    const add = borr.reduce((result, firstObj)=> // iterating through borr array to add based on condition
    firstObj['id'] === acctID ? result+=1 : result, 0);
       count += add;   // value received via reduce, adding to the global count
  })
  return count; // returning the final count.
}

function getBooksPossessedByAccount(account, books, authors){
  // account object, array of all books, array of all authors
  
  //placeholder for the accountID from the object account.
  const acctID = account.id;
  //iterating througth books array, taking book object and comparing borrows.id === acctID and as well where borrows.returned is false
  const books_taken = [];
    books.forEach(book=>{
      if (book.borrows.some(item=>item.id === acctID && !item.returned)) {
        //if true push the book object in the boooks_taken array
        books_taken.push(book);
      }
    })
//     console.log(books_taken);
  // iterating through books_taken array and finding the match for the book.authorID === author.id
  
    books_taken.forEach(book=>{
      let authDetails = authors.find(author => author.id === book.authorId);
      // object returned via find is then captured, and inserted into book_taken object
      book['author'] = authDetails;
    })
//     console.log(books_taken);
    return books_taken;
  }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
