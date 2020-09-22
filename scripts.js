let myLibrary = [];

function Book(title,author,pages,status, bookId){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.bookId = bookId;
    this.returnInfo = function(){
        return title + " by " + author + ", " + pages + " pages, " + status;
    };
};

function NewBook(){};

NewBook.prototype = Object.create(Book.prototype);

function addBookToLibrary() {
  if(myLibrary.length == 0){
    document.querySelector("#empty-state").style.display = "none";
  }
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let status = document.querySelector("#initialStatus").checked;
  let bookId = uniqueId();
  NewBook = new Book(title, author, pages, status, bookId);
  myLibrary.push(NewBook);
  addBookRow(NewBook,myLibrary.length-1);
  return NewBook;
}

function displayBooks(){
    for (let i = 0; i < myLibrary.length; i++) {
      addBookRow(myLibrary[i],i);
    }
}

function addBookRow(book, arrayPosition){
  const bookList = document.querySelector("#bookList");
  const bookRow = document.createElement("li");
  if(book.status){
    bookRow.innerHTML = "<strong>" + book.title + "</strong> - " + book.author + " - " + book.pages + " page(s)"  + " - read? <input type=\"checkbox\" name=\"status\" class=\"checkbox\" checked> <button class=\'removeBook\')>delete</button>";
  } else {
    bookRow.innerHTML = "<strong>" + book.title + "</strong> - " + book.author + " - " + book.pages + " page(s)" + " - read? <input type=\"checkbox\" name=\"status\" class=\"checkbox\"> <button class=\'removeBook'>delete</button>";
  }
  bookRow.setAttribute("id",book.bookId);
  bookList.appendChild(bookRow);
}

function removeBook(id){
  myLibrary.splice(index(id),1)
  let RowToRemove = document.getElementById(id)
  RowToRemove.parentNode.removeChild(RowToRemove);
}

function changeReadStatus(id, checked){
  let ind = myLibrary.findIndex(e => e.bookId == id)
  myLibrary[ind].status = checked;
}

document.querySelector("#addBook").addEventListener("click", function(){
  if(validateForm()){
    addBookToLibrary();
    addRemovalEvent();
    addCheckboxEvent();
    console.log(NewBook);
    console.log(myLibrary);
  }
});

function addRemovalEvent(){
  const removeButton = document.querySelectorAll(".removeBook");
  removeButton.forEach(function(e){
    if(!(e.classList.contains(".hasRemoveListener"))){
      e.classList.add(".hasRemoveListener");
      e.addEventListener("click", function(event){
        removeBook(e.parentElement.id);
      });
    }
  });
};

function addCheckboxEvent(){
  const checkbox = document.querySelectorAll(".checkbox");
  checkbox.forEach(function(e){
    if(!(e.classList.contains(".hasCheckboxListener"))){
      e.classList.add(".hasCheckboxListener");
      e.addEventListener("click", function(){
        changeReadStatus(e.parentElement.id, e.checked);
      })
    }
  })
}

function validateForm() {
  let titleValue = document.querySelector("#title").value;
  let authorValue = document.querySelector("#author").value;
  let pagesValue = document.querySelector("#pages").value;
  if (titleValue == "" || authorValue == "" || pagesValue == "") {
    return false;
  } else {return true}
}

function makeCounter() {
  var i = 0;
  return function() {
      return i++;
  }
}

function index(id) {
   for(let i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].bookId == id){
      return i;
    }
  }
  return -1;
}

let uniqueId = makeCounter();
let theHobbit = new Book('The Hobbit','J.R.R. Tolkein',295,'not read yet');