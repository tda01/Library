let myLibrary = [];
let library = document.querySelector(".library");
let addBookBtn = document.querySelector(".library-button");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}


function createBook() {
    let bookdiv = document.createElement("div");
    bookdiv.classList.add("book");
    library.appendChild(bookdiv);
}


function addBooktoLibrary() {
    let title = prompt("What is the name of the book?");
    let author = prompt("Who wrote the book?");
    let pages = prompt("How many pages does the book have?");
    let read = prompt("Did you read it?");
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    createBook();
}




if (myLibrary.length > 3) {
    library.style.gridTemplateColumns = "repeat(auto-fit, minmax(350px, 1fr))"
}

addBookBtn.onclick = function() {
    addBooktoLibrary();
}