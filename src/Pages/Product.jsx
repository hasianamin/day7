import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const token = 'WBsLT0lwz7RsIcjA5OI9XsEfDoYn7ttEqKya72EPA2GrKyqfFi'
let angka = 0
const Product = () => {
    const [data, setData] = useState([])
    const [dataKabupaten, setDataKabupaten] = useState([])
    const [dataKecamatan, setDataKecamatan] = useState([])
    const [dataKelurahan, setDataKelurahan] = useState([])
    const [provinsi, setIdProvinsi] = useState(null)
    const [kabupaten, setIdKabupaten] = useState(null)
    const [kecamatan, setIdKecamatan] = useState(null)
    const [kelurahan, setIdKelurahan] = useState(null)

    useEffect(()=> {
        axios.get(`https://x.rajaapi.com/MeP7c5ne${token}/m/wilayah/provinsi`)
        .then((res)=> {
            console.log(res.data.data)
            setData(res.data.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    // axios.get(`https://x.rajaapi.com/MeP7c5ne${token}/m/wilayah/kabupaten?idpropinsi=${provinsi}`)
    // .then((res)=> {
    //     console.log(res.data.data)
    //     setDataKabupaten(res.data.data)
    // })
    

    useEffect(()=>{
        if(angka > 1){
            console.log('didupdate')
        } else {
            angka++
        }
    })

    const renderProvinsi = () => {
        return data.map((val) => {
            return(
                <option value={val.id}>{val.name}</option>
            )
        })
    }

    const getProvinsi = (idProvinsi) => {
        setIdProvinsi(idProvinsi.target.value)
        console.log(idProvinsi.target.value)
    }

    const getKabupaten = (idKabupaten) => {
        setIdKabupaten(idKabupaten.target.value)
        console.log(idKabupaten.target.value)
    }

    const getKecamatan = (idKecamatan) => {
        setIdKecamatan(idKecamatan.target.value)
        console.log(idKecamatan.target.value)
    }



    const renderKabupaten = () => {
        if(provinsi){
            axios.get(`https://x.rajaapi.com/MeP7c5ne${token}/m/wilayah/kabupaten?idpropinsi=${provinsi}`)
            .then((res)=> {
                console.log(res.data.data)
                setDataKabupaten(res.data.data)
            })
            setIdProvinsi(false)
        }
    
        return dataKabupaten.map((val) => {
            return(
                <option value={val.id}>{val.name}</option>
            )
        })
    }

    const renderKecamatan = () => {
        if(kabupaten){
            axios.get(`https://x.rajaapi.com/MeP7c5ne${token}/m/wilayah/kecamatan?idkabupaten=${kabupaten}`)
            .then((res)=> {
                console.log(res.data.data)
                setDataKecamatan(res.data.data)
            })
            setIdKabupaten(false)
        }
    
        return dataKecamatan.map((val) => {
            return(
                <option value={val.id}>{val.name}</option>
            )
        })
    }

    const renderKelurahan = () => {
        if(kecamatan){
            axios.get(`https://x.rajaapi.com/MeP7c5ne${token}/m/wilayah/kelurahan?idkecamatan=${kecamatan}`)
            .then((res)=> {
                console.log(res.data.data)
                setDataKelurahan(res.data.data)
            })
            setIdKecamatan(false)
        }
    
        return dataKelurahan.map((val) => {
            return(
                <option value={val.id}>{val.name}</option>
            )
        })
    }



    return (
        <div className="container">
            <div className='mt-5'>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect" onChange={(e) => getProvinsi(e)}>
                        <option hidden>Pilih Provinsi</option>
                        {renderProvinsi()}
                    </Input>
                </FormGroup>
            </div>
            <div className='mt-2'>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect" onChange={(e) => getKabupaten(e)}>
                        <option hidden>Pilih Kabupaten</option>
                        {renderKabupaten()}
                    </Input>
                </FormGroup>
            </div>
            <div className='mt-2'>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect" onChange={(e) => getKecamatan(e)}>
                        <option hidden>Pilih Kecamatan</option>
                        {renderKecamatan()}
                    </Input>
                </FormGroup>
            </div>
            <div className='mt-2'>
                <FormGroup>
                    <Input type="select" name="select" id="exampleSelect">
                        <option hidden>Pilih Kelurahan</option>
                        {renderKelurahan()}
                    </Input>
                </FormGroup>
            </div>
        </div>
    );
}

export default Product