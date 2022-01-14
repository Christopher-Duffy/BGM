module.exports.Draggable = class Draggable{
    constructor(id,x,y,image){
        this.id=id;
        this.x=x;
        this.y=y;
        this.image=image;
    }
    move(x,y){
        this.x=x;
        this.y=y;
    }
}