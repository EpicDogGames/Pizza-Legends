class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();              // this drawn below the characters (floor)
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();              // things drawn above the characters (roofs, skies, etc)
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx)  {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx)  {
        ctx.drawImage(this.upperImage, 0, 0)
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
                x: 3,
                y: 5,
                src: "/images/characters/people/hero.png"
            }),
            npcA: new GameObject({
                x: 9,
                y: 6,
                src: "/images/characters/people/npc2.png"
            }),
            npcB: new GameObject({
                x: 10,
                y: 8,
                src: "/images/characters/people/npc3.png"
            })
        }
    },
}