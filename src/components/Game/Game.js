import React, {useState, useEffect} from 'react';
import Board from "./Board/Board";
import {getApple, getBoard, getDirects,
    getInitSnake, checkOut, checkLevel, checkSelf, checkApple} from "./../../helpers";
import Context from './../../context';
import styles from './Game.module.css';

const Game = () => {
    const WIDTH = 20;
    const HEIGHT = 20;
    const INITIAL_LEVEL = 1;
    const INITIAL_SPEED = 500;
    const GAME_IS_RUN_MESSAGE = "Game is run";
    const GAME_OVER_MESSAGE = "Game OVER";

    const directs = getDirects();
    const [board, setBoard] = useState(getBoard(WIDTH, HEIGHT));
    const [apple, setApple] = useState(getApple(WIDTH, HEIGHT));
    const [direct, setDirect] = useState(directs.right);
    const [snake, setSnake] = useState(getInitSnake());
    const [message, setMessage] = useState(GAME_IS_RUN_MESSAGE);
    const [level, setLevel] = useState(INITIAL_LEVEL);
    const [speed, setSpeed] = useState(INITIAL_SPEED);

    const keyPress = event => {
        switch (event.key) {
            case 'ArrowDown':
                if (direct !== directs.up) {
                    setDirect(directs.down);
                }
                break;
            case 'ArrowUp':
                if (direct !== directs.down) {
                    setDirect(directs.up);
                }
                break;
            case 'ArrowLeft':
                if (direct !== directs.right) {
                    setDirect(directs.left);
                }
                break;
            case 'ArrowRight':
                if (direct !== directs.left) {
                    setDirect(directs.right);
                }
                break;
        }
    };
    window.addEventListener('keydown', keyPress);

    const move = () => {
        return snake.map((snakeEl, i) => {
            if (i === snake.length - 1) {
                switch (direct) {
                    case directs.right:
                        return [snakeEl[0], snakeEl[1] + 1];
                    case directs.down:
                        return [snakeEl[0] + 1, snakeEl[1]];
                    case directs.left:
                        return [snakeEl[0], snakeEl[1] - 1];
                    case directs.up:
                        return [snakeEl[0] - 1, snakeEl[1]];
                }
                return [snakeEl[0], snakeEl[1] + 1];
            } else {
                return [snake[i + 1][0], snake[i + 1][1]];
            }
        });
    };

    const enlargeSnake = () => {
        let enlargedSnake = [...snake];
        let coordinate1 = enlargedSnake[0];
        let coordinate2 = enlargedSnake[1] - 1;
        enlargedSnake.unshift([coordinate1, coordinate2]);
        setApple(getApple(WIDTH, HEIGHT, enlargedSnake));
        setSnake(enlargedSnake);
    };

    const resetGame = () => {
        setSnake(getInitSnake());
        setApple(getApple(WIDTH, HEIGHT));
        setMessage(GAME_IS_RUN_MESSAGE);
        setDirect(directs.right);
        setLevel(INITIAL_LEVEL);
        setSpeed(INITIAL_SPEED);
    };

    const levelUp = () => {
        setSnake(getInitSnake());
        setApple(getApple(WIDTH, HEIGHT));
        setLevel(level+1);
        setDirect(directs.right);
        setSpeed(speed-100);
    };


    useEffect(() => {
        if (checkApple(apple, snake)) {
            checkLevel(snake) ? levelUp() : enlargeSnake();
        }
        let intervalId = setInterval(() => {
            let displacedSnake = move();
            if (checkOut(displacedSnake, WIDTH, HEIGHT)) {
                setMessage(GAME_OVER_MESSAGE);
                return false;
            }
            if (checkSelf(displacedSnake)) {
                setMessage(GAME_OVER_MESSAGE);
                return false;
            }
            setSnake(displacedSnake);
        }, speed);
        return () => clearInterval(intervalId);
    }, [snake, direct, apple, level, speed]);

    return (
        <div className="App">
            <h2>{message}</h2>
            <h3>Уровень {level}</h3>
            <div>
                <button className={styles.resetButton} onClick={resetGame}>Начать заново</button>
            </div>
            <Context.Provider value={{snake, board, apple}}>
                <Board />
            </Context.Provider>
        </div>
    );
};

export default Game;
