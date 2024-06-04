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
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })

            // draw lower image
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // draw game objects
            Object.values(this.map.gameObjects).sort((a,b) => {
               return a.y - b.y; 
            }).forEach(object => {
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

    bindActionInput()  {
        new KeyPressListener("Enter", () => {
            // is there a person to talk to here?
            this.map.checkForActionCutscene()
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero")  {
                // hero's position has changed
                this.map.checkForFootstepCutscene();
            }
        })
    }

    startMap(mapConfig)  {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();        
    }

    init()  {

        this.hud = new Hud();
        this.hud.init(document.querySelector(".game-container"));

        this.startMap(window.OverworldMaps.DemoRoom);

        this.bindActionInput();
        this.bindHeroPositionCheck();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

        //this.map.startCutscene( [
        //    { type: "battle", enemyId: "beth" } 
        //])
    }
}