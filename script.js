const arrColor = ['green','red','yellow','blue']  // color for change
const ogColor = ['lightgreen','pink','lightyellow','lightblue'] // defualt color
const arrowKeys =["ArrowUp","ArrowRight", "ArrowLeft", "ArrowDown"] // input key
const record =[] // record order of color popup
let delayTime = 1500 
let stage = 1

document.querySelector('#rng').addEventListener('click',rng) //start button
document.querySelector('#close').addEventListener('click',closeModal) //close modal button 
document.querySelector('#next').addEventListener('click',nextStage)//go next stage 



function rng(){
    removeEvent()
    let i = -1
    for (let i = 0;i<stage; i++){
        let num = Math.floor(Math.random()*4) 
        record.push(num)
    }
   record.forEach((num) =>{
     
    console.log(num);
    i +=1
    setTimeout(()=>{document.querySelector(`#${arrColor[num]}`).style.backgroundColor = arrColor[num]}, delayTime/2 + delayTime*i)
    
    setTimeout(()=>{document.querySelector(`#${arrColor[num]}`).style.backgroundColor = ogColor[num]}, delayTime + delayTime*i)
    
    })
    console.log(record);
   
    setTimeout(addEvent, 1.1*delayTime + delayTime*(i))
   
  
}

function selectColor(e){
    e.preventDefault()
    let color = parseInt(e.target.getAttribute('value'))
   
        if(color === record[0]){
            record.shift()
            if(record.length === 0 ){
                document.querySelector('#modal').style.display = 'block'}}
        else{ 
            alert(typeof color+" end game !!!!")
    }  

}
function keySelectColor(event){
        const key = event.key;
        const indexKey = arrowKeys.indexOf(key)
        if(indexKey>=0){// "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            if(indexKey === record[0]){
            record.shift()
            if(record.length === 0 ){
                document.querySelector('#modal').style.display = 'block'}
        }else{ 
            alert(typeof indexKey+" end game !!!!")
    }}}

function nextStage(){
    
    document.querySelector('#modal').style.display = 'none'
    stage +=1
    document.querySelector('#stage').innerText = `Stage : ${stage}`
    delayTime =delayTime*0.9
    removeEvent()
    setTimeout(rng,500)
   
    

}

function closeModal(){
    document.querySelector('#modal').style.display = 'none'
}

function addEvent(){
  
    document.querySelector('body').addEventListener('keydown', keySelectColor);
    arrColor.forEach((item) =>{
        document.querySelector(`#${item}`).addEventListener('click',selectColor)
        document.querySelector(`#${item}`).style.cursor = 'pointer'
    })
    
}

function removeEvent(){
    document.querySelector('body').removeEventListener ('keydown', keySelectColor);
    arrColor.forEach((item) =>{
        document.querySelector(`#${item}`).removeEventListener('click',selectColor)
        document.querySelector(`#${item}`).style.cursor = 'no-drop'
    })
    
}


