function drawDraggables(){
    for(var i=0;i<draggables.length;i++){
        if (draggables[i].eleID!=null){
            var d = draggables[i];
            moveDraggable(d.eleID,percentXToPx(d.x),percentYToPx(d.y));
        }else{
            var d = draggables[i];
            console.log(d);
            draggables[i].eleID = createDraggable(d.id,'meeple',d.image,percentXToPx(d.x),percentYToPx(d.y));
        }
    }
}

function createDraggable(id, className, imageName,x,y){
    var ele = document.createElement('div');
    ele.id="draggable"+id;
    ele.classList.add(className,"draggable");
    ele.style.backgroundImage="url('images/"+imageName+".png')";
    ele.style.left=x+"px";
    ele.style.top=y+"px";
    ele.onclick=draggableClicked;
    document.body.appendChild(ele);
    return ele.id;
}

function moveDraggable(id,x,y){
    var ele = document.getElementById(id);
    ele.style.left=x+"px";
    ele.style.top=y+"px";
}

function percentXToPx(x){return window.innerWidth*x/100;}
function percentYToPx(y){return window.innerHeight*y/100;}

function pxXToPercent(x){return x/window.innerWidth*100;}
function pxYToPercent(y){return y/window.innerHeight*100;}

function draggableClicked(event){
    console.log(event);
    var ele = event.target;
    if(ele.dragging==true){
        document.dragging=null;
        ele.dragging=false;
        //console.log(ele.id,pxXToPercent(parseInt(ele.style.left)),pxYToPercent(parseInt(ele.style.top)));
        data={};
        data.eleID = ele.id;
        data.x = pxXToPercent(parseInt(ele.style.left));
        data.y = pxYToPercent(parseInt(ele.style.top));
        socket.emit("moveDraggable",data);
    }else{
        document.dragging=ele;
        ele.dragging = true;
    }
}
document.onmousemove=function(event){
    if(document.dragging!=null){
        document.dragging.style.left=(event.clientX-50)+"px";
        document.dragging.style.top=(event.clientY-50)+"px";
    }
};


function makeMeeple(){
    var data={};
    data.x=Math.random()*100;
    data.y=Math.random()*100;
    data.image="OrangeMeeple";
    socket.emit("newDraggable",data);
}