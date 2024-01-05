import internal from "stream";

export interface HeatMapProps {
    times: NumericTimes[],
    colorLevel: number,
    fromHour: number,
    toHour: number
}


export interface NumericTimes {
    day: number,
    hour: number,
}

export interface DisabledCells{
    key: string,
    count: number
}

export interface CellProps {
    cellKey: string,
    color: string,
    disableCellKeys?: DisabledCells[],
    onClickEvent: React.MouseEventHandler<HTMLDivElement>
}

export enum ColorNames {
    Red = "Red",
    Orange = "Orange",
    Yellow = "Yellow",
    Green = "Green",
    Blue = "Blue",
}

export enum Weekend {
    Sun = "Sun",
    Mon= "Mon",
    Tue = "Tue",
    Wed = "Wed",
    Tru = "Tru",
    Fri = "Fri",
    Sat = "Sat"
}


export const Colors: Color[] = [
    { color: ColorNames.Blue, value: 0 },
    { color: ColorNames.Green, value: 1 },
    { color: ColorNames.Yellow, value: 2 },
    { color: ColorNames.Orange, value: 3 },
    { color: ColorNames.Red, value: 4 }
]


export interface Color {
    color: ColorNames,
    value: number
}


export const BucketOptions = [
    {
      value: 24,
      label: "24 Hours",
    },
    {
      value: 3,
      label: "3 Hours",
    },
    {
      value: 4,
      label: "4 Hours",
    },
    {
      value: 6,
      label: "6 Hours",
    },
    {
      value: 12,
      label: "12 Hours",
    }
  ];