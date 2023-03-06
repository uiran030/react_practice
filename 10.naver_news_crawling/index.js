const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async() => {
  const browser = await puppeteer.launch({
    headless : false
  });
  const page = await browser.newPage();
  await page.setViewport({
    width:1000,
    height:800
  });
  await page.goto('https://www.naver.com/');
  await page.click(".green_window > input");
  await page.waitForTimeout(3000);
  await page.type("#query","환");
  await page.waitForTimeout(500);
  await page.type("#query","율");
  await page.waitForTimeout(3000);
  await page.click('#search_btn');
  await page.waitForTimeout(3000);
  //---------------------------------------------
  const content = await page.content();
  const $ = cheerio.load(content);
  const lists = $('.rate_table_info > tbody > .up');
  // console.log("listslists",lists)
  const name = $(lists).find('.rate_table_info > tbody > .up > span').text();
  console.log("name",name)

  // lists.map(item => (
  //   const name = $(item).find('.rate_table_info > tbody > .up > span').text();
  //   console.log("name",name)
    // if (item.className == "up"){
    //   const a = item.querySelector("span")
    //   console.log("a",a)
    // }
    // )}
  const arr = [];
  //---------------------------------------------
  // const th = $(lists).find('th').text();
  
  // const td = $(lists).find('td:nth-child(2) > span').text();
  // arr.push({
  //   country : th,
  //   money: td
  // })
  // console.log(arr);
  //---------------------------------------------
  browser.close();
})();
