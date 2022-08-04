import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteStudentData, getSearchedData, getSortedData, getStudentData } from '../slice/sliceReducer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useNavigate,useParams } from "react-router-dom";
import AddModal from './AddModal';
import Pagination from 'react-responsive-pagination';
import { TextField } from '@mui/material';
import { Circles } from  'react-loader-spinner'


const Home = () => {
  const [isOpen,setIsOpen]=useState(false);
  const [sortedData,setSortedData]=useState(false);
  const [searchValue,setSearchValue]=useState('');
    const params=useParams();
    console.log('Para',params);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSearch=()=>{
      console.log('search',searchValue);
      dispatch(getSearchedData(searchValue))
      setTimeout(() => {
        setSearchValue('');
      }, 200);
    }
     const searchField=useSelector((state)=>state.studentReducer.studentArray);
     console.log('SEARCHFIELD : ',searchField);

    const totalPages = 4;
    const pageSize=7;
    
    useEffect(() => {
        dispatch(getStudentData({initialEntry:0,totalEnteries:pageSize}))
    }, []);

    const handleSortedData=()=>{
      dispatch(getSortedData());
      setTimeout(() => {
        setSortedData(!sortedData);
      }, 200);
    }

    const dataSorted=useSelector((state)=>state.studentReducer.sortedArray);
    console.log('SortedData : ',dataSorted);

    const loadingData=useSelector((state)=>state.studentReducer.loading);
    console.log('loadingData : ',loadingData);

    const handleDelete=(id)=>{
        dispatch(deleteStudentData(id));
    }
    const data=useSelector((state)=>state.studentReducer.studentArray);

    const handleEdit=(id)=>{
        navigate(`editStudent/${id}`);
    }    

  const [currentPage, setCurrentPage] = useState(1);
  function handlePageChange(page) {
    setCurrentPage(page);
    console.log('page',page);
    if(page===1){
      dispatch(getStudentData({initialEntry:0,totalEnteries:pageSize}))
    }
    else{
      dispatch(getStudentData({initialEntry:pageSize*page-pageSize,totalEnteries:pageSize*page}))
    }
  }

  console.log('sort',sortedData, dataSorted)


  return (
    <div>
      { 
        loadingData 
        ?
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%',minHeight:'68vh'}}>
          <Circles  height={80} width={80} color='grey' ariaLabel='loading'/>
        </div>
        :
        <div>
<Button onClick={()=>navigate('/addStudent')} variant="contained">Add Student</Button>
<Button onClick={()=>setIsOpen(true)} variant="contained">Modal</Button>
<Button onClick={()=>handleSortedData()} className='m-5' variant="contained">Sort Alphabetically</Button>

    <div className='d-flex items-center justify-content-center mt-2'>
      <TextField value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} type='text' id="outlined-basic" label="Student name" variant="outlined" />
      <Button onClick={handleSearch} type='submit' variant="contained">Search</Button>
    </div>
        <TableContainer style={{marginTop:'40px'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S. No. </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {sortedData ? dataSorted.map((datas,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                { currentPage === 1? index+1 : currentPage * pageSize - pageSize + 1 + index}
              </TableCell>
              <TableCell align="right">{datas.name}</TableCell>
              <TableCell align="right">{datas.phone}</TableCell>
              <TableCell align="right"><Button onClick={()=>handleEdit(datas.id)} variant="contained">Edit</Button></TableCell>
              <TableCell align="right"><Button onClick={()=>handleDelete(datas.id)} variant="contained">Delete</Button></TableCell>
            </TableRow>
          )) : data.map((datas,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                { currentPage === 1? index+1 : currentPage * pageSize - pageSize + 1 + index}
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
    <div className='m-5 d-flex justify-content-end'> 
      <Pagination
        extraClassName='justify-content-end m-5'
        total={totalPages}
        current={currentPage}
        onPageChange={page => handlePageChange(page)}
        maxWidth='100px'
      />
    </div> 

    {
      isOpen && 
      <AddModal isOpen={isOpen} onHide={()=>setIsOpen(false)} />
    }
    </div>
      }
    </div>
  )
}

export default Home