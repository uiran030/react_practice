import React,{useEffect, useState} from 'react';
import euiran from './json/euiran-log.json';
import dahae from './json/dahae-log.json';
import jinwoo from './json/jinwoo-log.json';
import kihun from './json/kihun-log.json';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ConstructionOutlined } from '@mui/icons-material';

const App = () => {
  // console.log(euiran)
  // console.log(kihun)
  // console.log(jinwoo)
  // console.log(dahae)
  const [list, setList] = useState(kihun);
  const [change, setChange] = useState(jinwoo)

  const [selectedIndex, setSelectedIndex] = useState(0);

  const week = ['SUN', 'MON','TUE','WED','THU','FRI','SAT'];
    
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index == 0){
      setList(kihun)
    } else if(index == 1){
      setList(jinwoo)
      setChange(jinwoo)
      // console.log(change[0]['2022-09-29'][1])
    } else if (index == 2){
      setList(dahae)
    } else {
      setList(euiran)
    }
  };

  return (
    <div className='row'>
      <div>
        <h2>our log</h2>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className="box" >
          <List component="nav" aria-label="main mailbox folders" className="category">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              className="list"
            >
              <ListItemText primary="남기훈" className='listText' key='TODAY'/>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              className="list"
            >
              <ListItemText primary="이진우" className='listText' />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              className="list"
            >
              <ListItemText primary="임다해"  className='listText'/>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
              className="list"
            >
              <ListItemText primary="정의란" className='listText' />
            </ListItemButton>
          </List>
        </Box>
      </div>
      <div>
        <ul>
          {selectedIndex === 1 ? (
            <div>
              {list.map((list, index)=>{
                for (const [key, value] of Object.entries(list)) {
                  return (
                    <li key={index} className="dataList">
                      <div className='listF'>
                        <p>{key}</p>
                        <p style={{margin:'0 10px', color:'#5daafc'}}>{value[0]['days']}</p>
                        <p>{week[new Date(key).getDay()]}</p>
                      </div>
                      <div>
                        {value[0]['work'].map((data, index)=>{
                          console.log(data)
                          for(const [key, value] of Object.entries(data)){
                            console.log(key)
                            console.log(value)
                            return(
                              <div>
                                <p>{key} : {value}</p>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </li> 
                  )                  
                }                
              })}
            </div>
          ):
          selectedIndex ===2 ? (
            <div>
              {list.map((list, index)=>{
                for (const [key, value] of Object.entries(list)) {
                  return (
                    <li key={index} className="dataList">
                      <div className='listF'>
                        <p>{key}</p>
                        <p style={{margin:'0 10px', color:'#5daafc'}}>{value[0]['days']}</p>
                        <p>{week[new Date(key).getDay()]}</p>
                      </div>
                      <p className='change'>{value[0]['work']}</p>
                    </li> 
                  )                
                }   
              })}
            </div>
            ):(
            <div>
              {list.map((list, index)=>{
                return (
                  <li key={index} className="dataList">
                    <div className='listF'>
                      <p>{list.TODAY}</p>
                      <p style={{margin:'0 10px', color:'#5daafc'}}>{list.DAY[0]}</p>
                      <p>{list.DAY[1]}</p>
                    </div>
                    <p className='change'>{list.업무내용}</p>
                  </li> 
                )
              })}
            </div>)}
        </ul>
      </div>
    </div>
  );
};

export default App;