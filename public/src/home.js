function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;
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

function getMostPopularBooks(books) {
//iterating books Array, and checking presence of book.title
const res = books.reduce((result,book) =>
// for every book.title, get the number of borrows and create object 
  { result[book.title] = book.borrows.length;
  //returning the result object to res
  return result;
  }, {});
  // converting object array to key and value pair using map()
      // first iterating using Object.entries
          // accessing name as count in two variable, then returning as object under key name and count  
  const mostPopularArray = Object.entries(res).map(([name, count])=> {
    return {name, count}; });
  // sorting using value of key count in descending order  
  const mostPopularArrayDescending = mostPopularArray.sort((a,b)=> b.count - a.count);
  // console.log( commonGenreArrayDescending);
  //returning only first 5 object within an array.  
  return mostPopularArrayDescending.slice(0,5);
}


function getMostPopularAuthors(books, authors){
  const authorID_count = books.reduce((result,book) =>
        {
          if (result[book.authorId]){
            result[book.authorId] = result[book.authorId] + book.borrows.length;
          }
          else{
          result[book.authorId] = book.borrows.length;
          }
        return result;
        }, {});
        console.log(authorID_count);
                
        const popAuthorArray = Object.entries(authorID_count).map(([authid, count])=> {
          let authName = authors.find(author=> author.id == authid);
          const name = `${authName.name.first} ${authName.name.last}`;
          return {name, count}; 
        });
        const popAuthorArrayDescending = popAuthorArray.sort((a,b)=> b.count - a.count);
        console.log( popAuthorArrayDescending);
          
        return popAuthorArrayDescending.slice(0,5);;
      }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
