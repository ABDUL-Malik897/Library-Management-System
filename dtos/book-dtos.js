// Data Transfer Object (DTO) for Books


class IssueBook{
    _id;
    name;
    author;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;


constructor(user){
    this._id = user.issuedBook_id;
    this.name = user.issuedBook_name;
    this.author = user.issuedBook_author;
    this.genre = user.issuedBook_genre;
    this.price = user.issuedBook_price;
    this.publisher = user.issuedBook_publisher;
    this.issuedBy = user.name;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
}
}