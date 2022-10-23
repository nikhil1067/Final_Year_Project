


document.querySelector('.fetch').addEventListener('click',getItems);

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue,block;
    block = document.querySelectorAll(".num");
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    li = document.querySelectorAll (".forSearch");
    var lst=[];

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        lst.push(li[i].textContent);
    }
    for (i = 0; i < li.length; i++) {
        lst[i] = lst[i].toUpperCase();
    }
    
    for(i=0;i<lst.length;i++) {
        if(lst[i].indexOf(filter)> -1) {
            block[i].style.display = "";
            ul = 0;
        }
        else {
            block[i].style.display = "none";
            ul = 1;
        }
    }
    if(ul===1) {
        console.log("not found");
    }
}

function getItems(e) {
    
    xhr = new XMLHttpRequest();
    xhr.open('GET','http://teach-for-tomorrow.herokuapp.com/request',true);
    

    xhr.onload = function() {
        
        if(this.status === 200) {
            let response = JSON.parse(xhr.responseText).data;
            let output = ``;
            let x = 1;
            response.forEach(function(user) {
                output+=`<section id="element">
                <ul class="list num">
                <li class="item">Posted by: ${user.name}</li>
                <div>
                <li class="oth-item">Job Description: ${user.jobDescription}</li>
                <li class="oth-item">Requirement: ${user.Requirement}</li>
                <li class="forSearch oth-item">Job Location: ${user.jobLocation}</li>
                </div>
                <div>
                <li class="oth-item">Item Request: ${user.itemRequest}</li>
                <li class="oth-item">Phone: ${user.phone}</li>
                <li class="oth-item">Email: ${user.email}</li>
                </div>
                </ul>
                </section>`;
                x+=1;
            });
            document.querySelector('.users').innerHTML = output;
    
        }
    }

    xhr.send();

    e.preventDefault();

}