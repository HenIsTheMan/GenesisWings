import TouchGestures from 'TouchGestures';
import Scene from 'Scene';
import Reactive from 'Reactive';
import Patches from 'Patches';
import Materials from 'Materials';

import {
    Wait,
    WaitForMilliseconds,
    StartCoroutine
} from './Coroutine'

(async function(): Promise<void> {
    const featherParticleSystem: ParticleSystem = await Scene.root.findFirst('FeatherParticleSystem') as ParticleSystem;
    const rect: SceneObjectBase = await Scene.root.findFirst('Rect') as SceneObjectBase;
    const dualWingsMtl: MaterialBase = await Materials.findFirst('DualWingsMtl') as MaterialBase;
    const featherMtl: MaterialBase = await Materials.findFirst('FeatherMtl') as MaterialBase;

    featherParticleSystem.birthrate = Reactive.val(0.0);

    const selectedOptionIndexSignal: ScalarSignal = await Patches.outputs.getScalar('selectedOptionIndex');
    const optionSelectedSub: Subscription = selectedOptionIndexSignal.monitor().subscribe(function (event: {
        newValue: number;
        oldValue: number;
    }): void {
        switch(event.newValue) {
            case 0:
                break;
            case 1:
                break;
        }
    });

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