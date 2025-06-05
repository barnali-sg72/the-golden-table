import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from './components/BookingForm';
import {initializeTimes, updateTimes} from "./components/Main";
import { BrowserRouter } from "react-router-dom";

test('Initialize the available times list', () => {
    //let times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    expect(initializeTimes()).toBeInstanceOf(Array);
    expect(initializeTimes()).not.toHaveLength(0);
})

test('Checks the reducer function', () => {
    let state = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    let date = "06/13/2024";
    expect(updateTimes(state, date)).toBeInstanceOf(Array);
    expect(updateTimes(state, date)).not.toHaveLength(0);
})

test('Write to local storage', () => {
    let arr = [{
        "customerName": "Betty Carter",
        "date": "2024-06-25",
        "time": "18:00",
        "guests": "3",
        "occasion": "Birthday",
        "area": "Indoor"
    }];

    let data = localStorage.setItem("RESERVATIONS", JSON.stringify(arr));
    let val = JSON.parse(localStorage.getItem("RESERVATIONS"));

    expect(data).not.toBeNull();
    expect(val).toHaveLength(1);
})


test('Read from local storage', () => {
    let arr = [{
        "customerName": "Betty Carter",
        "date": "2024-06-25",
        "time": "18:00",
        "guests": "3",
        "occasion": "Birthday",
        "area": "Indoor"
    }];

    let data = localStorage.getItem("RESERVATIONS");
    let val = JSON.parse(localStorage.getItem("RESERVATIONS"));

    expect(data).not.toBeNull();
    expect(val).toHaveLength(1);
    expect(val).toEqual(arr);
})

