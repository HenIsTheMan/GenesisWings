import TouchGestures from 'TouchGestures';
import Scene from 'Scene';
import Reactive from 'Reactive';

import {
    Wait,
    WaitForMilliseconds,
    StartCoroutine
} from './Coroutine'

(async function(): Promise<void> {
    const feathers: ParticleSystem = await Scene.root.findFirst('Feathers') as ParticleSystem;
    const rect: SceneObjectBase = await Scene.root.findFirst('Rect') as SceneObjectBase;

    feathers.hidden = Reactive.val(true);

    function* MyRoutine(): IterableIterator<Wait> {
        feathers.hidden = Reactive.val(false);

        yield new WaitForMilliseconds(5700);

        feathers.hidden = Reactive.val(true);
    }

    const touchSub: Subscription = TouchGestures.onTap(rect).subscribe((event: TapGesture): void => {
        if(feathers.hidden.pinLastValue) {
            StartCoroutine(MyRoutine);
        }
    });
})();