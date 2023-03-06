const axios = require('axios');
const cheerio = require('cheerio');
const arr = [];

axios({
  method : 'get',
  url : 'https://issue.zum.com/'
}).then(res=>{
  const htmlString = res.data;
  const $ = cheerio.load(htmlString);
  // const data = $('#issueKeywordInnerBox ul li > div > span:nth-child(1), #issueKeywordInnerBox ul li > div > span:nth-child(2)').text();
  // const data = $('#issueKeywordInnerBox ul li > div > span:nth-child(2)').html();
  const data = $('#issueKeywordOpenList li').find('a span.word').each((i, el) => {
    arr.push($(el).text());
  });

  // const splitData = data.split(0,5);
  // const one = data.substring(0,5).replace('위', '위 ');
  // const two = data.substring(5,10).replace('위', '위 ');
  // const three = data.substring(10,15).replace('위', '위 ');
  // const four = data.substring(15,21).replace('위', '위 ');
  // const five = data.substring(21,27).replace('위', '위 ');
  // const six = data.substring(27,31).replace('위', '위 ');
  // const seven = data.substring(31,36).replace('위', '위 ');
  // const eight = data.substring(36,41).replace('위', '위 ');
  // const nine = data.substring(41,46).replace('위', '위 ');
  // const ten = data.substring(46).replace('위', '위 ');
  // arr.push(one, two, three, four, five, six, seven, eight, nine, ten);

  console.log(arr);
  console.log('success');
});