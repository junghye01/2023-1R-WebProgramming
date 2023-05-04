import { useState } from 'react'



// 과제 : 로딩 버튼을 누르면 미세먼지 api결과를 보여줌 
function App() {

  const [row,setRow]=useState([]);
  const [isLoading,setIsLoading]=useState(false); // 데이터 로딩 상태

  const dataLoad = () =>{
    
    if (row.length===0){ // 아직 row에 데이터가 없을 경우에만 
      setIsLoading(true);
      fetch("http://openapi.seoul.go.kr:8088/6864536d4a7477653636457071754c/json/RealtimeCityAir/1/25/").then(
        function(res){
          res.json().then(function(res2){
            setRow(res2.RealtimeCityAir.row);
            setIsLoading(false); // 데이터를 받아오면 로딩 상태 false
          })
        }
      )
      
    }
  };

    return(
      <div>
        <button onClick={dataLoad}>DataLoad</button>
        {isLoading ? ( <p>Loading...</p>) : ( // 삼항 연산자 : true면 앞에 태그 반환 
      <table border="1">
      <thead>
        <tr>
          <th>이름</th>
          <th>PM10</th>
          <th>O3</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        
          {
            row.map((obj,index)=> (<tr key={index}>
              <td>{obj.MSRSTE_NM}</td>
              <td>{obj.PM10}</td>
              <td>{obj.O3}</td>
              <td>{obj.IDEX_NM}</td>
            </tr>))
          }
        
      </tbody>
    </table>)}
      </div>
      
    
    
  )

  }



   




export default App;
