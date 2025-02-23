let sitenameinput=document.getElementById('inputone')
let siteurlinput=document.getElementById('inputtwo')

let sitedata=[]

if (localStorage.getItem('alldata') !=null){
    sitedata=JSON.parse(localStorage.getItem('alldata'))
    display()
}

const urlRegex = /^(https:\/\/).+(\.com)|(\.net)$/ ;
const nameRegex = /^[a-zA-Z]{3,}$/ ;

function btnsubmit() {
    let inputs={
        name:sitenameinput.value,
        url:siteurlinput.value
    }     

    if (nameRegex.test(inputs.name)){
        if (urlRegex.test(inputs.url)){
            sitedata.push(inputs)
            display()
            clearinput()
        
            localStorage.setItem('alldata',JSON.stringify(sitedata))
        }
        else{
            window.alert(`Site Name or Url is not valid, Please follow the rules below :
        Site name must contain at least 3 characters
        Site URL must be a valid one`)}
    }
    else{
        window.alert(`Site Name or Url is not valid, Please follow the rules below :
    Site name must contain at least 3 characters
    Site URL must be a valid one`)
    }
}

const inputone = document.getElementById('inputone');
const inputtwo = document.getElementById('inputtwo');

inputone.addEventListener('input', () => {
  if (nameRegex.test(inputone.value)) {
    inputone.classList.remove('is-invalid');
    inputone.classList.add('is-valid');
  } 
  else {
    inputone.classList.remove('is-valid');
    inputone.classList.add('is-invalid');
  }
});

inputtwo.addEventListener('input', () => {
  if (urlRegex.test(inputtwo.value)) {
    inputtwo.classList.remove('is-invalid');
    inputtwo.classList.add('is-valid');
  } 
  else {
    inputtwo.classList.remove('is-valid');
    inputtwo.classList.add('is-invalid');
  }
});

function display(){
    let submit=""
    for (let i = 0; i<sitedata.length; i++) {
        submit+=`
        <tr class="text-center">
            <td>${[i+1]}</td>
            <td>${sitedata[i].name}</td>
            <td>
              <button id="visit" class="btn btn-success" onclick="visitinput('${sitedata[i].url}')">
                <i class="fa-solid fa-eye text-white bg-success me-2"></i>
                Visit
              </button>
            </td>
            <td>
              <button class="btn btn-danger" onclick="deleteinput(${i})">
                <i class="fa-solid fa-trash bg-danger me-2"></i>
                Delete
              </button>
            </td>
        </tr>`
    }
    document.getElementById('displaying').innerHTML=submit
}

function clearinput(){
    sitenameinput.value=""
    siteurlinput.value=""
}

function deleteinput(index){
    sitedata.splice(index,1)
    localStorage.setItem('alldata',JSON.stringify(sitedata))
    display()
}

function visitinput(url){
    window.open(url, "_blank");
}