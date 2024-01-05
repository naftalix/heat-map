import { Color, ColorNames, Colors, NumericTimes } from "../interfaces/general-interfaces";


export const calculateColorLevels = function (levels: number) {

    let colors = Colors.filter((c, idx) => idx < levels - 1 && idx > 0)
   // colors[colors.length - 1].color = ColorNames.Red;
    let result : Color[] = [{
        color: ColorNames.Blue, value: 0},
         ...colors, 
        {color: ColorNames.Red, value: colors[colors.length-1].value + 1
        }];
    return result;
}


const init2dArray = function (lenght: number, width: number): (number | string)[][] {

    var arr = Array.from(Array<number | string>(width).fill(0), () => new Array<number | string>(lenght).fill(0));
    return arr;
}


const getHeatMap = function (times: NumericTimes[], hourFrom: number = 0, hourTo: number = 23, colorLevel: number = 5) {
    let result: (number | string)[][] = []
    if (times.length) {
        let lenght = (hourTo - hourFrom) + 1;
        let width = 7;

        let filteredTime = times
            .filter(nt => nt.hour >= hourFrom && nt.hour <= hourTo)
            .map<NumericTimes>(fnt => ({ hour: fnt.hour - hourFrom, day: fnt.day }));

        let numericHeatMap = getNumericHeatMap(filteredTime, lenght, width);
        let colorwiseHeatMap = convertNumericToColorwiseHeatMap(numericHeatMap, colorLevel);
        result = colorwiseHeatMap;
    }
    return result;
}

const getNumericHeatMap = function (numericTimesArray: NumericTimes[], lenght: number, width: number): (number | string)[][] {

    let twoDArray = init2dArray(lenght, width);

    numericTimesArray.forEach((nt) => {
        (twoDArray[nt.day][nt.hour] as number) += 1;
    });

    return twoDArray;
}


const convertNumericToColorwiseHeatMap = function (heatMap: (number | string)[][], colorLevel: number) {
    let maxValueEvents = getHeatMapMaxValue(heatMap);
    let colors = calculateColorLevels(colorLevel);

    heatMap.forEach((i, idx) => {
        i.forEach((j, jdx) => {
            let color = getColorTypeByNumber(j as number, maxValueEvents, colors);
            heatMap[idx][jdx] = color;
        })
    })

    return heatMap;
}

const getColorTypeByNumber = function (num: number, maxValue: number, colors: Color[]): string {

    let resultColor = ColorNames.Blue;

    if (num !== 0) {
        let resultNumber = 0;

        let formulaResult = ((num / (maxValue)) * (colors.length));

        if (formulaResult === 0 || formulaResult < 0.5) {
            return resultColor;
        }

        let colorScaleNumber = formulaResult < 1 ? formulaResult + 1 : formulaResult % 1 > 0.5 ? formulaResult + 1 : formulaResult;

        resultNumber = Math.floor(colorScaleNumber);

        if (resultNumber > 4) {
            resultNumber = 4;
        }

        resultColor = colors.find((i) => i.value == resultNumber)?.color || ColorNames.Blue;

    }
    return resultColor;
}


const getHeatMapMaxValue = function (heatMap: (number | string)[][]): number {
    let result: (number | string) = 0;

    heatMap.forEach((i) => {
        i.forEach((j) => {
            if (j > result) {
                result = j;
            }
        })
    })

    return result;
}

//for test
//not supports of dunamic days scale
const wheekend: string[] = [];
wheekend.push("mo");
wheekend.push("tu")
wheekend.push("we")
wheekend.push("th")
wheekend.push("fr")
wheekend.push("sa")
wheekend.push("su")


const printHeatMapNumercLog = function (arr: (number | string)[][], hourFrom: number = 0, hourTo: number = 23): void {
    let result: string = "";

    if (arr.length) {
        arr.forEach((i, idx) => {
            result += wheekend[idx] + " ";
            i.forEach((j) => {
                result += j + "  ";
            });
            result += "\n";
        });

        result += "   ";
        for (let index = hourFrom; index <= hourTo; index++) {
            result += index + "  ";
        }
    }
    console.log(result);
}

export { getHeatMap, printHeatMapNumercLog };
