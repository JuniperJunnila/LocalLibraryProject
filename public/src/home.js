function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter((book)=>!book.borrows[0].returned).length
}

function getMostCommonGenres(books) {
  let genreIndex = {}
  let allGenres = books.map((book)=>book.genre)
  let genreArr = books.reduce((acc, {genre})=>{
    if (genreIndex[genre]){
      acc[genreIndex[genre]].count ++
    } else {
      genreIndex[genre] = acc.length
      acc.push({name: genre, count: 1})
      return acc
    }
    return acc
  }, [])
  return _sortSlice(genreArr)
}

function getMostPopularBooks(books) {
  let titleArr = books.reduce((acc, {title, borrows})=>{
    acc.push({name:title, count:borrows.length})
    return acc
  }, [])
  return _sortSlice(titleArr)
}


function getMostPopularAuthors(books, authors) {
  let authorArr = authors.reduce((authAcc, {id, name:{first, last}})=>{
    const authorsHits = books.reduce((bookAcc, {authorId, borrows})=>{
      if (authorId === id){
        bookAcc += borrows.length
        return bookAcc
      }
      return bookAcc
    }, 0)
    authAcc.push({name: `${first} ${last}`, count: authorsHits})
    return authAcc
  }, [])
  return _sortSlice(authorArr)
}

function _sortSlice(arr) {
  arr.sort((a, b)=> b.count - a.count)
  return arr.slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
