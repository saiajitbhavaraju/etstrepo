// Create an animation array that stores pairs of indices and a specific number that corresponds to a case animations[[i, j, num]]
// Do bubble sort and add important parts of it (compare, swap) to animations array, used to change specific colors and heights
export const bubbleAnimationcode = (array: number[], ANIMATION_SPEED: number) => {
    const animations = bubbleSort(array);
    const arrayBars = document.getElementsByClassName('arrayBars');
    for (let i = 0; i < animations.length; i++) {
        const [bar1Idx, bar2Idx, type] = animations[i];
        const barStyle1 = (arrayBars[bar1Idx] as HTMLElement).style;
        const barStyle2 = (arrayBars[bar2Idx] as HTMLElement).style;
        switch (type) {
            case 0:
                setTimeout(() => {
                    barStyle1.backgroundColor = 'red';
                    barStyle2.backgroundColor = 'red';
                }, i * ANIMATION_SPEED);
                break;
            case 1:
                setTimeout(() => {
                    barStyle1.backgroundColor = 'black';
                    barStyle2.backgroundColor = 'black';
                }, i * ANIMATION_SPEED);
                break;
            case 2:
                setTimeout(() => {
                    barStyle1.backgroundColor = 'green';
                    barStyle2.backgroundColor = 'green';
                }, i * ANIMATION_SPEED);
                break;
            case 3:
                setTimeout(() => {
                    barStyle1.height = `${array[bar1Idx] / 2}px`;
                    barStyle2.height = `${array[bar2Idx] / 2}px`;
                }, i * ANIMATION_SPEED);
                break;
            default:
                break;
        }
    }
}

const bubbleSort = (arr: number[]): number[][] => {
    const animations: number[][] = [];
    if (arr.length <= 1) return animations;
    bubbleHelper(arr, animations)
    return animations;
};

const bubbleHelper = (
    arr: number[],
    animations: number[][]
): void => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            animations.push([j, j + 1, 0]); // 0 = comparision red
            animations.push([j, j + 1, 1]); // 1 = revert black
            if (arr[j] > arr[j + 1]) {
                animations.push([j, j + 1, 2]); //2 = swap
                animations.push([j, j + 1, 3]); // 3 = heights
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
            animations.push([j, i, 1]); // revert black
        }
    }
}