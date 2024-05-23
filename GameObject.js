class GameObject {
    constructor(config)  {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/people/hero.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        console.log("mounting");
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // kick off behavior
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map) {
        // don't do anything if there is a more important cutscene or don't have config to do anything anyway
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0)  {
            console.log("This is executed");
            return;
        }

        // setting up our event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // create an event instance out of next event config
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init();  // tells code to wait to resolve until eventHandler is finished (a promise)

        // setting next event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length)  {
            this.behaviorLoopIndex = 0;
        }

        // do it again
        this.doBehaviorEvent(map);
    }
}