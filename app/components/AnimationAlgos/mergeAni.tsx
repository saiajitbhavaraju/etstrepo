// Create an animation array that stores pairs of indices and a specific number that corresponds to a case animations[[i, j, num]]
// Do Merge sort and add important parts of it (compare, swap) to animations array, used to change specific colors and heights
// except I have to change the code to follow the specific switch case statements and not the weird i % 3 !== 2, It's very hacky!
export const mergeAnimationcode = (array: number[], ANIMATION_SPEED: number): void => {
    console.log("array");
    console.log(array);

    const animations = mergeSort(array);

    console.log("anims");
    console.log(animations)
    console.log("merge")
    console.log(array)

    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('arrayBars');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [bar1Idx, bar2Idx] = animations[i];
            const barStyle1 = (arrayBars[bar1Idx] as HTMLElement).style;
            const barStyle2 = (arrayBars[bar2Idx] as HTMLElement).style;
            const color = i % 3 === 0 ? 'red' : 'black';
            setTimeout(() => {
                barStyle1.backgroundColor = color;
                barStyle2.backgroundColor = color;
            }, i * ANIMATION_SPEED);
        }
        else {
            setTimeout(() => {
                const [bar1Idx, newHeight] = animations[i];
                const barStyle = (arrayBars[bar1Idx] as HTMLElement).style;
                barStyle.height = `${newHeight / 2}px`;
            }, i * ANIMATION_SPEED);
        }

    }
}


const mergeSort = (arr: number[]): number[][] => {
    const animations: number[][] = [];

    if (arr.length <= 1) return []; // return empty animation steps
    const temp = arr.slice();
    mergeHelper(arr, 0, arr.length - 1, temp, animations);
    return animations;
};



const mergeHelper = (arr: number[],
    start: number, end: number,
    temp: number[],
    animations: number[][]): void => {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    mergeHelper(arr, start, mid, temp, animations);
    mergeHelper(arr, mid + 1, end, temp, animations);
    doMerge(arr, start, mid, end, temp, animations);
}

const doMerge = (
    arr: number[],
    start: number,
    mid: number,
    end: number,
    temp: number[],
    animations: number[][]
): void => {
    let k = start;
    let i = start;
    let j = mid + 1;
    while (i <= mid && j <= end) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (temp[i] <= temp[j]) {
            animations.push([k, temp[i]]);
            arr[k++] = temp[i++]
        } else {
            animations.push([k, temp[j]]);
            arr[k++] = temp[j++];
        }
    }
    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, temp[i]]);
        arr[k++] = temp[i++];
    }
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, temp[j]]);
        arr[k++] = temp[j++];
    }
    for (let x = start; x <= end; x++) {
        temp[x] = arr[x];
    }
}
