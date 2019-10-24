export const getApple = (width, height, snake = getInitSnake()) => {
    let checkAppleOnSnake = (newAppleCoordinates) => {
        return snake.some((el, i) => {
           return el[0] === newAppleCoordinates[0] && el[1] === newAppleCoordinates[1];
        });
    };

    let randomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    };

    let newAppleCoordinates = [randomInt(0, width), randomInt(0 ,height)];
    if(checkAppleOnSnake(newAppleCoordinates)) {
        newAppleCoordinates = getApple(width, height);
    }
    return newAppleCoordinates;
};

export const getBoard = (width, height) => {
    let board = [];
    for (let r = 0; r < width; r++) {
        let row = [];
        for (let c = 0; c < height; c++) {
            row.push(null)
        }
        board.push(row);
    }
    return board;
};

export const getInitSnake = () => [[0, 0], [0, 1], [0, 2]];

export const getDirects = () => ({
    left: 'left',
    right: 'right',
    up: 'up',
    down: 'down'
});

export const checkOut = (snake, width, height) => {
    let firstSnakeBlock = snake[snake.length - 1];
    return (
        firstSnakeBlock[0] >= width ||
        firstSnakeBlock[0] < 0 ||
        firstSnakeBlock[1] >= height ||
        firstSnakeBlock[1] < 0
    );
};

export const checkApple = (apple, snake) => {
    let firstSnakeBlock = snake[snake.length - 1];
    return firstSnakeBlock[0] === apple[0] && firstSnakeBlock[1] === apple[1];
};

export const checkSelf = snake => {
    let firstSnakeBlock = snake[snake.length - 1];
    return snake.some((snakeBlock, i) => {
        if (i !== snake.length-1) {
            return snakeBlock[0] === firstSnakeBlock[0] && snakeBlock[1] === firstSnakeBlock[1];
        }
        return false;
    });
};

export const checkLevel = snake => snake.length === 10;