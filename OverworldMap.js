class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();              // this drawn below the characters (floor)
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();              // things drawn above the characters (roofs, skies, etc)
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson)  {
        ctx.drawImage(
            this.lowerImage, 
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        );
    }

    drawUpperImage(ctx, cameraPerson)  {
        ctx.drawImage(
            this.upperImage, 
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        );
    }
}

// object of all the different maps in the game
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                src: "/images/characters/people/hero.png"
            }),
            npc1: new GameObject({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png"
            })
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: utils.withGrid(4),
                y: utils.withGrid(5),
                src: "/images/characters/people/hero.png"
            }),
            npcA: new GameObject({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                src: "/images/characters/people/npc2.png"
            }),
            //npcB: new GameObject({
            //    x: 10,
            //    y: 8,
            //    src: "/images/characters/people/npc3.png"
            //})
        }
    },
}