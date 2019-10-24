import React, {useContext} from 'react';
import Row from './Row/Row';
import Context from './../../../context';
import styles from './Board.module.css';

const Board = () => {
    let context = useContext(Context);
    return (
        <div>
            <table className={styles.boardTable}>
                <tbody>
                {context.board.map((column, i) => (<Row
                    key={i}
                    trIx={i}
                    column={column}
                />))}
                </tbody>
            </table>
        </div>
    );
};

export default Board;