import React, { Component, createRef } from 'react';
import {Spinner} from 'reactstrap'
import Swal from 'sweetalert2'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var data = [
  {nama: 'Budi', usia: 5, alamat: 'jl. sukahari'},
  {nama: 'Andi', usia: 4, alamat: 'jl. sukaminggu'},
  {nama: 'Robin', usia: 3, alamat: 'jl. sukabulan'}
]

class Home extends Component {
  state = {
    datamurid: [],
    isModalOpen: false,
    indexedit: -1,
    editform:{
      editnamaref:createRef(),
      editusiaref:createRef(),
      editalamatref:createRef(),
      editnama:'',
      editusia:'',
      editalamat:''
    }
  }

  namaref = createRef()
  usiaref = createRef()
  alamatref = createRef()
  
  componentDidMount() {
    console.log('masuk did mount') 
    setTimeout(() => {
      this.setState({datamurid: data})},1000)
  }

  componentWillUnmount() {
    console.log('masuk will unmount')
  }

  componentDidUpdate() {
    console.log('masuk did update')
  }

  onTambahClick = () => {
    console.log(this.state.datamurid)
    var nama = this.namaref.current.value
    var usia = this.usiaref.current.value
    var alamat = this.alamatref.current.value
    var datamurid = this.state.datamurid
    datamurid.push({nama, usia, alamat:alamat})
    this.setState({datamurid})
    this.namaref.current.value = ''
    this.usiaref.current.value = ''
    this.alamatref.current.value = ''
    Swal.fire(
      'Added!',
      'Data Murid successfully added.',
      'success'
    )
  }

  onDeleteCLick = (id) => {
    this.setState({indexDelete:id})
    Swal.fire({
      title: `Are you sure delete ${data[id].nama}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        var datamurid = this.state.datamurid
        this.state.datamurid.splice(id,1)
        this.setState({datamurid, indexDelete: -1})
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  onEditCLick = (id) => {
    let {nama, usia, alamat} = this.state.datamurid[id]
    let editFormValue = this.state.editform
    editFormValue = {...editFormValue, editnama: nama, editusia: usia, editalamat: alamat}
    this.setState({indexedit: id, editform: editFormValue, isModalOpen: !this.state.isModalOpen})
  }

  confirmEdit = () => {
    var {editnamaref,editusiaref,editalamatref}=this.state.editform
    var editnama=editnamaref.current.value
    var editusia=editusiaref.current.value
    var editalamat=editalamatref.current.value
    var datamurid=this.state.datamurid
    var datamuridedit= datamurid[this.state.indexedit]
    datamuridedit={...datamuridedit, nama:editnama,usia:editusia,alamat:editalamat}
    datamurid.splice(this.state.indexedit, 1, datamuridedit)
    this.setState({datamurid:datamurid,isModalOpen:false})
  }

  onChangeHandler = (e, namaproperty) => {
    this.setState({editform: {...this.state.editform,[namaproperty]: e.target.value}})
  }

  renderDataMurid = () => {
    var jsx = this.state.datamurid.map((value, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{value.nama.toUpperCase()}</td>
          <td>{value.usia}</td>
          <td>{value.alamat}</td>
          <td>
            <button className='btn btn-danger mr-2' onClick={() => this.onDeleteCLick(index)}>Delete</button>
            <button className='btn btn-warning' onClick={() => this.onEditCLick(index)}>Edit</button>
          </td>
        </tr>
      )
    })
    return jsx
  }

  toggle = () => this.setState({isModalOpen:!this.state.isModalOpen})

  render() {
    console.log('masuk render')
    const {toggle, state} = this
    const {isModalOpen, editform} = state
    const {editnama, editusia, editalamat} = editform
    if(this.state.datamurid.length !== 0){
      return (
        <div className="container">
          <div className='row mt-5 d-flex'>
            <div className="col-lg-6 col-12 text-center d-flex flex-column justify-content-center">
              <div className='col-11'>
                  <h1>Input Data Murid TK Sukamaju</h1>
                  <div className='form-group'>
                    <input className='form-control' type='text' placeholder='nama' ref={this.namaref}/>
                  </div>
                  <div className='form-group'>
                    <input className='form-control' type='number' placeholder='umur' ref={this.usiaref}/>
                  </div>
                  <div className='form-group'>
                    <textarea className='form-control' rows='5' cols='25' placeholder='alamat' ref={this.alamatref}/>
                  </div>
                  <button className='btn btn-primary mt-3' onClick={this.onTambahClick}>Tambahkan</button>
              </div>
            </div>
            <div className='col-lg-6 col-12 mt-lg-0 mt-3'>
              <h1>Data Murid TK Sukamaju</h1>
              <table className='col-11 table table-hover mt-3'>
                <thead className='thead-dark'>
                  <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Usia</th>
                    <th>Alamat</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderDataMurid()}
                </tbody>
              </table>
            </div>
          </div>
          <Modal isOpen={isModalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit data {editnama}</ModalHeader>
            <ModalBody>
              <div><input className='form-control' ref={this.state.editform.editnamaref}  onChange={(e)=>this.onChangeHandler(e,'editnama')} defaultValue={editnama} /></div>
              <div><input className='form-control' ref={this.state.editform.editusiaref}  onChange={(e)=>this.onChangeHandler(e,'editusia')} defaultValue={editusia}/></div>
              <div><input className='form-control' ref={this.state.editform.editalamatref} onChange={(e)=>this.onChangeHandler(e,'editalamat')} defaultValue={editalamat}/></div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.confirmEdit}>Save</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    } else {
      return (
        <div style={{marginLeft:'45%', marginTop:'10%'}}>
          <Spinner style={{width:'130px', height:'130px'}} color='info'/>
          <h1>Loading</h1>
        </div>
      )
    }
  }
}

export default Home;
