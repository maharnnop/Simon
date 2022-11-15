const arrColor = ['green','red','yellow','blue']
const ogColor = ['lightgreen','pink','lightyellow','lightblue']
const arrowKeys =["ArrowUp","ArrowRight", "ArrowLeft", "ArrowDown"]
const arrPlay =[]
const record =[]
let delayTime = 1500
let stage = 1

document.querySelector('#rng').addEventListener('click',rng)
document.querySelector('#close').addEventListener('click',closeModal)
document.querySelector('#next').addEventListener('click',nextStage)

setTimeout(addEvent(),10000)

function rng(){
    removeEvent()
    let i = 0
    for (let i = 0;i<stage; i++){
        let num = Math.floor(Math.random()*4) 
        record.push(num)
    }
   record.forEach((num) =>{
     
    console.log(num);
    setTimeout(()=>{document.querySelector(`#${arrColor[num]}`).style.backgroundColor = arrColor[num]}, delayTime/2 + delayTime*i)
    setTimeout(()=>{document.querySelector(`#${arrColor[num]}`).style.backgroundColor = ogColor[num]}, delayTime + delayTime*i)
    i +=1
    })
    console.log(record);
  
   
  
}

function selectColor(e){
    e.preventDefault()
    let color = parseInt(e.target.getAttribute('value'))
   
        if(color === record[0]){
            record.shift()
            if(record.length === 0 ){
                document.querySelector('#modal').style.display = 'block'}}
    //     else{ 
    //         alert(typeof color+" end game So FUCKING NOOB!!!!")
    // }  

}
function keySelectColor(indexKey){
        if(indexKey === record[0]){
            record.shift()
            if(record.length === 0 ){
                document.querySelector('#modal').style.display = 'block'}
        // }else{ 
        //     alert(typeof indexKey+" end game So FUCKING NOOB!!!!")
    }  

}

function nextStage(){
    document.querySelector('#modal').style.display = 'none'
    stage +=1
    document.querySelector('#stage').style.innerText = 'stage' 
    delayTime =delayTime*0.9
    rng()
    addEvent()
}

function closeModal(){
    document.querySelector('#modal').style.display = 'none'
}

async function addEvent(){
    document.querySelector('body').addEventListener('keydown', function(event) {
        const key = event.key;
        const indexKey = arrowKeys.indexOf(key)
        keySelectColor(indexKey)// "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    });
    arrColor.forEach((item) =>{
        document.querySelector(`#${item}`).addEventListener('click',selectColor)
    })
}

function removeEvent(){
    document.querySelector('body').removeEventListener('keydown', function(event) {
        const key = event.key;
        const indexKey = arrowKeys.indexOf(key)
        keySelectColor(indexKey)// "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    });
    arrColor.forEach((item) =>{
        document.querySelector(`#${item}`).removeEventListener('click',selectColor)
    })
}


