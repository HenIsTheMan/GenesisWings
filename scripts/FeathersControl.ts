import TouchGestures from 'TouchGestures';
import Scene from 'Scene';
import Reactive from 'Reactive';
import Instruction from 'Instruction';

import {
    Wait,
    WaitForMilliseconds,
    StartCoroutine
} from './Coroutine'

(async function (): Promise<void> {
    const feathers: ParticleSystem = await Scene.root.findFirst('Feathers') as ParticleSystem;
    const rect: SceneObjectBase = await Scene.root.findFirst('Rect') as SceneObjectBase;

    function* MyRoutine(): IterableIterator<Wait> {
        feathers.hidden = Reactive.val(false);

        yield new WaitForMilliseconds(5700);

        feathers.hidden = Reactive.val(true);
    }

    const touchSub: Subscription = TouchGestures.onTap(rect).subscribe((event: TapGesture): void => {
        //Instruction.bind(true, 'touch');

        if(feathers.hidden.pinLastValue) {
            StartCoroutine(MyRoutine);
        }
    });
})();