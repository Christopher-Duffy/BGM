function createDragable(id, className, imageName){
    var ele = document.createElement('div');
    ele.id="draggable"+id;
    ele.classList.add(className,"dragable");
    ele.style.backgroundImage="url('images/"+imageName+".png')";
    ele.onclick=dragableClicked;
    document.body.appendChild(ele);
}
function dragableClicked(event){
    console.log(event);
    var ele = event.target;
    if(ele.dragging==true){
        document.dragging=null;
        ele.dragging=false;
    }else{
        document.dragging=ele;
        ele.dragging = true;
    }
}
document.onmousemove=function(event){
    if(document.dragging!=null){
        document.dragging.style.left=(event.clientX-50)+"px";
        document.dragging.style.top=(event.clientY-50)+"px";
        console.log(event);
    }
};


function makeMeeple(){
    var data={};
    data.x=0;
    data.y=0;
    data.image="OrangeMeeple";
    socket.emit("newDraggable",data);
}