import React from 'react'
import { CellProps } from '../interfaces/general-interfaces'

export default function Cell(props: CellProps) {

    const getCellClass = () => {
        let colorClass = props.color.toLowerCase();
        let disableCellKey = props.disableCellKeys?.find((dc) => dc.key === props.cellKey); 
        let isDisable = disableCellKey !== undefined && disableCellKey !== null && disableCellKey ? 'true' : 'false';

        return <div className={`cell ${colorClass}`} is-disabled={isDisable} onClick={props.onClickEvent}></div>
    }


    return (
        <td data-cell={props.cellKey}>
            {getCellClass()}
        </td>
    )
}
