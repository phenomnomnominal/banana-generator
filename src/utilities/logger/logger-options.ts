// TODO: Deduplicate this, it is also in npmlog.d.ts.
// Types are hard.
export type NpmLogStyleSettings = {
    bg?: string;
    fg?: string;
};

export class LoggerOptions {
    public prefix?: string;

    public heading?: string;
    public headingStyle?: NpmLogStyleSettings;

    public errorStyle?: NpmLogStyleSettings;
    public infoStyle?: NpmLogStyleSettings;
    public warnStyle?: NpmLogStyleSettings;
}
