"use client";

import { useState, useEffect, useCallback } from 'react';
import { mergeAnimationcode } from '@/components/AnimationAlgos/mergeAni';
import { quickSortAnimationcode } from "@/components/AnimationAlgos/quickAni";
import { bubbleAnimationcode } from "@/components/AnimationAlgos/bubbleAni";
import { insertAnimationcode } from "@/components/AnimationAlgos/insertionAni";
import { useRouter } from "next/navigation";

const ANIMATION_SPEED: number = 1;

export default function SorterMain() {
    const router = useRouter();
    //Array declaration
    const [array, setArray] = useState<number[]>([]);
    const generateArray = (length: number) => {
      return Array.from({ length }, () => Math.floor(Math.random() * (1000)));
    };

    //Reset array function
    const reset = useCallback(() => {
      const newArray = generateArray(200);
      setArray(newArray);
      console.log(newArray);
    }, []);
    useEffect(() => { reset(); }, [reset]);
  
    //Sorting animations
    function mergeAnimation() {
        mergeAnimationcode(array, ANIMATION_SPEED)
    }
    function quickSortAnimation() {
        quickSortAnimationcode(array, ANIMATION_SPEED)
    }
    function bubbleAnimation() {
        bubbleAnimationcode(array, ANIMATION_SPEED)
    }
  
    function insertAnimation() {
        insertAnimationcode(array, ANIMATION_SPEED)
    }

    //return Main div
    return (
      <div className="">
        <div className="title flex flex-col py-5 items-center gap-2">
          <h1 className="flex justify-center">Sorting algorithms visualiser</h1>
          
        </div>
        <div className="page flex flex-col min-h-screen items-center my-5">
          <div className="arrayContainer flex w-full items-end h-[70vh] gap-[1px] justify-center ">
            {
              array.map((value: number, index: number) => (
                <div key={index}>
                  <div className="arrayBars bg-black items-center justify-center min-w-1 my-2 mx-0.25 inline-block"
                    style={{ height: `${value / 2}px`, width: `${1}px` }}
                  >
                  </div>
                </div>
              ))
            }
          </div>
          <div className="buttons flex justify-center gap-3 py-1">
            <button onClick={reset}>Gen array</button>
            <button onClick={mergeAnimation}>Merge sort</button>
            <button onClick={quickSortAnimation}>Quick sort</button>
            <button onClick={bubbleAnimation}>Bubble sort</button>
            <button onClick={insertAnimation}>Insertion sort</button>
          </div>
          <div className="back">
            <button onClick={() => router.push('/')}>Back to Homepage</button>
          </div>
        </div>
      </div>
    );
}