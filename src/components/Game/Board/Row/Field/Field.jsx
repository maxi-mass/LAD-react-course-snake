import React, {useContext} from 'react';
import cellStyles from './Field.module.css';
import Context from "./../../../../../context";

const Field = ({ value, coordinate }) => {
    let context = useContext(Context);
    let snake = context.snake;
    let firstSnakeBlockCoordinateValue = snake[snake.length-1][0].toString() + "|" +
        snake[snake.length-1][1].toString();

        let snakeBlockFill = false;

    let coordinateValue = coordinate[0].toString() + "|" + coordinate[1].toString();

    snake.forEach((el) => {
        let snakeBlock = el[0].toString() + "|" + el[1].toString();
        if (snakeBlock === coordinateValue) {
            snakeBlockFill = true;
            return false;
        }
    });
    let appleCoordinateValue = context.apple[0].toString() + "|" + context.apple[1].toString();

    let color = "";
    if (snakeBlockFill) {
        color = 'snakeField';
    }
    if (coordinateValue===firstSnakeBlockCoordinateValue) {
        color = 'firstSnakeBlockField';
    }
    if (appleCoordinateValue === coordinateValue) {
        color = 'appleField';
    }

    return (
        <td>
            <div className={cellStyles.field}>
                <div className={cellStyles[color]} >
                {/*{coordinate.join("|")}*/}
                </div>
            </div>
        </td>
    );
};

export default Field;