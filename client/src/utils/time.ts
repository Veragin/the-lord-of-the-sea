export class Time {
    protected _timeMs: number;

    constructor(timeMs: number) {
        this._timeMs = Math.floor(timeMs);
    }

    static fromMs(timeMs: number) {
        return new Time(timeMs);
    }

    static fromS(timeS: number) {
        return new Time(timeS * 1_000);
    }

    static now() {
        return Time.fromMs(Date.now());
    }

    get ms() {
        return this._timeMs;
    }

    get s() {
        return this._timeMs / 1_000;
    }

    isEqual(otherTime: Time) {
        return this.ms === otherTime.ms;
    }

    isBefore(otherTime: Time) {
        return this.ms < otherTime.ms;
    }

    isAfter(otherTime: Time) {
        return this.ms > otherTime.ms;
    }

    moveToFutureBy(deltaTime: DeltaTime) {
        return Time.fromMs(this.ms + deltaTime.ms);
    }

    moveToHistoryBy(deltaTime: DeltaTime) {
        return Time.fromMs(this.ms - deltaTime.ms);
    }
}

export class DeltaTime {
    protected _deltaTimeMs: number;
    constructor(deltaTimeMs: number) {
        this._deltaTimeMs = Math.floor(deltaTimeMs);
    }

    static fromMs(deltaTimeMs: number) {
        return new DeltaTime(deltaTimeMs);
    }

    static fromS(deltaTimeS: number) {
        return new DeltaTime(deltaTimeS * 1_000);
    }

    static distance(time1: Time, time2: Time) {
        return new DeltaTime(Math.abs(time1.ms - time2.ms));
    }

    get ms() {
        return this._deltaTimeMs;
    }

    get s() {
        return this._deltaTimeMs / 1_000;
    }
}
