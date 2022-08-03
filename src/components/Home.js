import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteStudentData, getStudentData } from '../slice/sliceReducer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useNavigate,useParams } from "react-router-dom";

const Home = () => {
    const params=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(() => {
        dispatch(getStudentData())
    }, []);
    const handleDelete=(id)=>{
        dispatch(deleteStudentData(id));
    }
    const data=useSelector((state)=>state.studentReducer.studentArray);
    const handleEdit=(id)=>{
        navigate(`editStudent/${id}`);
    }    
  return (
    <div>

<Button onClick={()=>navigate('/addStudent')} variant="contained">Add Student</Button>
        <TableContainer style={{marginTop:'40px'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S. No.</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((datas,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{datas.name}</TableCell>
              <TableCell align="right">{datas.phone}</TableCell>
              <TableCell align="right"><Button onClick={()=>handleEdit(datas.id)} variant="contained">Edit</Button></TableCell>
              <TableCell align="right"><Button onClick={()=>handleDelete(datas.id)} variant="contained">Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home