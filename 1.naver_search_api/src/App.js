import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const App = () => {
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [list, setList]=useState([]);

  const onChange = e => {
    setSearch(e.target.value);
    e.preventDefault();
  }

  const onSearch = e => {
    e.preventDefault();
    if(search === ""){
      console.log('빈값')
      setSearchValue('')
    } else{
      console.log('잘 보내짐')
      setSearchValue(search)
    }
  }

  const getData = async() =>{
  const response = await axios.get(`/v1/search/shop.json`,{
    params : {
      query:searchValue,
      display:30
    },
    headers:{
      'Content-Type': 'application/json',
      'X-Naver-Client-Id':'kuNz_KlYUdVGBhhPLQqR',
      'X-Naver-Client-Secret':'2WwPd4g0Ii'
    },
  });
  setList(response.data.items)
  }
  console.log(list);

  useEffect(()=>{
    getData()
  },[searchValue]);

  return (
    <div>
      <div style={{'marginBottom':'30px'}}>
        <input placeholder="검색어를 입력하세요." onChange={onChange} value={search}/>
        <button onClick={onSearch}>검색</button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>title</TableCell>
                <TableCell align="right">link</TableCell>
                <TableCell align="right">category</TableCell>
                <TableCell align="right">maker</TableCell>
                <TableCell align="right">mallName</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((list) => (
                <TableRow
                  key={list.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" >
                    {list.title}
                  </TableCell>
                  <TableCell align="right">{list.link}</TableCell>
                  <TableCell align="right">{list.category1}-{list.category2}-{list.category3}</TableCell>
                  <TableCell align="right">{list.maker}</TableCell>
                  <TableCell align="right">{list.mallName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    );
};

export default App;
