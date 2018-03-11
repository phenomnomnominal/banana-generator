// Dependencies:
import { Injectable } from 'injection-js';
import * as npmlog from 'npmlog';
import { LoggerOptions } from './logger-options';

npmlog.enableUnicode();

@Injectable()
export class Logger {
    private _prefix: string;

    constructor (options: LoggerOptions) {
        this._prefix = options.prefix || '';

        let { style } = npmlog;

        (<any>npmlog).heading = options.heading;
        (<any>npmlog).headingStyle = options.headingStyle;

        style.error = options.errorStyle;
        style.info = options.infoStyle;
        style.warn = options.warnStyle;
    }

    public info (...args: Array<string>): void {
        npmlog.info(this._prefix, ...args);
    }

    public warn (...args: Array<string>): void {
        npmlog.warn(this._prefix, ...args);
    }

    public error (...args: Array<string>): void {
        npmlog.error(this._prefix, ...args);
    }
}
