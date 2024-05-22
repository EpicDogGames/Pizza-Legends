class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    // this method will be a continuous loop so that the game will run every 1 sec
    startGameLoop()  {
        const step = () => {
            // clear the canvas so we don't have previous images showing after each frame
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // establish camera person
            const cameraPerson = this.map.gameObjects.hero;

            // update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction
                })
            })

            // draw lower image
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // draw game objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            // draw upper image
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
             step();    
            }) 
        }
        step();
    }

    init()  {

        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();


    }
}