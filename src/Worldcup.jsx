
import { useEffect, useState } from 'react'
import './Worldcup.css'

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


function Worldcup() {

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        setGame(candidate.map(c => {
            return { name: c.name, src: c.src, order: Math.random() }
        }).sort((l, r) => {
            return l.order - r.order;
        }));
    }, []);

    useEffect(() => {
        if (game.length > 1 && round + 1 > game.length / 2) {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    }, [round]);

    const handleImageClick = (index) => {
        setSelectedImage(game[index]);
        setNextGame((prev) => prev.concat(game[index]));
        
        setTimeout(() => {
            setRound((round)=>round+1);
            setSelectedImage(null);
        }, 3000);

    }

    if (game.length === 1) {
        return <div>
            <p>이상형 월드컵 우승</p>
            <img src={game[0].src} /> <p>{game[0].name}</p>
        </div>
    }
    if (game.length === 0 || round + 1 > game.length / 2) return <p>로딩중입니다</p>;
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