// Div where the books are stored
const mainDiv = document.getElementById("books");

// Dialog Add
const dialogAdd = document.getElementById("dialog-add");
const addButton = document.getElementById("add");
const closeButton = document.querySelector("dialog button");

// Dialog Edit
const dialogEdit = document.getElementById("dialog-edit");

// Dialog Form
const dialogForm = document.getElementById("add-form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readInput = document.getElementById("read-input");

const saveNewBook = document.getElementById("save-new");

const colorInput = document.getElementById("color-input");
const colorContainer = document.getElementById("color-container");

// Selects everybook
let bookList = document.querySelectorAll(".book");
const inputsEdits = document.getElementById("form").children;
updateBookList();

//Open dialog
addButton.addEventListener("click", () => {
    dialogAdd.showModal();
})

//Close dialog
closeButton.addEventListener("click", () => {
    dialogAdd.close();
})

dialogAdd.addEventListener("click", (event) => {
    if(event.target == dialogAdd){
        dialogAdd.close();
    }
})

saveNewBook.addEventListener("click", (event)=> {
    event.preventDefault();
    dialogAdd.close();
    displayBook((addBookToLibrary(titleInput.value, 
        authorInput.value, 
        pagesInput.value + " pages",
        readInput.checked)), colorInput.value);

    dialogForm.reset();
    colorInput.value = "#485696";
    updateColor();
})

// Change color input 
let inputColor = colorInput.value;
colorInput.addEventListener("input", updateColor);

const oneNineEightyFour = new Book("1984", "George Orwell", "273 pages", true);
const myLibrary = [oneNineEightyFour];
displayBook(myLibrary[0], "#485696");

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
        bookDiv.style.color = colorIsDarkAdvanced(inputColor) ? "#FFFFFF" : "#000000";

        updateBookList();
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

// Calculate if need black or white font
function colorIsDarkAdvanced(bgColor) {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    let uicolors = [r / 255, g / 255, b / 255];
    let c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return L <= 0.179;
}


function updateColor() {
    inputColor = colorInput.value;
    colorContainer.style.backgroundColor = inputColor;
}


function updateBookList() {
    bookList = document.querySelectorAll(".book");

    dialogEdit.addEventListener("click", (event) => {
        if(event.target == dialogEdit){
            dialogEdit.close();
        }
    })

    for (const book of bookList){
        book.removeEventListener("click", updateBookInfo);
        book.addEventListener("click", updateBookInfo);
    }

}

function updateBookInfo(event){
    const book = event.currentTarget;
    
    dialogEdit.showModal();

    const bookIndex = (Array.prototype.indexOf.call(bookList, book));
    const selectedBook = myLibrary[bookIndex];
    console.log(selectedBook);

    inputsEdits[0].textContent = selectedBook.title;
    inputsEdits[1].textContent = selectedBook.author;
    inputsEdits[2].textContent = selectedBook.pages;
    inputsEdits[3].textContent = selectedBook.isRead;

}