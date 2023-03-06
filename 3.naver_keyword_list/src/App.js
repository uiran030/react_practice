import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js'

const App = () => {
  const time = Date.now()+'';
  const method = 'GET';
  const api_uri = '/keywordstool';
  const secretKey = 'AQAAAABVQYDzMiowYGSXN8tLe1nx9ezUHZjOMQlQ+LgZ+3uPoQ==';
  const accessKey = '0100000000554180f3322a3060649737cb4b7b59f1c2bd1ebca486d667ca7ccea5b5ccce65';
  const customer = '275956';

  const [list, setList] = useState([]);

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(time+'.'+method+'.'+api_uri);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  console.log(signature)

  const getData = async() => {
    const response = await axios.get('/keywordstool',{
      params : {
        // showDetail:'20',
        hintKeywords:'이마트24'
      },
      headers:{
        // 'Content-Type': 'application/json',
        'X-Timestamp':time,
        'X-API-KEY':accessKey,
        // 'X-API-SECRET':secretKey,
        'X-CUSTOMER':customer,
        'X-Signature':signature
      }
    })
    const newData = response.data.keywordList
    setList(newData)
    console.log(newData)
  }

  useEffect(()=>{
    getData()
  },[]);

  return (
    <div style={{'padding':'20px'}}>
      <h2>keyWords를 이마트24로 설정</h2>      
      <p style={{'fontSize':'12px'}}>pc, mobile 쿼리 수가 10보다 작으면 "&#60;10"으로 표시됨</p>
      <ul>
        {list.map((item)=>(
        <li>
          <h3>{item.relKeyword}</h3>
          <p>최근 30일 동안의 pc 쿼리 수의 합계 : {item.monthlyPcQcCnt}</p>
          <p>최근 30일 동안의 모바일 쿼리 수의 합계 : {item.monthlyMobileQcCnt}</p>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default App;