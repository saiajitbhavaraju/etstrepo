// Create an animation array that stores pairs of indices and a specific number that corresponds to a case animations[[i, j, num]]
// Do Insertion sort and add important parts of it (compare, swap) to animations array, used to change specific colors and heights
export const quickSortAnimationcode = (array:number[], ANIMATION_SPEED:number) : void => {
    console.log('Original Array:', array);

    const animations = quickSort(array);
    const arrayBars = document.getElementsByClassName('arrayBars');

    for (let i = 0; i < animations.length; i++) {
      const [bar1Idx, bar2Idx, type] = animations[i];

      const barStyle1 = (arrayBars[bar1Idx] as HTMLElement).style;
      const barStyle2 = (arrayBars[bar2Idx] as HTMLElement).style;

      switch (type) {
        case 0: // Comparison (highlight red)
          setTimeout(() => {
            barStyle1.backgroundColor = 'red';
            barStyle2.backgroundColor = 'red';
          }, i * ANIMATION_SPEED);
          break;

        case 1: // Revert (change back to black)
          setTimeout(() => {
            barStyle1.backgroundColor = 'black';
            barStyle2.backgroundColor = 'black';
          }, i * ANIMATION_SPEED);
          break;

        case 2: // Swap (highlight green)
          setTimeout(() => {
            barStyle1.backgroundColor = 'green';
            barStyle2.backgroundColor = 'green';
          }, i * ANIMATION_SPEED);
          break;

        case 3: // Update heights
          setTimeout(() => {
            barStyle1.height = `${array[bar1Idx] / 2}px`;
            barStyle2.height = `${array[bar2Idx] / 2}px`;
          }, i * ANIMATION_SPEED);
          break;

        default:
          break;
      }
    }

    console.log('Sorted Array:', array);
  }

const quickSort = (arr: number[]): number[][] => {
const animations: number[][] = [];
if (arr.length <= 1) return animations;

quickHelper(arr, 0, arr.length - 1, animations); //arr, low, high, animations
return animations;
};

const quickHelper = (
arr: number[],
low: number,
high: number,
animations: number[][]
): void => {
if (low < high) {
  const pivotIndex = partition(arr, low, high, animations);
  quickHelper(arr, low, pivotIndex - 1, animations);
  quickHelper(arr, pivotIndex + 1, high, animations);
}
};

const partition = (
arr: number[],
low: number,
high: number,
animations: number[][]
): number => {
const pivot = arr[high]; // Last element as the pivot
let i = low - 1; // Smaller index

for (let j = low; j < high; j++) {
  // Highlight the elements being compared
  animations.push([j, high, 0]); // 0 = comparison (red)
  animations.push([j, high, 1]); // 1 = revert (black)

  if (arr[j] < pivot) {
    i++;
    // Highlight the elements being swapped
    animations.push([i, j, 2]); // 2 = swap (green)
    animations.push([i, j, 3]); // 3 = update heights

    // Swap elements
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Place the pivot in its correct position
animations.push([i + 1, high, 2]); // 2 = swap (green)
animations.push([i + 1, high, 3]); // 3 = update heights

// Swap the pivot with the element at i + 1
[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

return i + 1; // Return the pivot index
};