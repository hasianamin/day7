import React, { Component, createRef } from 'react';
import ButtonCustom from '../components/ButtonCustom'
import {Spinner} from 'reactstrap'
import Swal from 'sweetalert2'

var data = [
  {nama: 'Budi', usia: 5, alamat: 'jl. sukahari'},
  {nama: 'Andi', usia: 4, alamat: 'jl. sukaminggu'},
  {nama: 'Robin', usia: 3, alamat: 'jl. sukabulan'}
]

class Home extends Component {
  state = {
    indexEdit: -1,
    datamurid: []
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
    console.log(id)
    this.setState({indexDelete:id})
    Swal.fire({
      title: 'Are you sure?',
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
    this.setState({indexEdit: id})
  }

  confirmEdit = (id) => {
    var datamurid = this.state.datamurid
    var nama = this.namaref.current.value
    var usia = this.usiaref.current.value
    var alamat = this.alamatref.current.value
    datamurid[id] = {nama: nama, usia: usia, alamat: alamat}
    this.setState({datamurid, indexEdit: -1})
    this.namaref = createRef()
    this.usiaref = createRef()
    this.alamatref = createRef()
  }

  renderDataMurid = () => {
    var jsx = this.state.datamurid.map((value, index) => {
      if(index === this.state.indexEdit){
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td><input type='text' defaultValue={value.nama} ref={this.namaref}/></td>
            <td><input type='text' defaultValue={value.usia} ref={this.usiaref}/></td>
            <td><input type='text' defaultValue={value.alamat} ref={this.alamatref}/></td>
            <td>
              <ButtonCustom jenisButton='btn btn-success mr-2' func={() => this.confirmEdit(index)}>Confirm</ButtonCustom>
              <ButtonCustom jenisButton='btn btn-secondary' func={() => this.setState({indexEdit: -1})}>Cancel</ButtonCustom>
            </td>
          </tr>
        )
      } else{
          return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{value.nama.toUpperCase()}</td>
              <td>{value.usia}</td>
              <td>{value.alamat}</td>
              <td>
                <ButtonCustom jenisButton='btn btn-danger mr-2' func={() => this.onDeleteCLick(index)}>Delete</ButtonCustom>
                <ButtonCustom jenisButton='btn btn-warning' func={() => this.onEditCLick(index)}>Edit</ButtonCustom>
              </td>
            </tr>
          )
      }
    })
    return jsx
  }

  render() {
    console.log('masuk render')
    if(this.state.datamurid.length !== 0){
      return (
        <div className='row mt-5'>
          <div className="col-6 App mt-3 d-flex flex-column justify-content-center">
            <div className='col-11'>
                <h1>Input Data Murid TK Sukamaju</h1>
                <div className='form-group'>
                  <input class='form-control' type='text' placeholder='nama' ref={this.namaref}/>
                </div>
                <div className='form-group'>
                  <input class='form-control' type='number' placeholder='umur' ref={this.usiaref}/>
                </div>
                <div className='form-group'>
                  <textarea class='form-control' rows='5' cols='25' placeholder='alamat' ref={this.alamatref}/>
                </div>
                <button className='btn btn-primary mt-3' onClick={this.onTambahClick}>Tambahkan</button>
            </div>
          </div>
          <div className='col-6'>
            <h1 className='text-center'>Data Murid TK Sukamaju</h1>
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
      )
    } else {
      return (
        <div style={{marginLeft:'50%', marginTop:'10%'}}>
          <Spinner style={{width:'130px', height:'130px'}} color='info'/>
          <h1>Loading</h1>
        </div>
      )
    }
  }
}

export default Home;
