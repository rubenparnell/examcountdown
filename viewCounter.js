import {CounterAPI} from "counterapi";

const counter = new CounterAPI();

counter.up("examcountdown", "views").then((res) => {
    console.log(res)
})