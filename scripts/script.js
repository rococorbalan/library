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
        pagesInput.value, 
        readInput.checked));

    dialogForm.reset();
})

const myLibrary = [];

// Show Every Book
function displayBook(book) {
    const bookDiv = document.createElement("div");
        for(let property in book){
            const bookProperty = document.createElement("p");
            const bookValue = document.createTextNode(book[property]);
            bookProperty.appendChild(bookValue);
            bookDiv.appendChild(bookProperty);
        }
        mainDiv.appendChild(bookDiv);
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
    myLibrary.push(book);
    return book;
}

