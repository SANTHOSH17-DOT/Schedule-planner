
//calendar



var monthSelected = document.querySelector('#months').value;
var yearSelected = document.querySelector('#years').value;

var monthYear = document.querySelector('.MY');


const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// In case of feb(28days), there is a chance for the last row to be empty
// so think about adding rows and cell
var selectDate; //selected Date with global scope
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
        
        const todoBody = document.querySelector('.TodoBody');
        todoBody.innerHTML ='';
        todoPage.style.animation = 'todoPageOff 500ms 1';
        setTimeout(()=>{todoPage.style.display = 'none';},500);
        document.querySelector('#inTodo').value = '';
        document.querySelector('.planner').style.pointerEvents = 'all';
                /*
        tds = Array.from(document.querySelectorAll('td'));
        tds.forEach((value)=>{
        value.style.border = 'none';
        });*/
    });
    //todo list of the current date should be displayed initially

    tds = Array.from(document.querySelectorAll('td'));
    
    // check the scope of selectDate

    //Calendar page to todoPage
    
    var todoBody = document.querySelector('.TodoBody');
    var delBtns;
    tds.map(td=>{
        
        if(td.textContent != ""){
        td.addEventListener('click',()=>{
            document.querySelector('.planner').style.pointerEvents = 'none';
            //todo page entry
            document.querySelector('.todoList').style.animation = 'todoPage 400ms 1';

            tds.forEach((value)=>{
                value.style.border = 'none';//check once
            });
            //highlighting the date clicked
            td.style.border = '2px solid rgb(43, 39, 39)';
            
            //clearing the todo body everytime entering 
            todoBody.innerHTML = "";
                
            
            //displaying the data after clicking the date
            
            tds = Array.from(document.querySelectorAll('td'));
            
            tds.map(td=>{
                
                if(td.style.border == '2px solid rgb(43, 39, 39)'){
                    const userProf = document.querySelector('#userProf');
                    userProf.childNodes[0].innerHTML
                    selectDate = userProf.childNodes[0].innerHTML+' '+td.innerHTML +' '+document.querySelector('.MY').textContent;
                    todoDate = td.innerHTML +' '+document.querySelector('.MY').textContent;
                }
            });
            document.querySelector('#todoDate').innerHTML = todoDate;
            
            let todoContent = localStorage.getItem(selectDate);
            
            
            if(todoContent!=undefined){
                let data = localStorage.getItem(selectDate);
                let A = JSON.parse(data);
                 
                
                for(let i =0;i<A.length;i++){//check once again
                    if(A[i]!=""){
                        todoData =document.createElement('div');
                    
                    todoData.innerHTML='<span>'+A[i]+'</span>'+'<button id="delBtn">'+'<i class="far fa-trash-alt"></i>'+'</button>';
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
            addTodoBtn.addEventListener('click',()=>{
                const todoBody = document.querySelector('.TodoBody');
                
                console.log(selectDate);
            
            let inputData = document.querySelector('#inTodo').value;
            
            if(inputData){
                //think of appending the data
                let todoData =document.createElement('div');
                
                todoData.innerHTML='<span>'+inputData+'</span>'+'<button id="delBtn">'+'<i class="far fa-trash-alt"></i>'+'</button>';
                todoBody.insertBefore(todoData,todoBody.childNodes[0]);

                //animation
                todoData.style.position = 'relative';
                todoData.style.animation = 'addInput 500ms 1';
                
                console.log(localStorage.getItem(selectDate));
                if(localStorage.getItem(selectDate)!=null){
                    let data = localStorage.getItem(selectDate);
                    let A = JSON.parse(data);//stupid idea
                    //think of json
                    console.log(A);
                    
                    
                 
                    A.unshift(inputData);
                    localStorage.setItem(selectDate,JSON.stringify(A));
                    console.log(A);
                }else{
                    let k =[];
                    k.push(document.querySelector('#inTodo').value);
                    console.log(JSON.stringify(k));
                localStorage.setItem(selectDate,JSON.stringify(k));
                }
            
            }
            document.querySelector('#inTodo').value = '';
            
            // Avoid repeating this part.
            delBtns = Array.from(document.querySelectorAll('#delBtn'));
        delBtns.map(btn=>{
            console.log(btn);
            btn.addEventListener('click',()=>{
                
                console.log('Del btn clicked');
                let parentDiv = btn.parentElement;
                
                delTodo = parentDiv.children[0].textContent;
                
                    parentDiv.style.animation = 'delInput 500ms 1';
                
                //removing the div element from the todo list
                setTimeout(()=>{parentDiv.remove();},500);
                
                
            tds = Array.from(document.querySelectorAll('td'));
            //How to get rid of td? try to give select Date global scope
            tds.map(td=>{
                if(td.style.border == '2px solid rgb(43, 39, 39)'){
                    const userProf = document.querySelector('#userProf');
                    userProf.childNodes[0].innerHTML
                    selectDate = userProf.childNodes[0].innerHTML+' '+td.innerHTML +' '+document.querySelector('.MY').textContent;
                    
                }
                });
                let data = localStorage.getItem(selectDate);
                let A = JSON.parse(data);

                //removing the data from the local storage
                
                delIndex= A.indexOf(delTodo);
                console.log(delIndex);
                A.splice(delIndex,1);
                localStorage.setItem(selectDate,JSON.stringify(A));

                todoContent = localStorage.getItem(selectDate);
                const todoBody = document.querySelector('.TodoBody');

            
                
            });
            
        });
        });
        //avoid repeating this part
        console.log(document.querySelectorAll('#delBtn'));
            delBtns = Array.from(document.querySelectorAll('#delBtn'));
            console.log(delBtns);
        //remove button
        // And also once add btn is clicked, delete btn is not working.
        // Maybe the problem is because of the delBtns array.
        
        
            delBtns = Array.from(document.querySelectorAll('#delBtn'));
        delBtns.map(btn=>{
            console.log(btn);
            btn.addEventListener('click',()=>{
                
                console.log('Del btn clicked');
                let parentDiv = btn.parentElement;
                delTodo = parentDiv.children[0].textContent;
                
                parentDiv.style.animation = 'delInput 500ms 1';
                
                //removing the div element from the todo list
                setTimeout(()=>{parentDiv.remove();},500);
                
                
                
            tds = Array.from(document.querySelectorAll('td'));
            //How to get rid of td? try to give select Date global scope
            tds.map(td=>{
                if(td.style.border == '2px solid rgb(43, 39, 39)'){
                    const userProf = document.querySelector('#userProf');
                    userProf.childNodes[0].innerHTML
                    selectDate = userProf.childNodes[0].innerHTML+' '+td.innerHTML +' '+document.querySelector('.MY').textContent;
                    }
            });
            let data = localStorage.getItem(selectDate);
            let A = JSON.parse(data);

            //removing the data from the local storage
            
            delIndex= A.indexOf(delTodo);
            console.log(delIndex);
            A.splice(delIndex,1);//check this(some logic error)
            localStorage.setItem(selectDate,JSON.stringify(A));

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


