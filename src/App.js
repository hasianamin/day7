import React, { Component, createRef } from 'react';
// import logo from './logo.svg';
import './App.css';
import DeleteBtn from './components/DeleteBtn'
import EditBtn from './components/EditBtn'

var data = [
  {nama: 'Budi', usia: 5, alamat: 'jl. sukahari'},
  {nama: 'Andi', usia: 4, alamat: 'jl. sukaminggu'},
  {nama: 'Robin', usia: 3, alamat: 'jl. sukabulan'}
]

class App extends Component {
  state = {
    indexEdit: -1,
    indexDelete: -1,
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
  }

  onDeleteCLick = (id) => {
    console.log(id)
    this.setState({indexDelete:id})
  }
  
  confirmDelete = (id) => {
    var datamurid = this.state.datamurid
    this.state.datamurid.splice(id,1)
    this.setState({datamurid})
    console.log(this.state.datamurid)
    this.setState({indexDelete: -1})
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
    this.setState({datamurid})
    this.setState({indexEdit: -1})
    this.namaref = createRef()
    this.usiaref = createRef()
    this.alamatref = createRef()
  }

  renderDataMurid = () => {
    var jsx = this.state.datamurid.map((value, index) => {
      if(index === this.state.indexDelete){
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{value.nama}</td>
            <td>{value.usia}</td>
            <td>{value.alamat}</td>
            <td>
              <button onClick={() => this.confirmDelete(index)}>Confirm</button>
              <button onClick={() => this.setState({indexDelete: -1})}>Cancel</button>
            </td>
          </tr>
        )
      } else if(index === this.state.indexEdit){
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td><input type='text' defaultValue={value.nama} ref={this.namaref}/></td>
            <td><input type='text' defaultValue={value.usia} ref={this.usiaref}/></td>
            <td><input type='text' defaultValue={value.alamat} ref={this.alamatref}/></td>
            <td>
              <button onClick={() => this.confirmEdit(index)}>Confirm</button>
              <button onClick={() => this.setState({indexEdit: -1})}>Cancel</button>
            </td>
          </tr>
        )
      } else{
          return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{value.nama}</td>
              <td>{value.usia}</td>
              <td>{value.alamat}</td>
              <td>
                <DeleteBtn jenisButton='btn btn-danger mr-2' funcDelete={() => this.onDeleteCLick(index)}>Delete</DeleteBtn>
                <EditBtn jenisButton='btn btn-warning' funcEdit={() => this.onEditCLick(index)}>Edit</EditBtn>
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
        <div className="App mt-3 d-flex flex-column justify-content-center align-items-center">
          <h1>Murid TK Sukamaju</h1>
          <div>
            <div>
              <input type='text' placeholder='nama' ref={this.namaref}/>
            </div>
            <div>
              <input type='number' placeholder='umur' ref={this.usiaref}/>
            </div>
            <div>
              <input type='text-area' placeholder='alamat' ref={this.alamatref}/>
            </div>
            <button className='btn btn-primary mt-3' onClick={this.onTambahClick}>Tambahkan</button>
          </div>
          <table className='mt-3'>
            <thead>
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
      )
    } else {
      return (
        <h1>Loading</h1>
      )
    }
  }
}

export default App;
