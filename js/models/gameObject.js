export class GameObject {
    constructor(positionTop, positionLeft){
        this.positionTop = positionTop;
        this.positionLeft = positionLeft;        
        this.gameField = document.getElementById('gamefield');
        this.className = 'game_object';
        this.$element;  
        this.type = 'object';            
    } 
    
    addElementToField = () => {
        this.gameField.appendChild(this.$element)
    }

    createElement = () => {
        const $element = document.createElement('div')
        $element.className = this.className;
        $element.style.top = this.positionTop + 'px';
        $element.style.left = this.positionLeft + 'px';
        return $element;
    }

    draw = () =>{
        this.gameField.appendChild(this.$element)
    }
    
    deleteElement = () => {
        this.$element.remove();
        this.$element = null;
    }
}

