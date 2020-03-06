
import React, {useState, useEffect} from 'react';
import {Bar, Doughnut, Pie, Bubble} from 'react-chartjs-2';
import DashBoardStatDisplay from "./dashboardStatDisplay";

var colours = [
    'rgb(0, 152, 224, 0.8)',
    'rgb(94, 188, 219, 0.8)',
    'rgb(241, 221, 132, 0.8)',
    'rgb(245, 181, 135, 0.8)',
    'rgb(247, 137, 121, 0.8)',
    'rgb(184, 99, 119, 0.8)'
];
var border_colours = [
    '#0098E0',
    '#3C778B',
    '#F1DD84',
    '#F5B587',
    '#F78979',
    '#B86377'
];

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

function studentStageNumbers(json_data){
    let dataMap = new Map();
    for (const item of json_data){
        if(!dataMap.has(item.stage)){
            dataMap.set(item.stage,0);
        }else{
            dataMap.set(item.stage, dataMap.get(item.stage) + 1);
        }

    }
    // console.log(json_data)
    return strMapToObj(dataMap);
}

async function getGenderData(data){

    let dataMap = new Map();
    let student_genders = [];
    let student_genders_data = [];

    for (const student of data) {
        if(!dataMap.has(student.gender)){
            dataMap.set(student.gender,0);
        }else{
            dataMap.set(student.gender, dataMap.get(student.gender) + 1);
        }
    }
    for (let [key, value] of dataMap) {
        student_genders.push(key);
        student_genders_data.push(value);
    }

    return  {
        labels: student_genders,
        datasets: [{
            label: '# of Votes',
            data: student_genders_data,
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]};
}


function Dashboard(){

    var colours = [
        'rgb(0, 152, 224, 0.8)',
        'rgb(94, 188, 219, 0.8)',
        'rgb(241, 221, 132, 0.8)',
        'rgb(245, 181, 135, 0.8)',
        'rgb(247, 137, 121, 0.8)',
        'rgb(184, 99, 119, 0.8)'
    ];
    var border_colours = [
        '#0098E0',
        '#3C778B',
        '#F1DD84',
        '#F5B587',
        '#F78979',
        '#B86377'
    ];

    var text_colour  = "#404040";


    var bar_data= {
        labels: ['NG - E', 'D', 'C', 'B', 'A'],
        datasets: [{
            label: 'Grade Break down',
            data: [2, 8, 13, 20, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    };

    var data_doughnut = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: '# of Votes',
            data: [25, 15, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    };

    var data_pie = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: '# of Votes',
            data: [25, 15, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    };

    var data_bubble = {
        labels: "Computer Science",
        datasets: [
            {
                label: ["China"],
                backgroundColor:'#0098E0',
                borderColor:'#0098E0',
                data: [{
                    x: 190,
                    y: 5.245,
                    r: 18
                }]
            }, {
                label: ["India"],
                backgroundColor:'#0098E0',
                borderColor:'#0098E0',
                data: [{
                    x: 200,
                    y: 7.526,
                    r: 20
                }]
            }, {
                label: ["Ireland"],
                backgroundColor:'#0098E0',
                borderColor:'#0098E0',
                data: [{
                    x: 250,
                    y: 6.994,
                    r: 24
                }]
            }, {
                label: ["Poland"],
                backgroundColor: '#0098E0',
                borderColor: '#0098E0',
                data: [{
                    x: 100,
                    y: 5.921,
                    r: 15
                }]
            }
        ]
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const [items, setItems] = useState([]);

    const fetchStudents = async() =>{
        const data_json =  await fetch('http://localhost:8080/api/students/?size=250').then(res => res.json());
        let data_j = data_json._embedded.students.filter(function(item){return item;});

        const data_json_staff =  await fetch('http://localhost:8080/api/staff/?size=250').then(res => res.json());
        console.log(data_json_staff);
        let data_j_staff = data_json_staff._embedded.staff.filter(function(item){return item;});

        data_json["numbers"] = studentStageNumbers(data_json._embedded.students);
        data_json["studentGenderBreakDown"] = await getGenderData(data_j);
        data_json["staffGenderBreakDown"] = await getGenderData(data_j_staff);
        setItems(data_json);
    };


    return (<div className="main-box" id="analytics">
        <section className="hero is-dark">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        University of Springfield
                    </h1>
                    <h2 className="subtitle">
                        Analytics
                    </h2>
                </div>
            </div>
        </section>
        <nav className="level">
            {/*{items.map(item =>(*/}
            {/*    */}
            {/*    <DashboardStat name="fds" number={"fdx"}/>*/}
            {/*))}*/}

            <DashBoardStatDisplay data={items.numbers}/>

        </nav>

        <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
                <div className="tile">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title is-4">Student Gender Breakdown</p>
                            {/* <canvas id="chart-area" ></canvas> */}
                            <Pie data={items.studentGenderBreakDown} id="chart-area"/>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title is-4">Staff Gender Breakdown</p>
                            {/* <canvas id="chart-area2" ></canvas> */}
                            <Doughnut data={items.staffGenderBreakDown} />
                        </article>
                    </div>
                </div>
                <div className="tile is-parent ">
                    <article className="tile is-child box">
                        <p className="title is-4">One</p>
                        {/* <canvas id="bubble-chart" width="100" height="30"></canvas> */}
                        <Bubble data={data_bubble} width={100} height={30}/>
                    </article>
                </div>
            </div>
            <div className="tile is-parent">
                <article className="tile is-child box">
                    <div className="content">
                        <p className="title is-4">One</p>
                        {/* <canvas id="myChart" width="100" height="140"></canvas> */}
                        < Bar data={bar_data} id="myChart" width={100} height={145}/>
                    </div>
                </article>
            </div>
        </div>

    </div>);
}

export default Dashboard;