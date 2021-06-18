function findAccountById(accounts, id) {
  return accounts.find((account)=>account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.toLowerCase() > b.name.last.toLowerCase()?1:-1)
}

function getTotalNumberOfBorrows({id}, books) {
  return books.filter(({borrows})=> borrows.find((borrow) => borrow.id === id)).length
}

function getBooksPossessedByAccount(account, books, authors) {
  const allCheckedOutBooks = _Checkout(books, account.id)
  return allCheckedOutBooks.reduce((acc, book)=> {
    book.author = authors.find((author)=>author.id === book.authorId)
    acc.push(book)
    return acc
  }, [])
}

function _Checkout(books, id) {
  return books.filter((book)=>!book.borrows[0].returned && book.borrows[0].id === id)
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
