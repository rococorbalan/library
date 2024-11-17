// Div where the books are stored
const mainDiv = document.getElementById("books");

// Dialog
const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add");
const closeButton = document.querySelector("dialog button");

// Dialog Form
const dialogForm = document.getElementById("add-form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readInput = document.getElementById("read-input");
const saveButton = document.getElementById("save");


//Open dialog
addButton.addEventListener("click", () => {
    dialog.showModal();
})

//Close dialog
closeButton.addEventListener("click", () => {
    dialog.close();
})

dialog.addEventListener("click", (event) => {
    if(event.target == dialog){
        dialog.close();
    }
})

saveButton.addEventListener("click", (event)=> {
    event.preventDefault();
    dialog.close();
    displayBook(addBookToLibrary(titleInput.value, 
        authorInput.value, 
        (readInput.checked === true ? "Read" : "Not Read"),
        pagesInput.value));

    dialogForm.reset();
})

const myLibrary = [];

// Create every element for displaying a book
function displayBook(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const bookBody = document.createElement("div");
    bookBody.classList.add("book-body");

    const bookFooter = document.createElement("div");
    bookFooter.classList.add("book-footer");

        for(let property in book){
            const bookProperty = document.createElement("span");
            const bookValue = document.createTextNode(book[property]);
            if(property === "pages"|| property === "isRead"){
                bookProperty.appendChild(bookValue);
                bookFooter.appendChild(bookProperty);
            }else {
                bookProperty.appendChild(bookValue);
                bookBody.appendChild(bookProperty);
            }

            bookDiv.appendChild(bookBody);
            bookDiv.appendChild(bookFooter);
        }
        mainDiv.insertBefore(bookDiv, mainDiv.firstChild);
}

// Book Constructor
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Push book to library array
function addBookToLibrary(title, author, pages, isRead) {
    book = new Book(title, author, pages, isRead);
    myLibrary.unshift(book);
    return book;
}

