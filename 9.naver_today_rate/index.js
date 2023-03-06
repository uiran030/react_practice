const { AWSContainer, processLambdaFunction, returnThen, returnCatch } = require("@sizeko/awslambda-builder");
//==============================================================
exports.handler = async (event, context) => {
try { return await processLambdaFunction({
  permission: {
    commandline: {},
    preprocess: {},
    websocket: {},
    urlquery: {},
    schedule: {}
  },
  validation: {
    input: {event: event, context: context},
    rule: {},
  },
  outputFormat: {
    itemName: 'apiResult',
    jsonPath: '$.isSuccess["apiResult"]',
  },
  preProcessFunctions: [],
  conditionalFunctions: [],
  defaultFunction: (event, context, outputFormat, resolve, reject, preProcessResult) => {
    //------------------------------------------------------
    const chromium = require('chrome-aws-lambda');
    //------------------------------------------------------
    console.log("event",event);
    //------------------------------------------------------
    let browser = null;
    let result = null;
    //------------------------------------------------------
    (async () => {
      console.log('start')
      try {
        //------------------------------------------------------
        browser = await chromium.puppeteer.launch({
        // browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });        
        //------------------------------------------------------
        const runProcessTarget = async (params) => {
          await page.goto('https://finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=FX_USDKRW');
          //------------------------------------------------------
          try {
            await page.waitForSelector(".today:nth-child(3) > tbody > tr", { timeout: 50000 });
            console.log("여기ok")
            } catch (error) {
            console.log("에러 발생: " + error);
            return [
                {
                date: "검색결과 없음",
                cashBuy: "검색결과 없음",
                },
            ];
          }
          //------------------------------------------------------
          const searchData = await page.evaluate(() => {  
            const date = document.querySelectorAll(".date");
            // const searchDate = date[0].innerText;
            const exchangeRateList = Array.from(document.querySelectorAll(".today:nth-child(3) > tbody > tr"));
            console.log("exchangeRateList",exchangeRateList);
            //------------------------------------------------------
            let exchangeRateObjList = [];
            //------------------------------------------------------
            exchangeRateList.forEach((item)=>{
              if (item.className === "up" || item.className === "down"){
                const cashBuy = item.querySelector("td:nth-child(4)");
                console.log("cashBuy",cashBuy);
                if(cashBuy) {
                  exchangeRateObjList.push({
                    date : date,
                    country : cashBuy
                  });
              }
              console.log("cashBuy",cashBuy);
            }
          });
          return exchangeRateObjList;
        });
          //------------------------------------------------------
          console.log("searchData",searchData);
          return searchData;
        };
        //------------------------------------------------------
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        //------------------------------------------------------
        result = await runProcessTarget();
        //------------------------------------------------------
      } catch (error) {
        reject(error);
      } finally {
        if (browser !== null) {
          await browser.close();
        }
      }
      //------------------------------------------------------
      resolve({
        outputFormat: outputFormat,
        isJSON: {
          _exchangeRate: result
        }
      });
    })();
    //------------------------------------------------------
  }
}).then(param => {
  return returnThen(param);
}).catch(err => {
  return returnCatch(context, err);
});
} catch(err) {
  return returnCatch(context, err);
}};
