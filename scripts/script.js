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

const colorInput = document.getElementById("color-input");
const colorContainer = document.getElementById("color-container");


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
    displayBook((addBookToLibrary(titleInput.value, 
        authorInput.value, 
        pagesInput.value + " Pages",
        readInput.checked)), colorInput.value);

    dialogForm.reset();
})

// Change color input 
colorContainer.backgroundColor = colorInput.value
colorInput.addEventListener("input", () => {
    colorContainer.style.backgroundColor = colorInput.value;
})

const myLibrary = [];

// Create every element for displaying a book
function displayBook(book, color) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const bookBody = document.createElement("div");
    bookBody.classList.add("book-body");

    const bookFooter = document.createElement("div");
    bookFooter.classList.add("book-footer");

        for(let property in book){
            const bookProperty = document.createElement("span");
            const bookValue = document.createTextNode(book[property]);
            if(property === "isRead"){
                if (book["isRead"] === true){
                    bookDiv.classList.add("read")
                    bookDiv.classList.remove("not-read");
                }else {
                    bookDiv.classList.add("not-read")
                    bookDiv.classList.remove("read");
                }
            }
            if(property === "pages"){
                bookProperty.appendChild(bookValue);
                bookFooter.appendChild(bookProperty);
            }else if(property !== "pages" && property !== "isRead"){
                bookProperty.appendChild(bookValue);
                bookBody.appendChild(bookProperty);
            }

            bookDiv.appendChild(bookBody);
            bookDiv.appendChild(bookFooter);
        }
        mainDiv.insertBefore(bookDiv, mainDiv.firstChild);
        bookDiv.style.backgroundColor = color;
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

