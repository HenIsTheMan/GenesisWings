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
    const feathers: ParticleSystem = await Scene.root.findAll('Feathers')[0] as ParticleSystem;
    const rect: Mesh = await Scene.root.findAll('Rect')[0] as Mesh;

    feathers.hidden = Reactive.val(true);

    function* MyRoutine(): IterableIterator<Wait> {
        feathers.hidden = Reactive.val(false);

        yield new WaitForMilliseconds(5700);

        feathers.hidden = Reactive.val(true);
    }

    const touchSub: Subscription = TouchGestures.onTap(rect).subscribe((event: TapGesture): void => {
        //Instruction.bind(true, 'touch');

        if(feathers.hidden == Reactive.val(true)) {
            StartCoroutine(MyRoutine);
        }
    });
})();