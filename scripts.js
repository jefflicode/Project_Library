const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook(e) {
  e.target.parentElement.parentElement.remove();
}

function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
}

function changeReadStatus(e) {
    const className = e.target.id;
    const readStatus = document.querySelector(`.${className}`);
    if (readStatus.innerHTML === "yes") {
        readStatus.innerHTML = "no";
    } else {
        readStatus.innerHTML = "yes";
    }
}

function displayLibraryBook(myLibrary) {
  for (const book of myLibrary) {
    const table = document.querySelector(".table");
    const newBook = document.createElement("tr");
    const title = document.createElement("td");

    title.textContent = book.title;
    newBook.appendChild(title);
    const author = document.createElement("td");
    author.textContent = book.author;
    newBook.appendChild(author);
    const pages = document.createElement("td");
    pages.textContent = book.pages;
    newBook.appendChild(pages);
    const read = document.createElement("td");
    read.textContent = book.read;
    const newBookClassName = `${book.title}${book.author}`;
    read.classList.add(newBookClassName.split(" ").join("").replace(/\W/g, ''));

    newBook.appendChild(read);
    
    // Add button to the left of table row
    const removeBookButtonRow = document.createElement("td");
    const removeBookButton = document.createElement("button");
    css(removeBookButton, {
        'background-color': '#D2042D',
        'color': 'white',
        'border-radius': '5px',
        "border-color": "white",
        "border": "solid",
        'font-size': '15px',
        'height': '40px'
    });
    removeBookButton.textContent = "remove book";
    removeBookButton.onclick = removeBook;
    removeBookButtonRow.appendChild(removeBookButton);
    newBook.appendChild(removeBookButtonRow);

    const changeReadStautsButtonRow = document.createElement("td");
    const changeReadStatusButton = document.createElement("button");
    css(changeReadStatusButton, {
        'background-color': '#50C878',
        'color': 'white',
        'border-radius': '5px',
        "border-color": "white",
        "border": "solid",
        'font-size': '15px',
        'height': '40px'
    });
    changeReadStatusButton.textContent = "change read status";
    changeReadStatusButton.onclick = changeReadStatus;
    changeReadStatusButton.setAttribute("id", newBookClassName.split(" ").join("").replace(/\W/g, ''));
    changeReadStautsButtonRow.appendChild(changeReadStatusButton);
    newBook.appendChild(changeReadStautsButtonRow);

    table.appendChild(newBook);
    // if you don't remove the book from the list after displaying it, it will get displayed multiple times
    myLibrary.pop(book);
  }
}

const addBookButton = document.querySelector(".newBookButton");
const dialogNewBook = document.querySelector(".dialogNewBook");
const dialogCancel = document.querySelector(".dialogCancel");
const dialogSubmit = document.querySelector("#dialogSubmit");

addBookButton.addEventListener("click", () => {
  dialogNewBook.showModal();
  document.querySelector("#inputFormTitle").value = "";
  document.querySelector("#inputFormAuthor").value = "";
  document.querySelector("#inputFormPages").value = "";
});

dialogCancel.addEventListener("click", (event) => {
  event.preventDefault();
  dialogNewBook.close();
});

dialogSubmit.addEventListener("click", (event) => {
  // you may wish to explore dialogs and modals using the <dialog> tag. However you do this, you will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the submit input tries to send the data to a server by default. If you’ve done the bonus section for the calculator assignment, you might be familiar with event.preventDefault();
  event.preventDefault();
  const title = document.querySelector("#inputFormTitle").value;
  const author = document.querySelector("#inputFormAuthor").value;
  const pages = document.querySelector("#inputFormPages").value;
  const readStatus = document.querySelector("#inputFormRead:checked").value;

  if (title.length > 0 && author.length > 0 && pages.length > 0) {
    const book = new Book(title, author, pages, readStatus);
    addBookToLibrary(book);
    displayLibraryBook(myLibrary);
    dialogNewBook.close();
  }
});
