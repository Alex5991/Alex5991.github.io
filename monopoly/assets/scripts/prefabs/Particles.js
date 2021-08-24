class Particles extends Phaser.GameObjects.Particles.ParticleEmitterManager {
    constructor(scene, texture, frame) {
        super(scene, texture, frame);

        this.scene.add.existing(this); // Добавляем на сцену
        this.setDepth(10); // Поверх других объектов
    }
    createEmitterBuild(x, y) {
        // Инициализация эмиттера
        var emitter = this.createEmitter();
        emitter.setPosition(x, y);
        emitter.setSpeed(100);
        emitter.setBlendMode(Phaser.BlendModes.ADD);

        emitter.maxParticles = 25;
        // Удаление через некоторое время
        emitter.onParticleDeath(()=>{
            if (emitter.getDeadParticleCount() == 25) {
                this.removeEmitter(emitter);
            }
        }, this);
    }
    // static createEmitterPlayer(scene, x, y) {
    //     let image = scene.add.image(x, y, 'smoke');
    //     image.setScale(0.2);
    //     image.setDepth(1);

    //     let anim = (frame) => {
    //         frame --;
    //         if (frame) {
    //             image.setFrame(frame);
    //             scene.time.delayedCall(500, ()=>anim(frame));
    //         } else {
    //             image.destroy();
    //         }
    //     }

    //     anim(3); // Число анимаций задом наперед
    // }

}