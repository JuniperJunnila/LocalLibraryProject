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
  let genreArr = books.reduce((acc, book)=>{
    const currentGenre = book.genre
    if (genreIndex[currentGenre]){
      acc[genreIndex[currentGenre]].count ++
    } else {
      genreIndex[currentGenre] = acc.length
      acc.push({name: currentGenre, count: 1})
      return acc
    }
    return acc
  }, [])
  genreArr.sort((a, b) => b.count - a.count)
  return genreArr.slice(0, 5)
}

function getMostPopularBooks(books) {
  let titleArr = books.reduce((acc, book)=>{
    acc.push({name:book.title, count:book.borrows.length})
    return acc
  }, [])
  titleArr.sort((a, b) => b.count - a.count)
  titleArr = titleArr.slice(0, 5)
  return titleArr
}


function getMostPopularAuthors(books, authors) {
  let authorArr = authors.reduce((authAcc, author)=>{
    // const bookFilter = books.filter((book)=>book.authId === author.id)
    // let authorsHits = bookFilter.map((book) => book.borrows.length)
    const authorsHits = books.reduce((bookAcc, book)=>{
      if (book.authorId === author.id){
        bookAcc += book.borrows.length
        return bookAcc
      }
      return bookAcc
    }, 0)
    // const aCount = authorsHits.reduce((acc, hit)=> acc += hit, 0)
    authAcc.push({name: `${author.name.first} ${author.name.last}`, count: authorsHits})
    return authAcc
  }, [])
  authorArr.sort((a, b)=> b.count - a.count)
  console.log(authorArr)
  authorArr = authorArr.slice(0, 5)
  return authorArr
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
