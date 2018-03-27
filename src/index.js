// this is the parent
export default class  Dragon {
    constructor (parentElement, options) { // I whish this was type script now...
        this.container = parentElement;
        this.height = options.height || "100%";
        this.width = options.width || "100%";
        this.children = [];
    }

    init () {
        console.log("parent init: " + this.container)
        this.container.style.width = this.width
        this.container.style.height = this.height

        /*
        let dragonChild = new DragonChild(this.container.children[0], this.container, {});
        this.children.push(dragonChild)
        dragonChild.init()
        return
        */
        //make direct children draggable:
        // - Iterate the children
        // - Make childern draggable by adding needed event handlers
        for (var i = 0; i < this.container.children.length; i++) {
            let dragonChild = new DragonChild(this.container.children[i], this.container, {});
            console.log(dragonChild)
            this.children.push(dragonChild)
            dragonChild.init()
        }

    }


    addChild () {

    }

    resize () {

    }

    move () {
    
    }
    
}



export class DragonChild {
    constructor (childElement, parentElement, options) {
        this.child = childElement;
        this.container = parentElement;
        this.changeX = 0;
        this.changeY = 0;
        this.startX = 0;
        this.startY = 0;
        // console.log("child constructor: " + parentElement)
    }

    init () {
        this.child.onmousedown = evt => this.dragMouseDown(evt)
    }

    dragMouseDown (e) {
        // console.log("event: " +  e)
        // console.log("dragMouseDown")
        // console.log(this.container)
        e = e || window.event;
        this.startX = e.clientX - this.container.offsetLeft; // ok
        this.startY = e.clientY - this.container.offsetTop; // ok
        // console.log("start: ", this.startX, this.startY)
        // console.log(e)
        // console.log(document.onmousemove)
        this.container.onmouseup = evt => this.closeDragElement(evt)
        this.container.onmousemove = evt => this.elementDrag(evt)
    }

    elementDrag (e) {
        // console.log("elementDrag")
        e = e || window.event;
                                        //14
        var mouseMovedRelativeToOffsetX = (e.clientX - this.container.offsetLeft)
        var mouseMovedRelativeToOffsetY = (e.clientY -this.container.offsetTop)

        // console.log("move Relative to offset: ", mouseMovedRelativeToOffsetX, mouseMovedRelativeToOffsetY)

        this.changeX = this.startX - mouseMovedRelativeToOffsetX;
        this.changeY = this.startY - mouseMovedRelativeToOffsetY;
        this.startX = e.clientX - this.container.offsetLeft;
        this.startY = e.clientY - this.container.offsetTop;
        // console.log("clientx&y: ", e.clientX, e.clientY)
        // console.log("change: ", this.changeX, this.changeY)
        // console.log("offset", this.child.offsetLeft, this.child.offsetTop)

        // console.log("Style: ", this.child.offsetLeft - this.changeX, this.child.offsetTop - this.changeY)
        this.child.style.top = (this.child.offsetTop - this.changeY) + 'px';
        this.child.style.left = (this.child.offsetLeft - this.changeX) + 'px';
    }

    closeDragElement() {
        // console.log("closeDragElement")
        // console.log(this.container)
        /* stop moving when mouse button is released:*/
        this.container.onmouseup = null;
        this.container.onmousemove = null;
    }

}
