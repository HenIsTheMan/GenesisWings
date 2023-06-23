import Time from 'Time';

export abstract class Wait {
    abstract Setup(iter: IterableIterator<Wait>): void;

    public static HandleNext(iter: IterableIterator<Wait>): void {
        let n = iter.next();
        if (n.done) {
            return;
        }

        n.value.Setup(iter);
    };
}

export class WaitForMilliseconds extends Wait {
    private waitTime: number;

    constructor(waitTime: number) {
        super();
        this.waitTime = waitTime;
    }

    Setup(iter: IterableIterator<Wait>): void {
        let timerID = Time.setTimeout(function (): void {
            Wait.HandleNext(iter);
        }, this.waitTime);
    }
}

export function StartCoroutine(func: () => IterableIterator<Wait>): void {
    Wait.HandleNext(func());
}