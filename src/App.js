import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Card, CardGroup, CardHeader, CardText, CardBody, Col, Row, Button } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      next:'',
      prev:'',
      count:'',
      url: "https://swapi.co/api/people", 
      page:'',
      openDeleteModal : false,
      activeItemName : '',
      activeItemId: null
    }
  this.handlePage = this.handlePage.bind(this);
  this.handleNext = this.handleNext.bind(this);
  this.handleModal = this.handleModal.bind(this);
  this.hideModal = this. hideModal.bind(this);
  }

  componentDidMount() {
        fetch(this.state.url)
          .then(Response => Response.json())
          .then((findresponse) => {
              console.log(findresponse)
              this.setState({
                people:findresponse.results,
                next:findresponse.next,
                prev:findresponse.previous,
                count:findresponse.count
          })
          })
}

  handlePage(page){
    this.setState({
      url: "https://swapi.co/api/people/?page="+page
    })
  }

  handleNext(){
    this.setState({
      url: '${this.state.next}'
    })
  }

  handleModal(e, item){
    this.setState({ 
      openDeleteModal: true,
      activeItemName: item.name
    })
  }

  hideModal() {
    this.setState({ activeModal: null})
  }

  render() {
    var pagination = []
    //loop how much page
    for (var i = 0; i < this.state.count/10; i++) {
      pagination.push(
            <PaginationItem onChange={this.handlePage} value={i+1} key={(i+1).toString()}>
              <PaginationLink href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
      )
    }

    return (
      <div>
        <div className="background">
        <Row className="justify-content-center">
          <Col sm="6" style={{ marginTop: '2rem' }}> 
            
              <h2 style={{marginBottom: '0.5em'}}>Peoples from StarWars Movies</h2>
          
            { this.state.people.map((data, i) => (
                <Col xs="6" sm="11" style={{padding:0}}>
                   <Card style={{height: '3vw'}} key={(i+1).toString()}>
                    <CardBody style={{padding:'0.6rem'}}>
                      <CardText>
                        <a style={{color: 'rgb(0,0,0)'}}>{i+1}. {data.name}</a><a href ="" id={i} onClick={e => this.handleModal(e, data)} style={{float: 'right', clear: 'both'}}>detail</a>
                        <Modal 
                            id ={i}
                            isOpen={this.state.openDeleteModal}
                            toggle = {e => this.handleModal(e,i)}
                            className={this.props.className}>
                          <ModalHeader toggle={e => this.handleModal(e,i)}>Modal title</ModalHeader>
                          <ModalBody>
                              <h5>Name : {data.name}</h5>
                              <h5>Height : {data.height} </h5> 
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={e => this.handleModal(e,i)}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={e => this.handleModal(e,i)}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>

            ))}

            <Pagination aria-label="Page navigation example" style={{marginTop: '0.5em'}}>
            <PaginationItem disabled>
              <PaginationLink previous href="#" />
            </PaginationItem>
              {pagination}
            <PaginationItem>
            <PaginationLink next href="#" onClick = {this.handleNext}/>
            </PaginationItem>
            </Pagination>
           
          </Col>  
        </Row>
      </div>
      </div>
    )
  }
}

export default App;