import React, {useEffect, useState} from 'react';
import axios from 'axios';

const App = () => {


  // const ACCESS_TOKEN = 'dQYq_UXaM3YyEwUs-1ku9MD_2A1UIEdrBx8AEer6CinI2AAAAYQ2v6XP';
  const Client_id = 'a854dac31a1cda6a784e4521e127190d';
  const redirect_uri = 'http://localhost:3000';
  const code = window.location.search.slice(6);
  // const [uri, setUri] = useState('authorize');

  const getData = async() =>{
    await axios.get(`/oauth/authorize`,{
      params : {
        // grant_type:'authorization_code',
        client_id:Client_id,
        redirect_uri:redirect_uri,
        response_type:'code',
        // response_type:'code',
      },
    });
  };
  
  useEffect(()=>{
    getData()
  },[]);

  return (
    <div className='row'>
      <ul className='depth1'>
        <li>
          <h3>
            인가코드 받기
          </h3>
          <ul className='depth2'>
            <li>
              1. 주소창에 <em className='blue'>https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a854dac31a1cda6a784e4521e127190d&redirect_uri=http://localhost:3000</em>
            </li>
            <li>
              2. 입력 후 enter
            </li>
            <li>
              3. 주소창에 http://localhost:3000/?<em className='blue'>code={code}</em>
            </li>
            <li>
              4. code = <em className='blue'>{code}</em>
            </li>
          </ul>
        </li>
        <li>
          <h3>
            토큰받기
          </h3>
          <ul className='depth2'>
            <li>
              1. post <em>/oauth/token</em>
            </li>
            <li>
              2. parameter <br />
              - grant_type : authorization_code, <br />
              - client_id : {Client_id}, <br />
              - redirect_uri : {redirect_uri}, <br />
              - code : <em className='blue'>{code}</em>,
            </li>
            <li>
              성공 시 <br />
              Content-Type: application/json;charset=UTF-8 <br />
              <p style={{'marginLeft':"20px"}}>
                &#123; <br />
                  "token_type":"bearer", <br />
                  "access_token":"token", <br />
                  "expires_in":nnnnn, <br />
                  "refresh_token":"token", <br />
                  "refresh_token_expires_in":nnnnnnnn, <br />
                  "scope":"account_email profile" <br />
                &#125;
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default App;