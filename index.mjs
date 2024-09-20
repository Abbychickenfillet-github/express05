// 有時候esm跟commonjs會混著寫module不能指定mjs(es6)
// import data from "./singers.json" assert {type: "json"};
// // 沒辦法在import這句作解構賦值

import {readFile} from "node:fs/promises";

const data=await readFile("./singers.json","utf-8");
// 跟用toString轉出來結果是一樣
// readFile讀進來是純文字
console.log(JSON.parse(data));

const {singers} = JSON.parse(data)
console.log(singers);
// 現在的結果是promise的狀態，我們要等他有結果，所以要加上await

