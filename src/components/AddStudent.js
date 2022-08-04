import React, { useEffect, useState } from 'react';
import '../components/AddStudent.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { addStudentInfo, editStudentInfo, getStudentData, getStudentInfo } from '../slice/sliceReducer';


const AddStudent = () => {
    const dispatch=useDispatch();
    const params=useParams();
    console.log('parasm',params);
    useEffect(() => {
      dispatch(getStudentInfo(params.id));
    }, []);

    const editData=useSelector((state)=>state.studentReducer.editStudent);
    console.log('EE',editData);
    
    useEffect(()=>{
        if(editData){
            setInputValues({...editData})
        }
        else{
            setInputValues('')
        }
    },[editData]);

    const[inputValues,setInputValues]=useState({
        name:'',
        phone:''
    });
    const {name,phone}=inputValues;
    const inputEvent=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setInputValues((last)=>{
            return{
                ...last,
                [name]:value
            }
        })
    }
    const navigate=useNavigate();
    const submitForm=(e)=>{
        e.preventDefault();
        
        if(params.id){
            console.log('submitting p',params)
            dispatch(editStudentInfo({ inputValues: inputValues,id:params.id}));
            dispatch(getStudentData());
        }
        else{
            dispatch(addStudentInfo(inputValues));
            dispatch(getStudentData());
        }
    }
    const handleBack=()=>{
        setTimeout(() => {
            navigate(-1);
        }, 100);
    }
    
  return (
    <div>
        <div className='containerDiv'>
            <div className='inputsDiv'>
                <form onSubmit={submitForm} className='formDiv'>
                    <TextField name='name' value={name || ''} type='text' onChange={inputEvent} id="outlined-basic" label="Student name" variant="outlined" />
                    <TextField name='phone' value={phone || ''} type='number' onChange={inputEvent} id="outlined-basic" label="Student phone" variant="outlined" />
                    <Button type='submit' onClick={handleBack} variant="contained">Submit</Button>
                    <Button type='button' onClick={()=>navigate(-1)} variant="contained">Home page</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddStudent