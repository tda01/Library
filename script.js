class Library {
    constructor() {
        this.books = [];
    }
    addBook = (book) => {
        this.books.push(book);
    }
    removeBook = (book) => {
        this.books.forEach(libBook => {
            if (libBook.title === book.title && libBook.author) {
                this.books = this.books.filter(item => item !== book);
            }
        })
    }
}
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    changeStatus = () => {
        if (this.read === true) {
            this.read = false;
        } else {
            this.read = true;
        }
    }
}

const displayController = (() => {
    const libraryDiv = document.querySelector(".library");
    const addBookBtn = document.querySelector(".library-button");
    const formContainer = document.querySelector("#form-container");
    const form = document.querySelector("form");
    const overlay = document.querySelector("#overlay");

    const getBookFromInput = () => {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let readStatus = document.querySelector("#readit").checked;

        return new Book(title, author, pages, readStatus);
    }
    const changeReadStatus = (button) => {
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
    const createBookDiv = (book) => {
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
        if (book.read === true) {
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
        libraryDiv.appendChild(bookDiv);


        read.addEventListener("click", function() {
            book.changeStatus();
            changeReadStatus(read);
        })

        remove.addEventListener("click", function () {
            bookDiv.remove();
            library.removeBook(book);
        })

    }
    const closeModal = () => {
        formContainer.classList.remove("active");
        overlay.classList.remove("active");
    }
    const openLibrary = () => {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            closeModal();
            let book = getBookFromInput();
            library.addBook(book);
            createBookDiv(book);
        })

        addBookBtn.addEventListener("click", function () {
            form.reset();
            formContainer.classList.add("active");
            overlay.classList.add("active");

        })

        window.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                closeModal();
                form.reset();
            }
        });

        window.addEventListener("click", (event) => {
            if(event.target !== formContainer && event.target !== addBookBtn && !formContainer.contains(event.target)) {
                closeModal();
                form.reset();
            }
        })
    }

    return {openLibrary};
})();

library = new Library();
displayController.openLibrary();
