import React, { useState } from 'react';
import { Box, Modal, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction, Tab } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import ApexCharts from 'react-apexcharts';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const titleStyle = {
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center'
};

const actions = [
  { icon: <AiOutlineClose />, name: '수입' },
  { icon: <SaveIcon />, name: '지출' }
];

const App = () => {

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const state = {
    series : [
      {
        name : '외식비',
        data : [234600,98400,40,50,78,100,300,200]
      },
      {
        name : 'low',
        data : [1,2,3,4,34,65,30,120]
      },
      {
        name : 'test',
        data : [2,7,5,8,34,65,80,120]
      },
      {
        name : 'test2',
        data : [2,7,5,8,34,65,80,120]
      },
      {
        name : 'test3',
        data : [2,7,5,8,34,65,80,120]
      }
    ],
    options: {  
      chart: {
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '월별 지출 정산',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['1월', '2월', '3일', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      }
    }
  }

  const handleClick = () => {
    console.log('test');
    setOpen(true)
  }
  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: '60%', height: '500px', margin: '0 auto', border:'1px solid black' }}>
      {/* nivo로 만든 도넛차트 */}
      <ResponsivePie
        data={[
            { id: '식비', value: 234800 },
            { id: '통신비', value: 49000 },
            { id: '쇼핑', value: 346000 },
            { id: '보험비', value: 159800 },
            { id: '병원/약국', value: 6000 },
            { id: '간식비', value: 8500 },
            { id: '반료묘/견', value: 156200 },
            { id: '추가 카테고리', value: 123456 },
        ]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.65}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{scheme : 'pastel1'}}
        borderWidth={1}  
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              '0.3'
            ]
          ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={24}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              '2'
            ]
          ]
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        // fill을 통해 표 안에 디자인 줄 수 있음.
        fill={[
          {
            match: {
              id: '쇼핑'
            },
            id: 'dots'
          },
          {
            match: {
              id: '반료묘/견'
            },
            id: 'dots'
          },
          {
            match: {
              id: '통신비'
            },
            id: 'lines'
          }
        ]}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 0,        // 우측 리스트 목록 (화면 사이즈보고 조절하면 될 듯)
            translateY: 0,
            itemWidth: 100,
            itemHeight: 40,
            itemsSpacing: 10,
            symbolSize: 20,
            itemDirection: 'left-to-right',
          },
        ]}
      />
      {/* nivo로 만든 선 그래프 */}
      <ResponsiveLine
        data={[
          {
            "id": '외식비', 
            "data": [
              {
                "x" : "1월",
                "y" : 40
              },
              {
                "x" : "2월",
                "y" : 40
              },
              {
                "x" : "3월",
                "y" : 20
              },
              {
                "x" : "4월",
                "y" : 40
              },
              {
                "x" : "5월",
                "y" : 40
              },
              {
                "x" : "6월",
                "y" : 40
              },
              {
                "x" : "7월",
                "y" : 40
              },
              {
                "x" : "8월",
                "y" : 40
              },
              {
                "x" : "9월",
                "y" : 40
              },
              {
                "x" : "10월",
                "y" : 40
              },
              {
                "x" : "11월",
                "y" : 40
              },
              {
                "x" : "12월",
                "y" : 40
              }
            ]
          },
          {
            "id": '식비', 
            "data": [
              {
                "x" : "1월",
                "y" : 215
              },
              {
                "x" : "2월",
                "y" : 300
              },
              {
                "x" : "3월",
                "y" : 300
              },
              {
                "x" : "4월",
                "y" : 300
              },
              {
                "x" : "5월",
                "y" : 300
              },
              {
                "x" : "6월",
                "y" : 300
              },
              {
                "x" : "7월",
                "y" : 300
              },
              {
                "x" : "8월",
                "y" : 120
              },
              {
                "x" : "9월",
                "y" : 300
              },
              {
                "x" : "10월",
                "y" : 300
              },
              {
                "x" : "11월",
                "y" : 300
              },
              {
                "x" : "12월",
                "y" : 300
              }
            ]
          }
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        colors={{ scheme: 'set2' }}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabelYOffset={-12}
        crosshairType="bottom-right"
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 20,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                  }
                ]
            }
        ]}
      />
      {/* apexcharts로 만든 선 그래프 */}
      <ApexCharts
        options={state.options}
        series={state.series}
        typs='line'
        width={1100}
        height={400}
      />

      {/* 버튼 작업- 검정 버튼 */}
      <div className='btn'>
        <AiOutlinePlus onClick={() => handleClick()}/>
      </div>

      {/* mui 이용한 버튼 */}
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={()=>setOpen(true)}
            />
          ))}
        </SpeedDial>
      </Box>

      {/* 모달창 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={titleStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              지출 또는 수입
            </Typography>
            <AiOutlineClose onClick={() => setOpen(false)}/>
          </Box>
          {/* <Box sx={{display:'flex', overflow:'scroll'}}>
              <p className='modalList'>list1</p>
              <p className='modalList'>list2</p>
              <p className='modalList'>list3</p>
              <p className='modalList'>list4</p>
              <p className='modalList'>list5</p>
              <p className='modalList'>list6</p>
              <p className='modalList'>list7</p>
          </Box> */}
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: { xs: 320, sm: 480 },
              bgcolor: 'background.paper',
              border:'1px solid black',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              <Tab sx={{padding:'0px'}} label="식비" />
              <Tab sx={{padding:'0px'}} label="통신비" />
              <Tab sx={{padding:'0px'}} label="쇼핑" />
              <Tab sx={{padding:'0px'}} label="보험비" />
              <Tab sx={{padding:'0px'}} label="병원/약국" />
              <Tab sx={{padding:'0px'}} label="간식비" />
              <Tab sx={{padding:'0px'}} label="반료묘/견" />
              <Tab sx={{padding:'0px'}} label="추가 카테고리" />
            </Tabs>
          </Box>
          {/* <Box sx={titleStyle}>
            <MdKeyboardArrowLeft/>
            <MdKeyboardArrowRight />
          </Box> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            nnnn원
          </Typography>
          
        </Box>
      </Modal>
    </div>
  );
};

export default App;






{/*
  const state = {
    series: [10, 20, 30, 20, 10, 5, 5],
    // 카테고리의 값 추가
    options:{
      chart:{
        type:'donut',
      },
      legend:{
        position:'right'
      },
      responsive:[{
        breakpoint:480
      }],
      plotOptions:{
        pie:{
          donut:{
            labels:{
              show : true,                    // 가운데 제목,부제목 존재여부
              total:{
                showAlways : false,           //true면 마우스로 챠트에 올리면 가운데가 해당 카테고리 보여주고 false면 그냥 test로 고정 (내가 정한 값)
                show: true,                   //true면 가운데 제목, 부제목 존재
                //22번째줄과 다른 부분은 22번은 false 시 가운데 글이 아예 사라지고 total에서 show: false의 경우에는 마우스 오버에는 해당 카테고리 보임
                label:"가운데",
                fontSize:'12px',
                color:'red'
              },
              value:{
                fontSize:'22px',
                show:true,
                color:'blue',
                // 그래프등 총 합 수
              }
            }
          }
        }
      },
      labels: ['외식비', '교통비', '쇼핑', '애완동물', '보험','추가1','추가2'],
      // 카테고리 추가
      // title:{
      //   text:'title 입력하는곳',
      //   align:'left'
      // }
    }
  };

  return (
    <DountWrap className="donut">
      <DountGraph>
        <Chart options={state.options} series={state.series} type="donut" width="600"/>
      </DountGraph>
      <AddInfoArea>
        <UpperText>
          <h2>지출</h2>
          <h2>수입</h2>
        </UpperText>
        <Divider />
        <Box>
          <h2>전액</h2>
          <p>225,463원</p>
        </Box>
        <Divider />
        <Box>
          1.최근순 결제내역
          2.최근순 결제내역
          3.최근순 결제내역
        </Box>
      </AddInfoArea>
    </DountWrap>
  );
//style=================================================
const DountWrap = styled(Box)({
  border:'1px solid black',
  display:'flex',
  height:'100vh',
  alignItems:'center',
});
const DountGraph = styled(Box)({
  border:'1px solid yellow',
  width:'60%'
})
const AddInfoArea = styled(Box)({
  border:'1px solid pink',
  width:'40%',
  height:'100%'
})
const UpperText = styled(Box)({
  display:'flex',
  justifyContent:'space-around',
})
//======================================================
*/}