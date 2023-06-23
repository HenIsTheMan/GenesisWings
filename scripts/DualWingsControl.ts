import Materials from 'Materials';
import Reactive from 'Reactive';
import Time from 'Time';

(async function (): Promise<void> {
    const dualWingsRegularMtl: DefaultMaterial = await Materials.findFirst('DualWingsRegularMtl') as DefaultMaterial;

    dualWingsRegularMtl.diffuseTextureTransform.offsetV = Reactive.sin(Time.ms.mul(0.007)).mul(0.017);
})();