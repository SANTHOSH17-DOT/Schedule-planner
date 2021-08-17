const AC = document.querySelector('.swap-aclock');
const DC = document.querySelector('.swap-dclock');
var whichCk = 0;
var canvasA = document.querySelector('#canvas1');
var ctxA = canvasA.getContext('2d');
var radius = canvasA.height / 2;
ctxA.translate(radius, radius);
radius = radius * 0.9;

var hour1 = (new Date()).getHours();
var hourMA = hour1;
var min1 = (new Date()).getMinutes();
var minMA = min1;
var sec1 = (new Date()).getSeconds();
var secMA = sec1;

//hour
const incrsH = document.querySelector('.arrowH').childNodes[3].childNodes[1];

incrsH.addEventListener('click', function() {

    incrVal = parseInt(document.querySelector('.arrowH').childNodes[1].textContent);
    if (incrVal < 23) {
        if (incrVal > 8) {
            document.querySelector('.arrowH').childNodes[1].textContent = incrVal + 1;
        } else {
            document.querySelector('.arrowH').childNodes[1].textContent = 0 + (incrVal + 1).toString();
        }

    }

});
const decrH = document.querySelector('.arrowH').childNodes[3].childNodes[3];

decrH.addEventListener('click', function() {

    decrVal = parseInt(document.querySelector('.arrowH').childNodes[1].textContent);
    if (decrVal > 0) {
        if (decrVal > 8) {
            document.querySelector('.arrowH').childNodes[1].textContent = decrVal - 1;
        } else {
            document.querySelector('.arrowH').childNodes[1].textContent = 0 + (decrVal - 1).toString();
        }

    }

});
//min
const incrsM = document.querySelector('.arrowM').childNodes[3].childNodes[1];

incrsM.addEventListener('click', function() {

    incrVal = parseInt(document.querySelector('.arrowM').childNodes[1].textContent);
    if (incrVal < 59) {
        if (incrVal > 8) {
            document.querySelector('.arrowM').childNodes[1].textContent = incrVal + 1;
        } else {
            document.querySelector('.arrowM').childNodes[1].textContent = 0 + (incrVal + 1).toString();
        }

    }

});
const decrM = document.querySelector('.arrowM').childNodes[3].childNodes[3];

decrM.addEventListener('click', function() {

    decrVal = parseInt(document.querySelector('.arrowM').childNodes[1].textContent);
    if (decrVal > 0) {
        if (decrVal > 8) {
            document.querySelector('.arrowM').childNodes[1].textContent = decrVal - 1;
        } else {
            document.querySelector('.arrowM').childNodes[1].textContent = 0 + (decrVal - 1).toString();
        }

    }

});
//sec
const incrsS = document.querySelector('.arrowS').childNodes[3].childNodes[1];

incrsS.addEventListener('click', function() {

    incrVal = parseInt(document.querySelector('.arrowS').childNodes[1].textContent);
    if (incrVal < 59) {
        if (incrVal > 8) {
            document.querySelector('.arrowS').childNodes[1].textContent = incrVal + 1;
        } else {
            document.querySelector('.arrowS').childNodes[1].textContent = 0 + (incrVal + 1).toString();
        }

    }

});
const decrS = document.querySelector('.arrowS').childNodes[3].childNodes[3];

decrS.addEventListener('click', function() {

    decrVal = parseInt(document.querySelector('.arrowS').childNodes[1].textContent);
    if (decrVal > 0) {
        if (decrVal > 8) {
            document.querySelector('.arrowS').childNodes[1].textContent = decrVal - 1;
        } else {
            document.querySelector('.arrowS').childNodes[1].textContent = 0 + (decrVal - 1).toString();
        }

    }

});

var hour2 = 0;
var min2 = 0;
var sec2 = 0;

var interval;
var canvasM = document.querySelector('#canvas2');
var ctxM = canvasM.getContext('2d');
var radiusM = canvasM.height / 2;
ctxM.translate(radiusM, radiusM);
radiusM = radiusM * 0.9;

//store  parseInt(document.querySelector('#hourC').textContent)-hour1

const resetDone = document.querySelector('#done');

resetDone.addEventListener('click', function() {
    whichCk = 1;
    console.log(whichCk)
    try {
        clearInterval(interval);
    } catch {

    }
    try {
        clearInterval(intervalA);
    } catch {

    }
    try {
        clearInterval(intervalB);
    } catch {

    }
    canvasA.style.display = 'none';
    if (document.querySelector('.clock').style.display == 'none') {
        canvasM.style.display = 'block';
    }

    localStorage.setItem(userName + 'manuH', parseInt(document.querySelector('#hourC').textContent) - hourMA);
    localStorage.setItem(userName + 'manuM', parseInt(document.querySelector('#minC').textContent) - minMA);
    localStorage.setItem(userName + 'manuS', parseInt(document.querySelector('#secC').textContent) - secMA);

    hour2 = parseInt(document.querySelector('#hourC').textContent);

    min2 = parseInt(document.querySelector('#minC').textContent);
    sec2 = parseInt(document.querySelector('#secC').textContent);
    interval = setInterval(() => { drawClockM(ctxM) }, 1000);

    const resetPage = document.querySelector('.resetPage');
    resetPage.style.display = '';
    resetBtn.style.background = 'rgb(21, 243, 21)';
});

var userName;

function drawClockA(ctx) {

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    localStorage.setItem(userName + 'clockBG', document.querySelector('#clockBG').value);
    ctx.fillStyle = document.querySelector('#clockBG').value;
    ctx.fill();
    drawFace(ctx, radius);
    drawNum(ctx, radius);
    drawTimeA(ctx, radius);
}

function drawClockM(ctx) {

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    localStorage.setItem(userName + 'clockBG', document.querySelector('#clockBG').value);

    ctx.fillStyle = document.querySelector('#clockBG').value;
    ctx.fill();
    drawFace(ctx, radius);
    drawNum(ctx, radius);
    drawTimeM(ctx, radius);
}

function drawFace(ctx, radius) {


    //center piece
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawNum(ctx, radius) {
    var num;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = "middle"; //because default is alphabetic which keeps the letter above the base line.
    ctx.textAlign = 'center';
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang); //anticlockwise
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang) //aligning the number
        localStorage.setItem(userName + 'clockNum', document.querySelector('#clockNum').value);
        ctx.fillStyle = document.querySelector('#clockNum').value;
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang); //clockwise
    }
}


function drawTimeA(ctx, radius) {
    sec1 += 1; // There is a lag in setinterval timimg and the increment of sec1,maybe

    if (sec1 == 60) {
        sec1 = 0;
        min1 += 1;
    }
    if (min1 == 60) {
        min1 = 0;
        hour1 += 1;
    }
    if (hour1 == 12) {
        hour1 = 0;

    }
    // for digital(auto) clock
    let d = new Date();
    let hourD = d.getHours();
    let minD = d.getMinutes();
    let secD = d.getSeconds();
    var clock = document.querySelector('.clock');

    function less10(x) {
        if (x < 10) {
            x = '0' + x;
        }
        return x;
    }


    if (hourD > 12) {

        hourD = hourD - 12;
        clock.innerHTML = '<b>' + less10(hourD) + ':' + less10(minD) + ':' + less10(secD) + ' PM' + '</b>';
    } else if (hourD === 12) {

        clock.innerHTML = '<b>' + less10(hourD) + ':' + less10(minD) + ':' + less10(secD) + ' PM' + '</b>';
    } else if (hourD < 12) {

        clock.innerHTML = '<b>' + less10(hourD) + ':' + less10(minD) + ':' + less10(secD) + ' AM' + '</b>';
    }
    //document.querySelector('.boss2').addEventListener('click',)
    //adjust the hour min sec based on the input given by the user(maintain the diff between current time and manual time)

    hour1 = hour1 % 12;
    //change the time to angles
    h1 = (hour1 * Math.PI / 6) + (min1 * Math.PI / (6 * 60)) + (sec1 * Math.PI / (360 * 60));
    m1 = (min1 * Math.PI / 30) + (sec1 * Math.PI / (30 * 60));
    s1 = sec1 * Math.PI / 30;
    localStorage.setItem(userName + 'minHand', document.querySelector('#min').value);
    localStorage.setItem(userName + 'hourHand', document.querySelector('#hour').value);
    localStorage.setItem(userName + 'secHand', document.querySelector('#sec').value);
    drawHands(ctx, m1, radius * 0.8, radius * 0.07, document.querySelector('#min').value);
    drawHands(ctx, s1, radius * 0.9, radius * 0.02, document.querySelector('#sec').value);
    drawHands(ctx, h1, radius * 0.5, radius * 0.07, document.querySelector('#hour').value);

}

function drawTimeM(ctx, radius) {
    sec2 += 1; // There is a lag in setinterval timimg and the increment of sec1,maybe

    if (sec2 == 60) {
        sec2 = 0;
        min2 += 1;
    }
    if (min2 == 60) {
        min2 = 0;
        hour2 += 1;
    }
    if (hour2 == 24) {
        hour2 = 0;

    }
    let hourDup = hour2;
    let hourMD = hour2;
    var clock = document.querySelector('.clock');

    function less10(x) {
        if (x < 10) {
            x = '0' + x;
        }
        return x;
    }


    if (hourMD > 12) {

        hourMD = hourMD - 12;
        clock.innerHTML = '<b>' + less10(hourMD) + ':' + less10(min2) + ':' + less10(sec2) + ' PM' + '</b>';
    } else if (hourMD === 12) {

        clock.innerHTML = '<b>' + less10(hourMD) + ':' + less10(min2) + ':' + less10(sec2) + ' PM' + '</b>';
    } else if (hourMD < 12) {

        clock.innerHTML = '<b>' + less10(hourMD) + ':' + less10(min2) + ':' + less10(sec2) + ' AM' + '</b>';
    }
    //adjust the hour min sec based on the input given by the user(maintain the diff between current time and manual time)

    hourDup = hourDup % 12;
    //change the time to angles
    h1 = (hourDup * Math.PI / 6) + (min2 * Math.PI / (6 * 60)) + (sec2 * Math.PI / (360 * 60));
    m1 = (min2 * Math.PI / 30) + (sec2 * Math.PI / (30 * 60));
    s1 = sec2 * Math.PI / 30;
    localStorage.setItem(userName + 'minHand', document.querySelector('#min').value);
    localStorage.setItem(userName + 'hourHand', document.querySelector('#hour').value);
    localStorage.setItem(userName + 'secHand', document.querySelector('#sec').value);
    drawHands(ctx, m1, radius * 0.8, radius * 0.07, document.querySelector('#min').value);
    drawHands(ctx, s1, radius * 0.9, radius * 0.02, document.querySelector('#sec').value);
    drawHands(ctx, h1, radius * 0.5, radius * 0.07, document.querySelector('#hour').value);

}

function drawHands(ctx, angle, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-angle);

}

const custbtn = document.querySelector('#custH');
custbtn.addEventListener('click', function() {

    if (document.querySelector('#clockF').style.display == 'flex') {

        custbtn.style.opacity = 1;
        document.querySelector('#clockF').style.display = ''; //none display
    } else if (document.querySelector('#clockF').style.display == '') {

        custbtn.style.opacity = 0.5;
        document.querySelector('#clockF').style.display = 'flex';
    }
});
AC.addEventListener('click', function() {
    console.log(whichCk);
    if (AC.style.opacity != 1) {
        document.querySelector('.clock').style.display = 'none';
        if (whichCk == 0) {
            canvasA.style.display = 'block';
            canvasM.style.display = '';
        } else if (whichCk == 1) {
            canvasM.style.display = 'block';
            canvasA.style.display = '';

        }

        DC.style.opacity = 0.4;
        AC.style.opacity = 1;
        custbtn.style.display = 'block';
    }
});


DC.addEventListener('click', function() {

    if (DC.style.opacity != 1) {
        document.querySelector('.clock').style.display = 'block';
        if (canvasA.style.display == 'block') {
            canvasA.style.display = '';
        } else if (canvasM.style.display == 'block') {
            canvasM.style.display = '';
        }
        document.querySelector('#clockF').style.display = '';
        AC.style.opacity = 0.4;
        DC.style.opacity = 1;
        custbtn.style.display = '';
        custbtn.style.opacity = 1;
    }
});


const toSchedule = document.querySelector('#toSchedule');
toSchedule.addEventListener('click', function() {
    userName = document.querySelector('#userID').value;
    if (userName != "") {
        console.log(userName);
        const userProf = document.querySelector('#userProf');
        const greet = document.createElement('p');
        greet.innerHTML = 'Hi ' + '<b>' + userName + '</b>';
        userProf.appendChild(greet);
        var todPending = document.querySelector('#todPending');
        const curDate = new Date();

        let selectDate = userProf.childNodes[0].innerHTML + ' ' + curDate.getDate() + ' ' + document.querySelector('.MY').textContent;

        let todoContent = localStorage.getItem(selectDate);
        var todoData = document.createElement('div');

        if (todoContent != undefined) {
            let data = localStorage.getItem(selectDate);
            console.log(data);
            let A = JSON.parse(data);
            for (let i = 0; i < A.length; i++) {
                if (A[i][3] == -1) {
                    todoData.innerHTML += '<div class="todContainer">' + `<div><b>Deadline- ${A[i][1]}:${A[i][2]}</b></div>` + '<div>' + '<span>' + A[i][0] + '</span>' + '</div>' + '</div>'
                    todPending.appendChild(todoData);
                }
            }

        }
        document.querySelector('.userPage').style.display = 'none';
        document.querySelector('.planner').style.opacity = 1;
        document.querySelector('.calendar').style.pointerEvents = 'all';
        document.querySelector('.swap').style.pointerEvents = 'all';
        console.log(localStorage.getItem(userName + 'manuH'));
        if (localStorage.getItem(userName + 'manuH') != null) {
            whichCk = 1;
            document.querySelector('#clockBG').value = localStorage.getItem(userName + 'clockBG');
            document.querySelector('#clockNum').value = localStorage.getItem(userName + 'clockNum');
            document.querySelector('#min').value = localStorage.getItem(userName + 'minHand');
            document.querySelector('#sec').value = localStorage.getItem(userName + 'secHand');
            document.querySelector('#hour').value = localStorage.getItem(userName + 'hourHand');

            let diffH = parseInt(localStorage.getItem(userName + 'manuH'));
            let diffM = parseInt(localStorage.getItem(userName + 'manuM'));
            let diffS = parseInt(localStorage.getItem(userName + 'manuS'));

            if (diffH < 0 && (new Date()).getHours() < -(diffH)) {
                diffH = 24 + diffH;
                console.log(1);
            }
            if ((new Date()).getHours() + diffH > 23) {
                diffH = diffH - 24;
                console.log(1);
            }
            if (diffM < 0 && (new Date()).getMinutes() < -(diffM)) {
                diffM = 60 + diffM;
                diffH -= 1;
                console.log(1);
            }
            if ((new Date()).getMinutes() + diffM > 59) {
                diffM = diffM - 60;
                diffH += 1;
                console.log(1);
            }
            if (diffS < 0 && (new Date()).getSeconds() < -(diffS)) {
                diffS = 60 + diffS;
                diffM -= 1;
                console.log(1);
            }
            if ((new Date()).getSeconds() + diffS > 59) {
                diffS = diffS - 60;
                diffM += 1;
                console.log(1);
            }

            hour2 = (new Date()).getHours() + diffH;
            min2 = (new Date()).getMinutes() + diffM;
            sec2 = (new Date()).getSeconds() + diffS;

            interval = setInterval(() => { drawClockM(ctxM) }, 1000);
        } else {
            intervalA = setInterval(() => { drawClockA(ctxA) }, 1000);
            whichCk = 0;
            console.log(localStorage.getItem(userName + 'clockBG'));
            if (localStorage.getItem(userName + 'clockBG') != null) {
                document.querySelector('#clockBG').value = localStorage.getItem(userName + 'clockBG');
                document.querySelector('#clockNum').value = localStorage.getItem(userName + 'clockNum');
                document.querySelector('#min').value = localStorage.getItem(userName + 'minHand');
                document.querySelector('#sec').value = localStorage.getItem(userName + 'secHand');
                document.querySelector('#hour').value = localStorage.getItem(userName + 'hourHand');

            } else {
                document.querySelector('#clockBG').value = '#FF0505';
                document.querySelector('#clockNum').value = 'black';
                document.querySelector('#min').value = 'green';
                document.querySelector('#sec').value = 'blue';
                document.querySelector('#hour').value = 'red';

            }


        }
    }


});

//reset option
const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', function() {
    console.log('sflhss');
    const resetPage = document.querySelector('.resetPage');

    if (resetPage.style.display == '') {
        resetPage.style.display = 'flex';
        resetBtn.style.background = 'rgb(14, 153, 14)';
    } else if (resetPage.style.display == 'flex') {
        console.log('sdfasl');
        resetPage.style.display = '';
        resetBtn.style.background = 'rgb(21, 243, 21)';
    }

});

//auto option
var intervalB;
const autoBtn = document.querySelector('#auto');
autoBtn.addEventListener('click', function() {

    localStorage.setItem(userName + 'manuH', 0);
    localStorage.setItem(userName + 'manuM', 0);
    localStorage.setItem(userName + 'manuS', 0);

    whichCk = 0;
    document.querySelector('.resetPage').style.display = '';
    clearInterval(interval);

    clearInterval(intervalB);
    intervalB = setInterval(() => { drawClockA(ctxA) }, 1000);
    console.log(document.querySelector('.clock').style.display);
    if (document.querySelector('.clock').style.display == 'none') {
        console.log(canvasA.style.display);
        if (canvasA.style.display == '') {
            console.log('dlksj');
            canvasA.style.display = 'block';
            canvasM.style.display = 'none';
        }
    }

})
const logout = document.querySelector('.fa-sign-out-alt');
logout.addEventListener('click', function() {
    try {
        clearInterval(interval);
    } catch {

    }
    try {
        clearInterval(intervalA);
    } catch {

    }
    try {
        clearInterval(intervalB);
    } catch {

    }
    document.querySelector('#userID').value = '';
    document.querySelector('#todPending').innerHTML = '<h2>' + 'Today - Pending' + '</h2>';
    const userProf = document.querySelector('#userProf');
    userProf.removeChild(userProf.childNodes[0]);
    document.querySelector('.userPage').style.display = 'block';
    document.querySelector('.planner').style.opacity = 0.2;
    document.querySelector('.calendar').style.pointerEvents = 'none';
    document.querySelector('.swap').style.pointerEvents = 'none';
});




//check if it is manu or auto
//update on the local storage
//dc to ac switch