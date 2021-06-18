//Digital clock
var clock = document.querySelector('.clock');
interval = setInterval(()=>{
  let d = new Date();
  let hour =d.getHours();
  let min =d.getMinutes();
  let sec = d.getSeconds();
  function less10(x){
    if(x<10){
      x = '0'+x;
    }
    return x;
  }
   
  
  if(hour>12){
    hour = hour-12;
    clock.innerHTML='<b>'+less10(hour)+':'+less10(min)+':'+less10(sec)+' PM'+'</b>';
  }else if(hour===12){
    clock.innerHTML='<b>'+less10(hour)+':'+less10(min)+':'+less10(sec)+' PM'+'</b>';
    }else if(hour<12){
    clock.innerHTML='<b>'+less10(hour)+':'+less10(min)+':'+less10(sec)+' AM'+'</b>';
  }
 
},1000);

//calendar



var monthSelected = document.querySelector('#months').value;
var yearSelected = document.querySelector('#years').value;

var monthYear = document.querySelector('.MY');


const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// In case of feb(28days), there is a chance for the last row to be empty
// so think about adding rows and cell

const createCal = (month,year) =>{
    // think for change of months.
    const tableBody = document.querySelector('#calendar-body');
    let firstDay = (new Date(year,month,1)).getDay();
    let totDays = (new Date(year,month+1,0)).getDate() -(new Date(year,month+1,1)).getDate() +1;
    
    let date = 1; 
    //to clear the table 
    tableBody.innerHTML = "";
    document.querySelector('.MY').textContent = monthList[month]+' ' + year;

    document.querySelector('#months').value= month;
    document.querySelector('#years').value = year;
    for(let i =0;i<6;i++){
        let row= document.createElement('tr');
        for(let j =0;j<7;j++){//day indexing 0 to 6
            if(i==0 && j<firstDay){
                let cell = document.createElement('td');
                cell.textContent = '';
                row.appendChild(cell);
            }else if(date>totDays){//to avoid empty add. cells
                break;
            }else{
                let cell = document.createElement('td');
                cell.textContent = date;
                
                if(date == (new Date()).getDate() && month==(new Date()).getMonth() && year == (new Date()).getFullYear()){
                    
                    cell.classList.add('highDate');
                }
                date +=1;
                row.appendChild(cell);
            }

            
            tableBody.appendChild(row);
        }

    }
    //todoPage to calendar page
    backBtn = document.querySelector('#backbtn');
    backBtn.addEventListener('click',function(){
        todoPage = document.querySelector('.todoList');
            todoPage.style.display = 'none';
    });
    //todo list of the current date should be displayed initially

    tds = Array.from(document.querySelectorAll('td'));
    
    
    tds.map(td=>{
        
        if(td.textContent != ""){
        td.addEventListener('click',()=>{
            const todoBody = document.querySelector('.TodoBody');
                todoBody.innerHTML ='';
        //displaying the data after clicking the date
            let selectDate;
            tds = Array.from(document.querySelectorAll('td'));
            tds.map(td=>{
                if(td.style.border == 'cyan'){
                    selectDate = td.innerHTML +' '+document.querySelector('.MY').textContent;
                }
            });
            todoContent = localStorage.getItem(selectDate);
            if(todoContent!=undefined){
                C = todoContent.split(',');//logic error
                
                n = C.length; //Try adding div without clearing the todo box everytime
                const todoBody = document.querySelector('.TodoBody');
                todoBody.innerHTML = "";
                C.forEach((value)=>{
                    
                    todoData =document.createElement('div');
                    
                    todoData.innerHTML='<span>'+value+'</span>'+'<button id="delBtn">'+'🗑️'+'</button>';
                    todoBody.appendChild(todoData);
                });
            }
            //Calendar page to todoPage
            todoPage = document.querySelector('.todoList');
            todoPage.style.display = 'flex';
            tds.forEach((value)=>{
                value.style.background = 'rgb(71, 68, 68)';
                curdate = document.querySelector('.highDate');
                curdate.style.background = 'grey';
                value.style.border = 'none';
            });
            
            
            
            
            td.style.border = '2px solid cyan';
            //try to display the data soon after clicking the add btn aswell.
            
            //addding todolist for the date chosen
            addTodoBtn = document.querySelector('#addTodo');
            addTodoBtn.addEventListener('click',()=>{
                const todoBody = document.querySelector('.TodoBody');
                todoBody.innerHTML ='';
            let selectDate;
            tds = Array.from(document.querySelectorAll('td'));
            tds.map(td=>{
                if(td.style.border == '2px solid cyan'){
                    selectDate = td.innerHTML +' '+document.querySelector('.MY').textContent;
                }
            });
            //console.log(td); // gives the previously selected td(check)
            let inputData = document.querySelector('#inTodo').value;
            if(inputData){
                //think of appending the data
                // seems to be applying for every td, check it
                
                console.log(selectDate);
                if(localStorage.getItem(selectDate)!=null){
                    console.log(localStorage.getItem(selectDate));
                    A = localStorage.getItem(selectDate);
                    B = A.split(',');//this works on datas with , (prob)
                    //get rid of the null value in the array
                    //let index = B.indexOf('');
                    //B.splice(index,1);

                    console.log(B);
                    B.push(inputData);
                    localStorage.setItem(selectDate,B);
                }else{
                    let k =[];
                    k.push(document.querySelector('#inTodo').value);
                    console.log(k);
                localStorage.setItem(selectDate,k);
                }
            }
            document.querySelector('#inTodo').value = "";
            
            console.log(selectDate);
            console.log(localStorage.getItem(selectDate));
            todoContent = localStorage.getItem(selectDate);
            if(todoContent!=undefined){
                C = todoContent.split(',');
                n = C.length; //Try adding div without clearing the todo box everytime
                todoBody.innerHTML = "";
                C.forEach((value)=>{
                    
                    todoData =document.createElement('div');
                    
                    todoData.innerHTML='<span>'+value+'</span>'+'<button id="delBtn>'+'🗑️'+'</button>';
                    todoBody.appendChild(todoData);
                });

            }
            
        });
        
        
    });
}
    });  
    
}        

        //remove button
        //It works only once(prob). Think of something like enable delete option each time the todo list displays.
        const delData = ()=>{
           
        let btns = Array.from(document.querySelectorAll('#delBtn'));
        
        btns.map(btn=>{
            console.log(btn);
            btn.addEventListener('click',()=>{
                console.log('Del btn clicked');
                parentDiv = btn.parentElement;
                delTodo = parentDiv.children[0].textContent;
                
                parentDiv.remove();
                console.log(parentDiv);
                
                console.log(delTodo);
                let selectDate;
            tds = Array.from(document.querySelectorAll('td'));
            tds.map(td=>{
                if(td.style.border == '2px solid cyan'){
                    selectDate = td.innerHTML +' '+document.querySelector('.MY').textContent;
                }
            });
                todoContent = localStorage.getItem(selectDate);
                console.log(todoContent);
                B = todoContent.split(',');
                delIndex= B.indexOf(delTodo);
                console.log(delIndex);
                B.splice(delIndex,1);
                localStorage.setItem(selectDate,B);

                todoContent = localStorage.getItem(selectDate);
                const todoBody = document.querySelector('.TodoBody');
            if(todoContent!=undefined){
                C = todoContent.split(',');
                n = C.length; //Try adding div without clearing the todo box everytime
                todoBody.innerHTML = "";
                C.forEach((value)=>{
                    
                    todoData =document.createElement('div');
                    
                    todoData.innerHTML='<span>'+value+'</span>'+'<button id="delBtn>'+'🗑️'+'</button>';
                    todoBody.appendChild(todoData);
                });
            }
            });
        });
    
    }
    delData();
var curMonth = (new Date()).getMonth();
var curYear = (new Date()).getFullYear();
//calendar on current month
createCal(curMonth,curYear);

const nextMonth = ()=>{
    curMonth +=1;


    if(curMonth==12){
        curMonth = 0;
        curYear +=1;
    }
    createCal(curMonth,curYear);
    console.log(curMonth);
}
const prevMonth = ()=>{
    curMonth -=1;
    if(curMonth ==-1){
        curMonth = 11;
        curYear -=1;
    }
    console.log(curMonth)
    createCal(curMonth,curYear);
}
const dropChange = ()=>{
    let month = document.querySelector('#months').value;
    let year = document.querySelector('#years').value;
    console.log(typeof(month));
    console.log(typeof(year));
    createCal(parseInt(month),parseInt(year));
}

