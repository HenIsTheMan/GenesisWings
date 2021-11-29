import TouchGestures from 'TouchGestures';
import Scene from 'Scene';
import Reactive from 'Reactive';
import Instruction from 'Instruction';

(async function (): Promise<void> {
    const feathers: ParticleSystem = await Scene.root.findFirst('Feathers') as ParticleSystem;

    const touchSub: Subscription = TouchGestures.onTap(cover).subscribe((event: TapGesture): void => {
        Instruction.bind(true, 'touch_hold');

        MtlChange();

        cover.getMaterial().then((myMtl: MaterialBase): void => {
            myMtl.opacity = Reactive.val(0.0);
        });

        touchSub.unsubscribe();

        const longPressSub: Subscription = TouchGestures.onLongPress(rect).subscribe((event: LongPressGesture): void => {
            MtlChange();
        });
    });
})();