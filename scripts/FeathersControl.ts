import TouchGestures from 'TouchGestures';
import Scene from 'Scene';
import Reactive from 'Reactive';
import Diagnostics from 'Diagnostics';

import {
    Wait,
    WaitForMilliseconds,
    StartCoroutine
} from './Coroutine'

(async function(): Promise<void> {
    const feathers: ParticleSystem = await Scene.root.findFirst('Feathers') as ParticleSystem;
    const rect: SceneObjectBase = await Scene.root.findFirst('Rect') as SceneObjectBase;

    feathers.birthrate = Reactive.val(0);

    function* MyRoutine(): IterableIterator<Wait> {
        feathers.birthrate = Reactive.val(100);

        yield new WaitForMilliseconds(5700);

        feathers.birthrate = Reactive.val(0);
    }

    const touchSub: Subscription = TouchGestures.onTap(rect).subscribe((event: TapGesture): void => {
        Diagnostics.log("here");

        if(feathers.birthrate.eq(0.0)) {
            Diagnostics.log("hereInside");
            StartCoroutine(MyRoutine);
        }
    });
})();