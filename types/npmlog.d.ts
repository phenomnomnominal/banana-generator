declare module 'npmlog' {
    type NpmLogLogger = (...args: Array<string>) => void;

    type NpmLogStyleSettings = {
        bg?: string;
        fg?: string;
    };

    type NpmLogStyle = {
        error?: NpmLogStyleSettings;
        info?: NpmLogStyleSettings;
        warn?: NpmLogStyleSettings;
    };

    type NpmLog = {
        heading?: string;
        headingStyle?: NpmLogStyleSettings;
        style: NpmLogStyle;

        error: NpmLogLogger,
        info: NpmLogLogger,
        warn: NpmLogLogger

        enableUnicode (): void;
    };

    let npmlog: NpmLog;
    export = npmlog;
}
