'use strict';

{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();  

    // 前月分の日付を取得する
    function  getCalendarHead(){
        const dates = [];
        const d = new Date(year, month, 0).getDate(); //前月の末日
        const n = new Date(year, month, 1).getDay(); //今月1日の曜日（日曜日が0）

        for(let i = 0;i < n;i++ ){
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });
        }

        return dates;
    }

    // 来月分の日付を取得する
    function getCalendarTail(){
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDay();

        for(let i=1; i < 7 - lastDay; i++){
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            })
        }
        return dates; //値を返す console.logは表示するだけ
    }

    function getCalendarBody(){
        const dates = []; //dates:日付, day:曜日
        // 末日 = 翌月1日の1日前 = 翌月の0日目
        const lastDate = new Date(year, month + 1, 0).getDate();

        for(let i = 1; i <= lastDate; i++){
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }
        if (year === today.getFullYear() && month === today.getMonth()){
            dates[today.getDate() - 1].isToday = true;
        }
        return dates;
    }

    function clearCalendar() {
        const tbody = document.querySelector('tbody');
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }
    }
    function renderTitle(){
        const title = `${year}/${String(month + 1).padStart(2, '0')}`;
        document.getElementById('title').textContent = title;
    }
    function renderWeeks(){
        const dates = [
            // スプレッド構文
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),
        ];
        // 週ごとに配列を作る
        const weeks = [];
        const weeksCount = dates.length / 7;
    
        for(let i = 0; i < weeksCount; i++){
            // 配列から要素を削除して取得する
            weeks.push(dates.splice(0, 7));
        }
        
        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');
    
                td.textContent = date.date;
                if(date.isToday){
                    td.classList.add('today');
                }
                if(date.isDisabled){
                    td.classList.add('disabled');
                }
                tr.appendChild(td);
            });
            document.querySelector('tbody').appendChild(tr);
        });
    }

    function createCalendar(){
        clearCalendar();
        renderTitle();
        renderWeeks();
    }

    document.getElementById('prev').addEventListener('click', ()=>{
        month--;
        if(month<0){
            year--;
            month = 11;
        }

        createCalendar();
    });
    document.getElementById('next').addEventListener('click', ()=>{
        month++;
        if(month>11){
            year++;
            month = 0;
        }

        createCalendar();
    });
    document.getElementById('today').addEventListener('click', ()=>{
        year = today.getFullYear();
        month = today.getMonth();
        createCalendar();
    });

    createCalendar();
}