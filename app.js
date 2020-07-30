//Book Class:Represents a Book 
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}


//UI clas :Handle UI Tasks
class UI{
    static displayBooks(){//Que es static 
        
        const books=Store.getBooks();
        books.forEach((book)=>{
            UI.addBookToList(book)
        })
    }
    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');//repazar DOM
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='btn btn-danger btn-sm delete'>X</a></td>`;

        list.appendChild(row);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form)
        //Make vanishing after 3s
        setTimeout(()=>
            document.querySelector('.alert').remove(),
        3000);
    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#ISBN').value='';

    }
 
}

//Store Class: Hadnle Storage 
class Store{
    static getBooks(){//you can only store array in local storage 
        let books;
        if (localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn==isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books))
    }
}



//Events: Display books 
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event: Add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    //get form values
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#ISBN').value;
    //Validation 
    if(title==''||author==''||isbn==''){
        UI.showAlert('Please fill the fields','danger')
    }else{
         //Instatiate a book 
    
    const book= new Book(title,author,isbn);
    console.log(book)
    
    //Add book to UI
    UI.addBookToList(book);
    
    //Store book in localstorage
    Store.addBook(book);
    //Show SUccess
    UI.showAlert('Book added','success')
    //clear fills
    UI.clearFields()
    }
   

})
//Event:Remove a book 
document.querySelector('#book-list').addEventListener('click',e=>{
    //delelete book from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //delete book from UI
    UI.deleteBook(e.target),
    //Remove Book Alert
    UI.showAlert('Book Removed','warning')

    
})