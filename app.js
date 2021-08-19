//calendar




var monthSelected = document.querySelector('#months').value;
var yearSelected = document.querySelector('#years').value;

var monthYear = document.querySelector('.MY');


const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// In case of feb(28days), there is a chance for the last row to be empty
// so think about adding rows and cell
var selectDate; //selected Date with global scope
const createCal = (month, year) => {
    // think of changing months.
    const tableBody = document.querySelector('#calendar-body');
    let firstDay = (new Date(year, month, 1)).getDay();
    let totDays = (new Date(year, month + 1, 0)).getDate();

    let date = 1;
    //to clear the table 
    tableBody.innerHTML = "";
    document.querySelector('.MY').textContent = monthList[month] + ' ' + year;

    document.querySelector('#months').value = month;
    document.querySelector('#years').value = year;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) { //day indexing 0 to 6
            if (i == 0 && j < firstDay) {
                let cell = document.createElement('td');
                cell.textContent = '';
                row.appendChild(cell);
            } else if (date > totDays) { //to avoid, empty add. cells
                break;
            } else {
                let cell = document.createElement('td');
                cell.textContent = date;

                if (date == (new Date()).getDate() && month == (new Date()).getMonth() && year == (new Date()).getFullYear()) {

                    cell.classList.add('highDate');
                }
                date += 1;
                row.appendChild(cell);
            }


            tableBody.appendChild(row);
        }

    }
    //todoPage to calendar page
    backBtn = document.querySelector('#backbtn');
    backBtn.addEventListener('click', function() {
        todoPage = document.querySelector('.todoList');

        const todoBody = document.querySelector('.TodoBody');
        todoBody.innerHTML = '';
        todoPage.style.animation = 'todoPageOff 500ms 1';
        setTimeout(() => { todoPage.style.display = 'none'; }, 500);
        document.querySelector('#inTodo').value = '';
        document.querySelector('.planner').style.pointerEvents = 'all';
        const userProf = document.querySelector('#userProf');
        var todPending = document.querySelector('#todPending');
        const curDate = new Date();

        let selectDate = userProf.childNodes[0].innerHTML + ' ' + curDate.getDate() + ' ' + document.querySelector('.MY').textContent;

        let todoContent = localStorage.getItem(selectDate);
        var todoData = document.createElement('div');

        if (todoContent != undefined) {
            let data = localStorage.getItem(selectDate);
            //console.log(data);
            let A = JSON.parse(data);
            for (let i = 0; i < A.length; i++) {
                if (A[i][3] == -1) {
                    todoData.innerHTML += '<div class="todContainer">' + `<div><b>Deadline- ${A[i][1]}:${A[i][2]}</b></div>` + '<div>' + '<span>' + A[i][0] + '</span>' + '</div>' + '</div>'
                    todPending.appendChild(todoData);
                }
            }

        }
        /*
        tds = Array.from(document.querySelectorAll('td'));
        tds.forEach((value)=>{
        value.style.border = 'none';
        });*/
    });
    document.querySelector('#todPending').style.display = 'none'
    const todTaskBtn = document.querySelector('#todBtn')
    todTaskBtn.addEventListener('click', () => {
            if (document.querySelector('#todPending').style.display == 'none') {
                document.querySelector('#todPending').style.display = 'block'
            } else {
                document.querySelector('#todPending').style.display = 'none'
            }
        })
        //todo list of the current date should be displayed initially

    tds = Array.from(document.querySelectorAll('td'));

    // check the scope of selectDate

    //Calendar page to todoPage







    var todoBody = document.querySelector('.TodoBody');
    var delBtns;
    tds.map(td => {

        if (td.textContent != "") {
            td.addEventListener('click', () => {
                document.querySelector('.planner').style.pointerEvents = 'none';
                //todo page entry
                document.querySelector('.todoList').style.animation = 'todoPage 400ms 1';

                tds.forEach((value) => {
                    value.style.border = 'none'; //check once
                });
                //highlighting the date clicked
                td.style.border = '2px solid rgb(43, 39, 39)';

                //clearing the todo body everytime entering 
                todoBody.innerHTML = "";


                //displaying the data after clicking the date

                tds = Array.from(document.querySelectorAll('td'));

                tds.map(td => {

                    if (td.style.border == '2px solid rgb(43, 39, 39)') {
                        const userProf = document.querySelector('#userProf');
                        userProf.childNodes[0].innerHTML
                        selectDate = userProf.childNodes[0].innerHTML + ' ' + td.innerHTML + ' ' + document.querySelector('.MY').textContent;
                        todoDate = td.innerHTML + ' ' + document.querySelector('.MY').textContent;
                    }
                });
                document.querySelector('#todoDate').innerHTML = todoDate;

                let todoContent = localStorage.getItem(selectDate);


                if (todoContent != undefined) {
                    let data = localStorage.getItem(selectDate);
                    let A = JSON.parse(data);


                    for (let i = 0; i < A.length; i++) { //check once again
                        if (A[i] != "") {
                            todoData = document.createElement('div');
                            let curDate = new Date()
                            let calMonth = document.querySelector('#months').value;
                            let calYear = document.querySelector('#years').value
                            if (curDate.getDate() == td.textContent && curDate.getMonth() == calMonth && curDate.getFullYear() == calYear) {
                                if (A[i][3] == -1) {
                                    todoData.style.background = 'rgb(252, 98, 98)'
                                } else if (A[i][3] == 1) {
                                    todoData.style.background = 'rgb(104, 235, 68)'
                                }
                                const curTimeArr = document.querySelector('.clock').textContent.split(':')
                                let curHour = curTimeArr[0];
                                let curMin = curTimeArr[1];
                                const secArr = curTimeArr[2].split(' ')
                                let APM = secArr[1];
                                if (APM == 'PM') {
                                    curHour = parseInt(curHour) + 12
                                }
                                //console.log(curHour, A[i][1]);
                                //console.log(curMin, A[i][2]);
                                //console.log((curHour > A[i][1]) || (curHour == A[i][1] && curMin > A[i][2]), 168)
                                if (A[i][3] != 1) {
                                    if ((curHour > A[i][1]) || (curHour == A[i][1] && curMin > A[i][2])) {
                                        todoData.style.background = 'rgb(252, 98, 98)'
                                        A[i][3] = -1
                                        localStorage.setItem(selectDate, JSON.stringify(A));
                                    } else {
                                        A[i][3] = 0;
                                    }
                                }
                            }


                            todoData.innerHTML = `<div><b>Deadline- ${A[i][1]}:${A[i][2]}</b></div>` + '<div>' + '<span>' + A[i][0] + '</span>' + '<span>' + '<button id="checkBtn">' + '<i class="fas fa-check-circle"></i>' + '</button>' + '<button id="delBtn">' + '<i class="far fa-trash-alt"></i>' + '</button>' + '</span>' + '</div>'
                            todoBody.appendChild(todoData);
                        }
                    }
                }



                todoPage = document.querySelector('.todoList');
                todoPage.style.display = 'flex';

                // highlighting the date selected
                td.style.border = '2px solid rgb(43, 39, 39)';
                //adding todolist for the date chosen
                addTodoBtn = document.querySelector('#addTodo');
                addTodoBtn.addEventListener('click', () => {
                    const todoBody = document.querySelector('.TodoBody');



                    let inputData = document.querySelector('#inTodo').value;
                    let inputTime = document.querySelector('#inTime').value;

                    if (inputData && inputTime) {
                        let over = 0;
                        //think of appending the data
                        let inputTimeArr = inputTime.split(':')
                        let inputHour = inputTimeArr[0]
                        let inputMin = inputTimeArr[1]
                        let todoData = document.createElement('div')
                            //console.log(document.querySelector('.clock').textContent)
                        const curTimeArr = document.querySelector('.clock').textContent.split(':')
                        let curHour = curTimeArr[0];
                        let curMin = curTimeArr[1];
                        const secArr = curTimeArr[2].split(' ')
                        let APM = secArr[1];
                        if (APM == 'PM') {
                            curHour = parseInt(curHour) + 12
                        }
                        //console.log(curHour, inputHour);
                        //console.log(curMin, inputMin);
                        //console.log((curHour > inputHour) || (curHour == inputHour && curMin > inputMin), 168)
                        if ((curHour > inputHour) || (curHour == inputHour && curMin > inputMin)) {
                            todoData.style.background = 'rgb(252, 98, 98)'
                            over = 1;
                        }
                        todoData.innerHTML = `<div><b>Deadline- ${inputHour}:${inputMin}</b></div>` + '<div>' + '<span>' + inputData + '</span>' + '<span>' + '<button id="checkBtn">' + '<i class="fas fa-check-circle"></i>' + '</button>' + '<button id="delBtn">' + '<i class="far fa-trash-alt"></i>' + '</button>' + '</span>' + '</div>'
                        todoBody.insertBefore(todoData, todoBody.childNodes[0]);

                        //animation
                        todoData.style.position = 'relative';
                        todoData.style.animation = 'addInput 500ms 1';


                        if (localStorage.getItem(selectDate) != null) {
                            let data = localStorage.getItem(selectDate);
                            let A = JSON.parse(data);



                            if (over == 1) {
                                A.unshift([inputData, inputHour, inputMin, -1]);
                            } else {

                                A.unshift([inputData, inputHour, inputMin, 0]);
                            }
                            localStorage.setItem(selectDate, JSON.stringify(A));

                        } else {
                            let k = [];
                            if (over == 1) {
                                k.push([document.querySelector('#inTodo').value, inputHour, inputMin, -1]);
                            } else {
                                k.push([document.querySelector('#inTodo').value, inputHour, inputMin, 0]);
                            }

                            //console.log(JSON.stringify(k));
                            localStorage.setItem(selectDate, JSON.stringify(k));
                        }

                    }
                    document.querySelector('#inTodo').value = '';
                    document.querySelector('#inTime').value = '';
                    const checkBtn = Array.from(document.querySelectorAll('#checkBtn'))
                    checkBtn.map(btn => {
                            btn.addEventListener('click', () => {
                                //console.log('check btn clicked');
                                let parentDiv = btn.parentElement;
                                //console.log(parentDiv)
                                checkTodo = parentDiv.parentElement.children[0].textContent;
                                //console.log(checkTodo)
                                parentDiv.parentElement.parentElement.style.background = 'rgb(104, 235, 68)'



                                tds = Array.from(document.querySelectorAll('td'));
                                //How to get rid of td? try to give select Date global scope
                                tds.map(td => {
                                    if (td.style.border == '2px solid rgb(43, 39, 39)') {
                                        const userProf = document.querySelector('#userProf');

                                        selectDate = userProf.childNodes[0].innerHTML + ' ' + td.innerHTML + ' ' + document.querySelector('.MY').textContent;

                                    }
                                });
                                let data = localStorage.getItem(selectDate);
                                let A = JSON.parse(data);
                                //console.log(A);
                                //removing the data from the local storage

                                for (i = 0; i < A.length; i++) {
                                    if (A[i][0] == checkTodo) {
                                        A[i][3] = 1
                                        break;
                                    }
                                }


                                localStorage.setItem(selectDate, JSON.stringify(A));
                            })
                        })
                        // Avoid repeating this part.
                    delBtns = Array.from(document.querySelectorAll('#delBtn'));
                    delBtns.map(btn => {

                        btn.addEventListener('click', () => {

                            //console.log('Del btn clicked');
                            let parentDiv = btn.parentElement;
                            //console.log(parentDiv)
                            delTodo = parentDiv.parentElement.children[0].textContent;
                            //console.log(delTodo)
                            parentDiv.parentElement.parentElement.style.animation = 'delInput 500ms 1';

                            //removing the div element from the todo list
                            setTimeout(() => { parentDiv.parentElement.parentElement.remove(); }, 500);


                            tds = Array.from(document.querySelectorAll('td'));
                            //How to get rid of td? try to give select Date global scope
                            tds.map(td => {
                                if (td.style.border == '2px solid rgb(43, 39, 39)') {
                                    const userProf = document.querySelector('#userProf');

                                    selectDate = userProf.childNodes[0].innerHTML + ' ' + td.innerHTML + ' ' + document.querySelector('.MY').textContent;

                                }
                            });
                            let data = localStorage.getItem(selectDate);
                            let A = JSON.parse(data);

                            //removing the data from the local storage

                            delIndex = A.indexOf(delTodo);
                            //console.log(delIndex);
                            A.splice(delIndex, 1);
                            localStorage.setItem(selectDate, JSON.stringify(A));

                            todoContent = localStorage.getItem(selectDate);
                            const todoBody = document.querySelector('.TodoBody');



                        });

                    });
                });
                const checkBtn = Array.from(document.querySelectorAll('#checkBtn'))
                checkBtn.map(btn => {
                        btn.addEventListener('click', () => {
                            //console.log('check btn clicked');
                            let parentDiv = btn.parentElement;
                            //console.log(parentDiv)
                            checkTodo = parentDiv.parentElement.children[0].textContent;
                            //console.log(checkTodo)
                            parentDiv.parentElement.parentElement.style.background = 'rgb(104, 235, 68)'



                            tds = Array.from(document.querySelectorAll('td'));
                            //How to get rid of td? try to give select Date global scope
                            tds.map(td => {
                                if (td.style.border == '2px solid rgb(43, 39, 39)') {
                                    const userProf = document.querySelector('#userProf');

                                    selectDate = userProf.childNodes[0].innerHTML + ' ' + td.innerHTML + ' ' + document.querySelector('.MY').textContent;

                                }
                            });
                            let data = localStorage.getItem(selectDate);
                            let A = JSON.parse(data);
                            //console.log(A);
                            //removing the data from the local storage

                            for (i = 0; i < A.length; i++) {
                                if (A[i][0] == checkTodo) {
                                    A[i][3] = 1
                                    break;
                                }
                            }


                            localStorage.setItem(selectDate, JSON.stringify(A));
                        })
                    })
                    //avoid repeating this part
                    //console.log(document.querySelectorAll('#delBtn'));

                delBtns = Array.from(document.querySelectorAll('#delBtn'));
                delBtns.map(btn => {
                    //console.log(btn);
                    btn.addEventListener('click', () => {

                        //console.log('Del btn clicked');
                        let parentDiv = btn.parentElement;
                        //console.log(parentDiv)
                        delTodo = parentDiv.parentElement.children[0].textContent;
                        //console.log(delTodo)
                        parentDiv.parentElement.parentElement.style.animation = 'delInput 500ms 1';

                        //removing the div element from the todo list
                        setTimeout(() => { parentDiv.parentElement.parentElement.remove(); }, 500);


                        tds = Array.from(document.querySelectorAll('td'));
                        //How to get rid of td? try to give select Date global scope
                        tds.map(td => {
                            if (td.style.border == '2px solid rgb(43, 39, 39)') {
                                const userProf = document.querySelector('#userProf');

                                selectDate = userProf.childNodes[0].innerHTML + ' ' + td.innerHTML + ' ' + document.querySelector('.MY').textContent;

                            }
                        });
                        let data = localStorage.getItem(selectDate);
                        let A = JSON.parse(data);

                        //removing the data from the local storage

                        delIndex = A.indexOf(delTodo);
                        //console.log(delIndex);
                        A.splice(delIndex, 1);
                        localStorage.setItem(selectDate, JSON.stringify(A));

                        todoContent = localStorage.getItem(selectDate);
                        const todoBody = document.querySelector('.TodoBody');



                    });

                });
            });

        }



    });

}





var curMonth = (new Date()).getMonth();
var curYear = (new Date()).getFullYear();
//calendar on current month
createCal(curMonth, curYear);

const nextMonth = () => {
    curMonth += 1;


    if (curMonth == 12) {
        curMonth = 0;
        curYear += 1;
    }
    createCal(curMonth, curYear);
    //console.log(curMonth);
}
const prevMonth = () => {
    curMonth -= 1;
    if (curMonth == -1) {
        curMonth = 11;
        curYear -= 1;
    }
    //console.log(curMonth)
    createCal(curMonth, curYear);
}
const dropChange = () => {
    let month = document.querySelector('#months').value;
    let year = document.querySelector('#years').value;
    //console.log(typeof(month));
    //console.log(typeof(year));
    createCal(parseInt(month), parseInt(year));
}