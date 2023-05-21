
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Barchart = ({ data }) => {


    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const label_list = Object.keys(data);
    const data_list = Object.values(data);

    const options = {
        responsive:false,
        interaction:{
            mode:"index",
            intersect:false,
        },
        scales:{
            x:{
                grid:{
                    display:false,
                }
            },
            y:{
                grid:{
                    color:"#E3E3E3",
                }
            }
        }
    }
    useEffect(() => {
        setChartData({
            labels: label_list,
            datasets: [
                {
                    type:'bar',
                    label:'강아지 이상형 월드컵',
                    borderWidth:2,
                    data: data_list,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        })

        

    }, []);

    return(
        <Container>
            <Bar data={chartData} options={options} width="894px" height="320px"/>
        </Container>

    ) 

}

export default Barchart;

const Container = styled.div`
    width:90vw;
    max-width:900px;
`