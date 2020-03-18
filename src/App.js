import React ,{Component} from 'react';
import {Input,Label,Table,Button,Modal,ModalHeader,ModalBody,ModalFooter, FormGroup, InputGroup} from 'reactstrap'
import axios from 'axios';

class App extends Component {
  state={
    books:[],
    newBookData:{
      title:'',
      author:'',
      house:'',
      description:''
    },
    detailBookData:{
      id:'',
      title:'',
      author:'',
      house:'',
      description:''
    },
    searchBookData:{
      id:'',
      title:'',
      author:'',
      house:'',
      description:''
    },
    newBookModal:false,
    detailBookModal:false

  }
  componentWillMount(){
    axios.get('https://5e64a48ba49c210016106ad8.mockapi.io/api/kitapevi').then((response)=>{
          this.setState({
            books: response.data
          })
        });
  }
    toogleNewBookModal(){
      this.setState({
        newBookModal:!this.state.newBookModal
      });
    }
    toogleDetailBookModal(){
      this.setState({
        detailBookModal:!this.state.detailBookModal
      });
    }
    addBook(){
      axios.post('https://5e64a48ba49c210016106ad8.mockapi.io/api/kitapevi',this.state.newBookData).then((response)=>{
        let {books}=this.state;
        books.push(response.data);
        this.setState({
          books,newBookModal:false,newBookData:{
            title:'',
            author:'',
            house:'',
            description:''
          } 
        });
      });
    }
 searchBooks(stringss ){
    if(stringss===""){
      axios.get('https://5e64a48ba49c210016106ad8.mockapi.io/api/kitapevi').then((response)=>{
        this.setState({
          books: response.data
        })
      });
    }
    else {
   
      axios.get('https://5e64a48ba49c210016106ad8.mockapi.io/api/kitapevi').then((response)=>{
        this.setState({
          books: response.data.filter(data => data.title.toLowerCase().includes(stringss) ||data.author.toLowerCase().includes(stringss)  || data.house.toLowerCase().includes(stringss)  )
        })
      });
    }
  }
render(){
  let books=this.state.books.map((book)=>{
    return(
      <tr key={book.id}>
           <td>{book.id}</td>
           <td>{book.title} </td>
           <td>{book.author}</td>
           <td>{book.house}</td>
        <td>
        <Button color="success" size="sm" onClick={(e)=>{
          let{ detailBookData}=this.state;
          detailBookData.title=book.title;
          detailBookData.author=book.author;
          detailBookData.house=book.house;
          detailBookData.description=book.description;
          this.setState({detailBookData, detailBookModal:true});
       
        }}>Detay</Button>
      
      </td>
    </tr>
    
    )
  }) 
  return (
    <div className="App container" >
      <h1>KİTAP EVİ</h1>
       <Button  className="my-3" color="primary" onClick={this.toogleNewBookModal.bind(this)}>Kitap Ekle </Button>
       <FormGroup >
        <div className="form-group">
          <Input  className="form-control" placeholder="arama" 
         onChange={(e)=>{
          let{ searchBookData}=this.state;
          searchBookData.title=e.target.value;
          this.setState({searchBookData});
           }
        }
          ></Input>
        </div>
        <Button className="btn btn-danger"  onClick={this.searchBooks.bind(this,this.state.searchBookData.title) } >Search</Button>
      </FormGroup>
        <Modal isOpen={this.state.newBookModal} toggle={this.toogleNewBookModal.bind(this)} >
          <ModalHeader toggle={this.toogleNewBookModal.bind(this)}>Yeni bir kitap ekle</ModalHeader>
           <ModalBody>
             <FormGroup>
             <Label for="title">Kitap Adı </Label>
             <Input id="title" value={this.state.newBookData.title} onChange={(e)=>{
               let{ newBookData}=this.state;
               newBookData.title=e.target.value;
               this.setState({newBookData});
             }} ></Input>
             </FormGroup>
             <FormGroup>
             <Label for="author">Yazar </Label>
             <Input id="author"value={this.state.newBookData.author} onChange={(e)=>{
               let{ newBookData}=this.state;
               newBookData.author=e.target.value;
               this.setState({newBookData});
             }} ></Input>
             </FormGroup>
             <FormGroup>
             <Label for="house">Yayın Evi </Label>
             <Input id="house" value={this.state.newBookData.house}  onChange={(e)=>{
               let{ newBookData}=this.state;
               newBookData.house=e.target.value;
               this.setState({newBookData});
             }}></Input>
             </FormGroup> 
             <FormGroup>
             <Label for="description">Açıklama </Label>
             <Input id="description"value={this.state.newBookData.description}  onChange={(e)=>{
               let{ newBookData}=this.state;
               newBookData.description=e.target.value;
               this.setState({newBookData});
             }} ></Input>
             </FormGroup>
           </ModalBody>
         <ModalFooter>
          <Button color="primary" onClick={this.addBook.bind(this)}>Kitap Ekle</Button>
          <Button color="secondary" onClick={this.toogleNewBookModal.bind(this)}>İptal</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.detailBookModal} toggle={this.toogleDetailBookModal.bind(this)} >
          <ModalHeader toggle={this.toogleDetailBookModal.bind(this)}>Kitap Detayı</ModalHeader>
           <ModalBody>
             <InputGroup>
             <Label for="title">Kitap Adı : { this.state.detailBookData.title}  </Label>
             </InputGroup>
             <InputGroup>
             <Label for="author">Yazar : { this.state.detailBookData.author}</Label>
             </InputGroup>
             <InputGroup>
             <Label for="house"  >Yayın Evi :{ this.state.detailBookData.house} </Label>
             </InputGroup>
             <InputGroup>
             <Label for="description">Açıklama : { this.state.detailBookData.description}</Label>
             </InputGroup>
           </ModalBody>
      </Modal>

  
       <Table>
         <thead>
           <tr>
             <th> #</th>
             <th> Kitap Adı</th>
             <th> Yazar</th>
             <th> Yayın Evi</th>
             <th> İşlemler </th>
           </tr>
         </thead>
         <tbody>
         {books}
         </tbody>
       </Table>

    </div>
    
  )
}
}
export default App;
