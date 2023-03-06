const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// 즉시실행함수
(async() => {
  const browser = await puppeteer.launch({
    headless : false
  });
  const page = await browser.newPage();
  await page.setViewport({
    width:1000,
    height:800
  });
  await page.goto('https://www.starbucks.co.kr/');
  await page.click(".util_nav04");
  await page.waitForTimeout(5000);
  await page.click('.quick_search_inner > input');
  await page.waitForTimeout(5000);
  await page.type("#quickSearchText","봉");
  await page.waitForTimeout(500);
  await page.type("#quickSearchText","담");
  await page.waitForTimeout(5000);
  await page.click('.quick_search_inner > a');
  await page.waitForTimeout(5000);
  //-------------------------------------------
  const content = await page.content();
  const $ = cheerio.load(content);
  const lists = $('.quickSearchResultBox > li');
  lists.each((index, list) => {
    const name = $(list).find('.quickResultLstCon strong').text();
    console.log({index, name});
  })
  browser.close();
})();
