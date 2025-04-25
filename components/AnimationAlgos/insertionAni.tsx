// Create an animation array that stores pairs of indices and a specific number that corresponds to a case animations[[i, j, num]]
// Do Insertion sort and add important parts of it (compare, swap) to animations array, used to change specific colors and heights
export const insertAnimationcode = (array: number[], ANIMATION_SPEED: number) => {
    const animations = insertionSort(array)
    console.log(array)
    const arrayBars = document.getElementsByClassName('arrayBars');
    for (let i = 0; i < animations.length; i++) {
        const [bar1Idx, bar2Idx, type] = animations[i];
        const barStyle1 = (arrayBars[bar1Idx] as HTMLElement).style;
        const barStyle2 = (arrayBars[bar2Idx] as HTMLElement).style;
        switch (type) {
            case 0:
                setTimeout(() => {
                    barStyle2.backgroundColor = 'green';
                }, i * ANIMATION_SPEED);
                break;
            case 1:
                setTimeout(() => {
                    barStyle1.backgroundColor = 'red';
                }, i * ANIMATION_SPEED);
                break;
            case 2:
                setTimeout(() => {
                    barStyle1.backgroundColor = 'black';
                    barStyle2.backgroundColor = 'black';
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



const insertionSort = (arr: number[]): number[][] => {
    const animations: number[][] = [];
    if (arr.length <= 1) return animations;
    insertionHelper(arr, animations);
    return animations;
}

const insertionHelper = (
    arr: number[],
    animations: number[][],
): void => {

    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        animations.push([i, i, 0]) // green i
        while (j >= 0 && arr[j] > key) {
            animations.push([j, j, 1]) // red j
            animations.push([j + 1, j, 3]) // 3 = heights
            arr[j + 1] = arr[j];
            animations.push([j, j, 2]) //revert black
            j--;
        }
        animations.push([j + 1, i, 2]) //black j i
        arr[j + 1] = key;
    }
}