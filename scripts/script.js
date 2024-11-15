const myLibrary = [];
const mainDiv = document.getElementById("books");

function showBooks(library) {
    for (let book of library) {
        const bookDiv = document.createElement("div");
        for(let property in book){
            const bookProperty = document.createElement("p");
            const bookValue = document.createTextNode(book[property]);
            bookProperty.appendChild(bookValue);
            bookDiv.appendChild(bookProperty);
        }
        mainDiv.appendChild(bookDiv);
    }
}

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


function addBookToLibrary(title, author, pages, isRead) {
    book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}