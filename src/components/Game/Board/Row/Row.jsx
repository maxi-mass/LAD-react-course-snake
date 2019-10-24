import React from 'react';
import Field from './Field/Field';

const Row = ({column, trIx}) => {
    return (
        <tr>
            {column.map((cell, i) => {
                return <Field
                    key={i}
                    value={cell}
                    coordinate={[trIx, i]}
                    columnIndex={i}
                />
            })}
        </tr>
    );
};

export default Row;