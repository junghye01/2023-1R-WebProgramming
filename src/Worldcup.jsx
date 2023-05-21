
import { useEffect, useState } from 'react'
import './Worldcup.css'
import arrayRandomize from './utils/arrayRandomize.js'
import Barchart from './Chart.jsx';

const candidate = [
    { name: '꼬똥 드 툴레아', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUPgeg9vugQzv_TRNSVfmdpHqTU_kGCVeew&usqp=CAU' },
    { name: '믹스견', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVQH_fUoogZeAN_GEwW57HuZWaBA_oKUxvQ&usqp=CAU' },
    { name: '말티즈', src: 'https://post-phinf.pstatic.net/MjAxOTEyMjZfMjg4/MDAxNTc3MzQ4MDk0OTg3.enPaZdNz18Qodom0-FVoGTxKsK7XVuB-0xlDVhy7lDYg.0ysMSYYiTvGa2z2__No32752OyRbAi79c6hDe-xNmlMg.JPEG/EMKK3hcXsAAMAOG.jpg?type=w1200' },
    { name: '닥스훈트', src: 'https://image-notepet.akamaized.net/article/201511/fb_dachshund.gif' },
    { name: '비글', src: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WG6KZUDPZRZFENTP2S5BPOMKEM.jpg' },
    { name: '보더콜리', src: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEyMDdfMyAg/MDAxNTc1NjkzMTAyODEx.OzeXWrjo5920znqNAwHfMWDrb_frRVXe02Nc235BHg0g.HWEfMpAKstVml8LbSz7yIPoZywBIdD54ct7AJsOMirEg.JPEG.eazil1/KakaoTalk_20191207_132905140_01.jpg?type=w800' },
    { name: '골든리트리버', src: 'https://t1.daumcdn.net/cfile/tistory/991820415CC2B4B106' },
    { name: '말라뮤트', src: 'https://thumb.mt.co.kr/06/2019/09/2019090314463896952_1.jpg/dims/optimize/' },
    { name: '사모예드', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAAdT3D02Y1cgj1-Ormie_boEDHXHBsyfPXw&usqp=CAU' },
    { name: '포메라니안', src: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F990BA4415C432CC601' },
    { name: '미니어처 핀셔', src: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F991B13445C4356DF1B' },
    { name: '파피용', src: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9968DA465C43B8D628' },
    { name: '요크셔테리어', src: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99A647475C43C0D52F' },
    { name: '비숑', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGTYP4BV0nLjDjGURJfOOBUKrswSzqDiIYA&usqp=CAU' },
    { name: '푸들', src: 'https://image.dongascience.com/Photo/2017/07/14994185580021.jpg' },
    { name: '페키니즈', src: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FctBOP2%2FbtqI2lg22qW%2FdjOw7nZZpSJ6klmrZr2W71%2Fimg.png' }
];

const dict = {};
const dict2stat = candidate.map(function (item) {
    dict[item.name] = 0
})



function Worldcup() {

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [stat, setStat] = useState(dict);
    const [renderBar,setrenderBar]=useState(false);

    // 처음 Worldcup 컴포넌트가 단 한 번 실행하는 함수 
    // 시작할 때 2번 실행됨 -> 그 이후 실행 x 
    useEffect(() => {
        
        const 월드컵LocalStorageData = localStorage.getItem('2020112092'); // localStorage의 key의 value값은 string 형태만 
        if (월드컵LocalStorageData) { // 로컬에 데이터 있으면
            const new월드컵Data=JSON.parse(월드컵LocalStorageData); 
            setStat(new월드컵Data); // stat -> 기존 데이터 넣어줌 !!! 모든 게임의 통계 내기 위해서 
        }

        setGame(arrayRandomize(candidate)); // 현재 게임 등장 순서 setting 
    }, []);


    useEffect(() => { // e.g. 16강 : 8, 8강 : 4 , 4강:2 , 뒤가 라운드 수 
        if (game.length > 1 && round + 1 > game.length / 2) {
            setGame(nextGame); // 다음 라운드 진출자 
            setNextGame([]); // 
            setRound(0);
        }
    }, [round]); 

    const handleImageClick = (index) => {
        setSelectedImage(game[index]);
        setNextGame((prev) => prev.concat(game[index]));

        setStat({
            ...stat,
            [game[index].name]: stat[game[index].name] + 1
        });

        setTimeout(() => {
            setRound((round) => round + 1);
            setSelectedImage(null);

        }, 3000);

    }
    
    useEffect(()=>{
        if(game.length==1){
            const ordered=Object.fromEntries(Object.entries(stat).sort((a,b)=>b[1]-a[1]));
            setStat(ordered);
            setrenderBar(true);
            
        }
    },[game]); 

    if (game.length === 1 && renderBar ===true) {
        
        
       
        localStorage.setItem('2020112092', JSON.stringify(stat)); // 종료 시 localStorage에 string 형태로 저장 
        return <div>
            <p>이상형 월드컵 우승</p>
            <img src={game[0].src} /> <p>{game[0].name}</p> <p>{stat[game[0].name]} 번 승리 </p>

            <table>
                <tbody>
                {Object.keys(stat).map(name => { //Object.keys(stat) : stat에 있는 키 값만 배열로 저장 
                    return <tr key={name}><td>{name}</td><td>{stat[name]}</td></tr> //stat의 key(name) 과 value
                })}
                </tbody>
                
            </table>
            <Barchart data={stat}/>
          

        </div>
    }
    if (game.length === 0 || round + 1 > game.length / 2) return <p>로딩중입니다</p>;
    //console.log(stat);
    return (
        
        <div className="ibox-content">
            <p className='gameTitle'>강아지 이상형 월드컵 {round + 1} / {game.length / 2} <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
            {selectedImage === null ? (

                <div className="image-versus">

                    <div className="wleft">
                        <p className="wleft-text"><b>{game[round * 2].name}</b></p>
                        <img src={game[round * 2].src} onClick={() => handleImageClick(round * 2)} />

                    </div>
                    <div className="wright">
                        <p className="wright-text"><b>{game[round * 2 + 1].name}</b></p>
                        <img src={game[round * 2 + 1].src} onClick={() => handleImageClick(round * 2 + 1)} />
                    </div>

                </div>



            ) : (
                <div className="selectedImage">
                    <p className='selected-text'><b>{selectedImage.name}</b></p>
                    <img src={selectedImage.src} />

                </div>
            )}

        </div>

    );
}

export default Worldcup;