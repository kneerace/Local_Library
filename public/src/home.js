function getTotalBooksCount(books) {
  // using length property
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //using length property
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // initiating variable to capture the result
  let borrowedBooks = 0;
  // iterating books array using forEach
    // in book object validating if the first obj in array is false, increase the borrowed list count, else keep the same
  books.forEach(book=> !book.borrows[0].returned ? borrowedBooks++ : borrowedBooks);
  return borrowedBooks;
}

function getMostCommonGenres(books){
  //iterating books Array, and checking presence of book.genre
  const res = books.reduce((result,book) =>
  // if exists in the result object, which is instanciated as {}, then add 1 to it 
    { if(result[book.genre]) {
      result[book.genre]++;
    }else {
    // if not present, add the genre to the object with count of 1
      result[book.genre]= 1;
    }
    // console.log(result);
    //returning the result object to res
    return result;
    }, {});
    // console.log(res);
    // converting object array to key and value pair using map()
        // first iterating using Object.entries
            // accessing name as count in two variable, then returning as object under key name and count  
    const commonGenreArray = Object.entries(res).map(([name, count])=> {
      return {name, count}; });
    // sorting using value of key count in descending order  
    const commonGenreArrayDescending = commonGenreArray.sort((a,b)=> b.count - a.count);
    // console.log( commonGenreArrayDescending);
    //returning only first 5 object within an array.  
    return commonGenreArrayDescending.slice(0,5);
  }

//helper fuction to get number of borrowers for books
  function borrowerPerBooks(books){
    //iterating books Array, and checking presence of book.title
    const res = books.reduce((result,book) =>
// for every book.title, get the number of borrows and create object 
  { result[book.title] = book.borrows.length;
  //returning the result object to res
  return result;
  }, {});
  return res;
};

function getMostPopularBooks(books) {

  const borrowerPerBook = borrowerPerBooks(books);
  // converting object array to key and value pair using map()
      // first iterating using Object.entries
          // accessing name as count in two variable, then returning as object under key name and count  
  const mostPopularArray = Object.entries(borrowerPerBook).map(([name, count])=> {
    return {name, count}; });
  // sorting using value of key count in descending order  
  const mostPopularArrayDescending = mostPopularArray.sort((a,b)=> b.count - a.count);
  // console.log( commonGenreArrayDescending);
  //returning only first 5 object within an array.  
  return mostPopularArrayDescending.slice(0,5);
}


function getMostPopularAuthors(books, authors){
  // iterating using reduce, and instanciating {}, to capture the authorID from books object, and count of borrower from borrows array length
  const authorID_count = books.reduce((result,book) =>
        {
          if (result[book.authorId]){  // checking if the authorID exists in the result {}
            result[book.authorId] = result[book.authorId] + book.borrows.length;   // if exists, add books.borrows.length to it
          }
          else{
          result[book.authorId] = book.borrows.length; // if do not exist isert the count
          }
        return result;
        }, {});
//         console.log(authorID_count);
        // updating object array to key value        
        const popAuthorArray = Object.entries(authorID_count).map(([authid, count])=> {
          let authName = authors.find(author=> author.id == authid);  // finding the authorID in the author object
          const name = `${authName.name.first} ${authName.name.last}`;  // upon find getting first and last name and concatinating using template literals
          return {name, count}; 
        });
        const popAuthorArrayDescending = popAuthorArray.sort((a,b)=> b.count - a.count); // sorting to descending using count key values
        console.log( popAuthorArrayDescending);
          
        return popAuthorArrayDescending.slice(0,5); // sending ony 5 using slice
      }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
