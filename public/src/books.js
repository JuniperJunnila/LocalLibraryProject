function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return [
    books.filter((book) => !book.borrows[0].returned),
    books.filter((book) => book.borrows[0].returned),
  ];
}

function getBorrowersForBook({borrows}, accounts) {
  let borrowersArr = accounts.reduce((acc, account) => {
    for (let inst of borrows) {
      if (inst.id === account.id) {
        account.returned = inst.returned;
        acc.push(account);
      }
    }
    return acc
  }, []);
  return borrowersArr.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
