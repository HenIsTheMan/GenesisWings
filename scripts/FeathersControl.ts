import TouchGestures from 'TouchGestures';
import Scene from 'Scene';
import Reactive from 'Reactive';

import {
    Wait,
    WaitForMilliseconds,
    StartCoroutine
} from './Coroutine'

(async function(): Promise<void> {
    const featherParticleSystem: ParticleSystem = await Scene.root.findFirst('FeatherParticleSystem') as ParticleSystem;
    const rect: SceneObjectBase = await Scene.root.findFirst('Rect') as SceneObjectBase;

    featherParticleSystem.birthrate = Reactive.val(0.0);

    function* MyRoutine(): IterableIterator<Wait> {
        featherParticleSystem.birthrate = Reactive.val(100.0);

        yield new WaitForMilliseconds(4700);

        featherParticleSystem.birthrate = Reactive.val(0.0);
    }

    const touchSub: Subscription = TouchGestures.onTap(rect).subscribe((event: TapGesture): void => {
        if(featherParticleSystem.birthrate.pinLastValue() == 0.0) {
            StartCoroutine(MyRoutine);
        }
    });
})();