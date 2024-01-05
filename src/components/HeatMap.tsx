import React, { DetailedHTMLProps, HTMLAttributes, MouseEventHandler, useContext, useState } from 'react'
import { getHeatMap, printHeatMapNumercLog } from '../data/data-service';
import '../components/HeatMap.css'
import { DisabledCells, HeatMapProps, NumericTimes, Weekend } from '../interfaces/general-interfaces';
import Cell from './Cell';
import { v4 as uuidv4 } from 'uuid';

export default function HeatMap(props: HeatMapProps) {

    const [calculatedTimes, setCalculatedTimes] = useState<NumericTimes[]>(props.times);
    const [disabledCellsKeys, setDisabledCellsKeys] = useState<DisabledCells[]>([]);

    const convertHourToText = (hour: number) => {
        if (hour === 0) {
            return "12AM";
        }

        if (hour > 12) {
            return `${hour - 12}PM`;
        }

        return `${hour}AM`;
    }

    const getCellTimes = (cellRawTime: string): NumericTimes => {
        let times = cellRawTime.split('_').map((i) => parseInt(i));
        let cellTimes: NumericTimes = {
            day: times[0],
            hour: times[1]
        }
        return cellTimes;
    }

    const onCellClick = (e: React.MouseEvent<HTMLDivElement>) => {

        let el = e.target as HTMLDivElement

        let cellAttributeValue = el.parentElement?.attributes.getNamedItem("data-cell")?.value;
        if (cellAttributeValue) {

            let cellNumericTime = getCellTimes(cellAttributeValue.toString());

            let isDisable = el.attributes.getNamedItem("is-disabled")?.value === 'true';

            if (isDisable) {
                //Update display
                let cellsKeys: DisabledCells[] = [];// = disabledCellsKeys.filter((dc) => dc.key !== cellAttributeValue);
                let disableAppearsNumber = 0;

                disabledCellsKeys.forEach(dc => {
                    if (dc.key !== cellAttributeValue) {
                        cellsKeys.push(dc);
                    } else {
                        disableAppearsNumber = dc.count;
                    }
                });

                setDisabledCellsKeys(cellsKeys);

                let updateTimes = Array
                .from(Array<NumericTimes>(disableAppearsNumber)
                .fill({day: cellNumericTime.day, hour: cellNumericTime.hour}));
                
                setCalculatedTimes([...calculatedTimes, ...updateTimes]);
            }
            else {
                let timesToUpdate: NumericTimes[] = [];
                let timesAppearsNumber = 0;
                calculatedTimes.forEach((time) => {
                    if (time.day !== cellNumericTime.day || time.hour !== cellNumericTime.hour) {
                        timesToUpdate.push(time);
                    }
                    else {
                        timesAppearsNumber++;
                    }
                });

                setDisabledCellsKeys([...disabledCellsKeys, { key: cellAttributeValue, count: timesAppearsNumber }]);
                setCalculatedTimes(timesToUpdate);
            }
        }
    }


    const heatMap = getHeatMap(calculatedTimes, props.fromHour, props.toHour, props.colorLevel);

    const dayKeys = Object.keys(Weekend);

    const hours =
        <tr key="hours">
            <React.Fragment>
                <td />
                {
                    [...Array<number>(props.toHour - props.fromHour + 1)].map((x, idx) =>
                        <td key={uuidv4()} >
                            <div className="hours">
                                {convertHourToText(idx + props.fromHour)}
                            </div>
                        </td>
                    )
                }
            </React.Fragment>

        </tr>


    const dots = heatMap.map((r, rdx) =>
        <tr key={rdx}>
            {
                <React.Fragment>
                    <td key={uuidv4()}>{dayKeys[rdx]}</td>
                    {
                        r.map((color, cdx) =>
                            <Cell key={uuidv4()}
                                color={color.toString()}
                                cellKey={`${rdx}_${cdx + props.fromHour}`}
                                disableCellKeys={disabledCellsKeys}
                                onClickEvent={onCellClick}
                            />
                        )
                    }
                </React.Fragment>

            }
        </tr>
    );

    //printHeatMapNumercLog(arr,15,23);

    return (
        <div>
            <table>
                <tbody>
                    {dots}
                </tbody>
                <tfoot>
                    {hours}
                </tfoot>
            </table>
        </div>
    )
}


