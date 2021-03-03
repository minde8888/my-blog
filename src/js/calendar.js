import axios from 'axios';
import Api from './api';


class Calendar {

    constructor(target) {

        this.target = target;
        this.DOM = null;
        this.date = new Date();
        this.y = this.date.getFullYear(), this.m = this.date.getMonth(), this.d = this.date.getDay(), this.day = this.date.getDate();
        this.lastDayM = new Date(this.y, this.m + 1, 0).getDate();
        let days = this.lastDayM;
        this.curentM = new Date(this.y, this.m + 1, 0).getMonth();
        this.curentDay = new Date(this.y, this.curentM, 1).getDay();
        let startDay = this.curentDay;
        this.dayToday = new Date(this.y, this.m, this.day);
        this.months = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
        this.init(days, startDay);
    }

    init(lastDayM, startDay) {
        const DOM = document.querySelector(this.target);
        if (DOM) {
            let a = 1;
            const lastMth = document.getElementById("calendar-month-last");
            const nextMth = document.getElementById("calendar-month-next");

            lastMth.addEventListener("click", () => {
                a = a - 1;
                this.month(a);
            });

            nextMth.addEventListener("click", () => {
                a = a + 1;
                this.month(a);
            });

            this.render(lastDayM, startDay);
        }
    }

    render(lastDayM, curentDay, dataDate) {

        let today = this.date;

        if (curentDay == 0) {
            curentDay = 7;
        }

        const calendarDays = document.getElementById("dates");
        const exisitClassMonth = document.querySelector(".cview__month-current").textContent;

        if (exisitClassMonth == 1) {
            let nowM = this.m;
            let nowY = this.y;
            nowM = this.months[nowM];
            document.getElementById("calendar-month").innerHTML = nowY + ' ' + nowM;
        }

        const check = document.querySelectorAll(".cview--spacer");
        const check1 = document.querySelectorAll(".cview--date");

        if (check.length == 0 && check1.length == 0) {

            for (let i = 0; i < curentDay - 1; i++) {

                const spacer = document.createElement("div");
                spacer.className = "cview--spacer";
                calendarDays.appendChild(spacer);
            }
            for (let d = 1; d <= lastDayM; d++) {

                let _date = new Date(this.y, this.m, d);
                const day = document.createElement("div");
                day.className = "cview--date";
                day.textContent = d;
                day.setAttribute("data-date", _date);

                if (d == today.getDate() && this.y == today.getFullYear() && this.m == today.getMonth()) {
                    day.classList.add("today");
                }
                calendarDays.appendChild(day);
            }
        } else {
            Array.from(document.querySelectorAll('.cview--spacer')).forEach(el => el.remove());
            Array.from(document.querySelectorAll('.cview--date')).forEach(el => el.remove());

            for (let x = 0; x < curentDay - 1; x++) {

                const spacer = document.createElement("div");
                spacer.className = "cview--spacer";
                calendarDays.appendChild(spacer);
            }

            for (let d = 1; d <= lastDayM; d++) {
                dataDate.setDate(d);
                const day = document.createElement("div");
                day.className = "cview--date";
                day.textContent = d;
                day.setAttribute("data-date", dataDate);

                calendarDays.appendChild(day);

            }
            const aadToday = new Date(this.y, this.m, this.date.getDate());
            const isToday = document.querySelectorAll(".cview--date");

            for (let i = 0; i < isToday.length; i++) {
                if (isToday[i].dataset.date == aadToday) {

                    isToday[i].classList.add("today");
                }
            }
        }
        this.renderEvents();
    }

    month(a) {
        const curentMth = document.getElementById("calendar-month");

        let dataDate = new Date(this.y, this.m + a - 1);
        let y = this.date.getFullYear(),
            m = this.date.getMonth();
        let curentY = new Date(y, this.date.getMonth() + a, 0).getFullYear();
        let curM = this.months[new Date(y, this.date.getMonth() + a, 0).getMonth()];
        curentMth.innerHTML = curentY + ' ' + curM;

        let lastDayM = new Date(y, m + a, 0).getDate();

        let newM = new Date(y, m + a, 0).getMonth();
        let startDay = new Date(curentY, newM, 1).getDay();

        this.render(lastDayM, startDay, dataDate);
    }

    renderEvents() {
        let path = WPURLS.apiUrl;
        axios.post(path + 'calendar-create-front', {

            })
            .then(function(response) {
                if (response.status == 200 && response.statusText == 'OK') {
                    let call = new Calendar();
                    let date = new Date(call.y, call.m, call.day);
                    const data = response.data.allData;
                    let dayEvents = document.querySelectorAll(".cview--date");

                    let keys = [];

                    for (let key in data) {
                        keys.push(key);
                    }

                    for (let i = 0; i < dayEvents.length; i++) {
                        for (let j = 0; j < keys.length; j++) {
                            if (data[keys[j]].event_date == dayEvents[i].dataset.date &&
                                "cview--date today" != dayEvents[i].className) {
                                dayEvents[i].classList.add("daysEvent");
                            }
                        }
                    }
                    const eventTime = document.querySelector(".events")
                    const events = document.querySelectorAll(".daysEvent");
                    const clickE = document.querySelector(".clickToday");
                    const allEvents = document.querySelector(".nearestEvent");
                    const event = document.querySelector(".todayEvents");
                    const today = document.querySelector(".today");
                    const eTime = document.querySelector(".eTime");

                    if (today) {
                        today.classList.add("clickEvent");
                    }

                    let y = [];
                    HTML = "";
                    let HTML1 = "";
                    let count = 0;

                    for (let d = 0; d < keys.length; d++) {
                        let value = data[keys[d]];

                        if (value.event_date == date) {
                            count++;
                            HTML += `<span>${value.event_time}</span><div>${value.event_description}</div>`;
                        }
                        if (count < 2 && value.event_date == date && !eTime) {
                            HTML1 = `<div class="eTime">ŠIANDIENOS ĮVYKIAI (${value.event_time}):</div>`;
                        }
                    }
                    eventTime.insertAdjacentHTML('afterbegin', HTML1);
                    event.innerHTML = HTML;

                    for (let i = 0; i < events.length; i++) {

                        events[i].addEventListener(
                            "click",
                            e => {
                                HTML = "";
                                HTML1 = "";
                                let counter = 0;
                                let newData = [];

                                for (let k = 0; k < keys.length; k++) {

                                    if (events[i].dataset.date == data[keys[k]].event_date) {
                                        newData[k] = data[keys[k]];
                                    }
                                }
                                let newValues = call.sort(newData);
                                let v = [];
                                for (let key in newValues) {
                                    v.push(key);
                                }
                                for (let j = 0; j < v.length; j++) {
                                    counter++;
                                    HTML += `<span>${newValues[j].event_time}</span><div>${ newValues[j].event_description}</div>`;

                                    if (counter != 0 && counter <= 1) {
                                        HTML1 = `<span id="eTimeClick">(${ newValues[j].event_time}):</span>`;
                                    }
                                    clickE.innerHTML = HTML;
                                }
                            });
                    }
//isrusioti pagal valandas----------------------------------------------------------//
                    let a = [];
                    let HTML = '';
                    y = call.sortObject(keys, data);
                    for (let key in y) {
                        a.push(y);
                    }
                    for (let i = 0; i < a.length; i++) {
                        if (i == 3) break;
                        HTML += `<span>${y[i].event_time}</span><div>${y[i].event_description}</div>`;
                    }

                    allEvents.innerHTML = HTML;
                    if (today) {
                        today.addEventListener(
                            "click",
                            e => {
                                let action = [];
                                for (let k = 0; k < keys.length; k++) {
                                    if (today.dataset.date == data[keys[k]].event_date) {
                                        action[k] = data[keys[k]];
                                    }
                                }
                                let k = [];
                                let HTML = '';
                                let newValue = call.sort(action);
                                for (let key in action) {
                                    k.push(key);
                                }

                                for (let s = 0; s < k.length; s++) {
                                    if (today.dataset.date == newValue[s].event_date) {
                                        HTML += `<span>${newValue[s].event_time}</span><div>${newValue[s].event_description}</div>`;
                                    }
                                }
                                clickE.innerHTML = HTML;
                            });
                    }
                }
            }).catch(function(error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error);
            });
    }

    sort(action) {
        return action.sort((a, b) => (a.event_date > b.event_date) ? 1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? 1 : -1) : -1);
    }

    sortObject(keys, action) {

        let a = 0;
        let start = true;
        let daysCheck = 0;
        let newDate = [];

        while (start) {

            let addDay = new Date(this.y, this.m, this.day + a++);

            daysCheck++;

            if (daysCheck == 30) {
                start = false;
            }

            for (let i = 0; i < keys.length; i++) {

                if (addDay == action[keys[i]].event_date &&
                    this.dayToday != action[keys[i]].event_date) {
                    newDate.push(action[keys[i]]);
                }
            }

        }
        return newDate;
    }
}

export default Calendar;