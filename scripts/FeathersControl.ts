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
    const faceMesh: FaceMesh = await Scene.root.findFirst('FaceMesh') as FaceMesh;
    const featherParticleSystem: ParticleSystem = await Scene.root.findFirst('FeatherParticleSystem') as ParticleSystem;
    const rect: SceneObjectBase = await Scene.root.findFirst('Rect') as SceneObjectBase;
    const dualWingsRegularMtl: MaterialBase = await Materials.findFirst('DualWingsRegularMtl') as MaterialBase;
    const featherRegularMtl: MaterialBase = await Materials.findFirst('FeatherRegularMtl') as MaterialBase;
    const dualWingsRGBMtl: MaterialBase = await Materials.findFirst('DualWingsRGBMtl') as MaterialBase;
    const featherRGBMtl: MaterialBase = await Materials.findFirst('FeatherRGBMtl') as MaterialBase;

    featherParticleSystem.birthrate = Reactive.val(0.0);

    const selectedOptionIndexSignal: ScalarSignal = await Patches.outputs.getScalar('selectedOptionIndex');
    const optionSelectedSub: Subscription = selectedOptionIndexSignal.monitor().subscribe(function (event: {
        newValue: number;
        oldValue: number;
    }): void {
        switch(event.newValue) {
            case 0:
                faceMesh.material = dualWingsRegularMtl;
                featherParticleSystem.material = featherRegularMtl;
                break;
            case 1:
                faceMesh.material = dualWingsRegularMtl;
                featherParticleSystem.material = featherRGBMtl;
                break;
            case 2:
                faceMesh.material = dualWingsRGBMtl;
                featherParticleSystem.material = featherRegularMtl;
                break;
            case 3:
                faceMesh.material = dualWingsRGBMtl;
                featherParticleSystem.material = featherRGBMtl;
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