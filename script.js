let myLibrary = [];
let library = document.querySelector(".library");
let addBookBtn = document.querySelector(".library-button");
let formContainer = document.querySelector("#form-container");
let form = document.querySelector("form");
let overlay = document.querySelector("#overlay");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function closeModal() {
    formContainer.classList.remove("active");
    overlay.classList.remove("active");
}

form.addEventListener("submit", function(event) {

    event.preventDefault();
    closeModal();
    let book = getBookfromInput();
    myLibrary.push(book);
    createBookDiv(book);

})

addBookBtn.addEventListener("click", function () {
    form.reset();
    formContainer.classList.add("active");
    overlay.classList.add("active");

})

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
        form.reset();
    }
});

function createBookDiv(book) {
    let bookDiv = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("h3");
    let pages = document.createElement("p");
    let read = document.createElement("button");
    let remove = document.createElement("button");

    title.innerHTML = `${book.title}`;
    author.innerHTML = `${book.author}`;
    pages.innerHTML = `${book.pages} pages`;
    remove.innerHTML = "Remove";

    read.classList.add("read");
    if (book.read == true) {
        read.innerHTML = "Read";
        read.classList.add("true");
    }  else {
        read.innerHTML = "Not read";
        read.classList.add("false");
    }

    bookDiv.classList.add("book");
    title.classList.add("title");
    author.classList.add("author");
    remove.classList.add("remove");


    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(read);
    bookDiv.appendChild(remove);
    library.appendChild(bookDiv);


    read.addEventListener("click", function() {
        book.changeStatus();
        changeReadStatus(read);
    })

    remove.addEventListener("click", function () {
        bookDiv.remove();
        book.removeBook();
    })

}

function getBookfromInput() {

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let readStatus = document.querySelector("#readit").checked;

    return new Book(title, author, pages, readStatus);

}

Book.prototype.changeStatus = function () {

    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    }

}

function changeReadStatus(button) {
    if (button.innerHTML === "Read") {
        button.innerHTML = "Not read";
        button.classList.remove("true");
        button.classList.add("false");
    } else {
        button.innerHTML = "Read";
        button.classList.remove("false");
        button.classList.add("true");
    }
}

Book.prototype.removeBook = function() {
    myLibrary.forEach(book => {
        if (this.title == book.title && this.author) {
            myLibrary = myLibrary.filter(item => item !== book);
        }
    })
}

