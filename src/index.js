import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import pic1 from "./image/amiya.png";
import pic2 from "./image/W_05.png";


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props) {
    function renderSquare(i) {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    }

    return (
        <div>
            {[0, 1, 2].map((i) =>
                <div className="board-row" key={i.toString()}>
                    {renderSquare(0 + i * 3)}
                    {renderSquare(1 + i * 3)}
                    {renderSquare(2 + i * 3)}
                </div>
            )}
        </div>
    );
}

// class Board extends React.Component {
//     renderSquare(i) {
//         return (
//             <Square
//                 value={this.props.squares[i]}
//                 onClick={() => this.props.onClick(i)}
//             />
//         );
//     }

//     render() {
//         return (
//             <div>
//                 {[0, 1, 2].map((i) =>
//                     <div className="board-row">
//                         {this.renderSquare(0 + i * 3)}
//                         {this.renderSquare(1 + i * 3)}
//                         {this.renderSquare(2 + i * 3)}
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }

function Clock(props) {
    const [date, setDate] = useState(new Date());
    const [hour12, setHour12] = useState(false);

    useEffect(() => {
        const timerID = setInterval(() => { setDate(new Date()); }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    function clickEvent() {
        props.onClick(date);
        setHour12(hour12 ^ 1);
    }

    // 時刻表示
    // 日にち+曜日
    let opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    let localDate = new Intl.DateTimeFormat("ja-JP", opts).format(date);

    // 時間
    let hours = date.getHours();
    let minites = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = null;

    if (hour12) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
    }
    minites = minites < 10 ? "0" + minites : minites;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // let localTime = ampm + hours + ":" + minites + ":" + seconds;
    let localTime = hours + ":" + minites;

    return (
        <div>
            <p className="date" onClick={clickEvent}>
                {localDate}
            </p>
            <div className="clock" onClick={clickEvent}>
                <div className="ampm">
                    {ampm}
                </div>
                <div className="time">
                    {localTime}
                </div>
                <div className="seconds">
                    {seconds}
                </div>
            </div>
            {/* <p className="clock" onClick={() => props.onClick(date)}>
                {date.toLocaleTimeString("ja-JP", { hour12: false })}
            </p> */}
        </div>
    );
}

// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             date: new Date(),
//         };
//     }

//     // DOMが描画されるときに呼ばれる
//     componentDidMount() {
//         this.timerID = setInterval(() => this.tick(), 1000);
//     }

//     // DOMが削除されるときに呼ばれる
//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }

//     // コンポーネントの変数を更新
//     tick() {
//         this.setState({
//             date: new Date(),
//         });
//     }

//     // 時刻表示
//     render() {
//         let opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
//         let localDate = new Intl.DateTimeFormat("ja-JP", opts).format(this.state.date);

//         return (
//             <div>
//                 <p className="date">
//                     {localDate}
//                 </p>
//                 <p className="clock">
//                     {this.state.date.toLocaleTimeString("ja-JP")}
//                 </p>
//             </div>
//         );
//     }
// }

function DateLabel(props) {
    // let lblStr = "0000年00月00日〇曜日 00:00:00"
    let lblStr = "----年--月--日―曜日 --:--:--"

    if (props.date != null) {
        let opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        let localDate = new Intl.DateTimeFormat("ja-JP", opts).format(props.date);
        let localTime = props.date.toLocaleTimeString("ja-JP");

        lblStr = localDate + " " + localTime;
    }

    return (
        <label>{lblStr}</label>
    );
}

// srcに配置した場合は import を使うのが一般的らしい
function PictureChange(props) {
    const [timerID, setTimerID] = useState(null);

    function dialogue() {
        const msgList = [
            "なに？",
            "怒るよ",
            "えへへ",
            "ひゃあ"
        ];

        if (timerID != null) {
            clearInterval(timerID);
        }

        props.setMsg(msgList[Math.floor(Math.random() * msgList.length)]);
        setTimerID(setTimeout(() => { props.setMsg(null); }, 3000));
    }

    // const pic1 = "/pict/amiya.png";
    // const pic2 = "/pict/W_05.png";
    let picPath = props.flg ? pic1 : pic2;

    return (
        <img src={picPath} alt="絵" className="chara-img" onClick={dialogue} />
    );

    // public に配置した場合は `${process.env.PUBLIC_URL}` を使う
    // return (
    //     <img src={`${process.env.PUBLIC_URL}` + picPath} alt="絵" width="320" height="320" />
    // );
}

function Message(props) {
    const [msg, setMsg] = useState(null);
    const msgList = [
        "おはよう",
        "こんばんは",
        "お疲れ様",
        "おやすみなさい"
    ];

    function selectMsg() {
        if (msg === null) {
            setMsg(msgList[Math.floor(Math.random() * msgList.length)]);
        } else {
            setMsg(null);
        }
    }

    useEffect(() => {
        const timerID = setInterval(selectMsg, 3000);

        return () => {
            clearInterval(timerID);
        };
    });

    let msgPadd = msg === null ? 'rgba(222, 219, 202, 0.0)' : 'rgba(222, 219, 202, 0.85)';
    let rmsgPadd = props.reactMsg === null ? 'rgba(222, 219, 202, 0.0)' : 'rgba(222, 219, 202, 0.85)';

    return (
        <React.Fragment>
            <div className="message" style={{ backgroundColor: msgPadd }}>
                <label>{msg}</label>
            </div>
            <div className="react-message" style={{ backgroundColor: rmsgPadd }}>
                <label>{props.reactMsg}</label>
            </div>
        </React.Fragment>
    );
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null), }],
            stepNumber: 0,
            xIsNext: true,
            dateHistory: null,
            pictFlag: 1,
            reactMsg: null,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    dateClick(d) {
        this.setState({
            dateHistory: d,
            pictFlag: this.state.pictFlag ^ 1,
        });
    }

    reactMessage(m) {
        this.setState({
            reactMsg: m,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (this.state.stepNumber === 9) {
            status = 'Draw';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <React.Fragment>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                    <div className="game-time">
                        <PictureChange
                            flg={this.state.pictFlag}
                            setMsg={(m) => this.reactMessage(m)}
                        />
                        <div className="game-clock">
                            <Clock
                                onClick={(d) => this.dateClick(d)}
                            />
                            <DateLabel
                                date={this.state.dateHistory}
                            />
                        </div>
                        <div className="game-message">
                            <Message
                                reactMsg={this.state.reactMsg}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
