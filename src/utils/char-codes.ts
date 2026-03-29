export class CharCodes {

    public static readonly HT = 9;
    
    public static readonly LF = 10;
    
    public static readonly VT = 11;
    
    public static readonly FF = 12;
    
    public static readonly CR = 13;
    
    public static readonly SP = 32;

    public static readonly LessThan = 60;

    public static readonly GreaterThan = 62;

    public static readonly Tilde = 126;

    private constructor() {}

    public static isWhitespace = (c: string | number) => {

        const type = typeof c;

        if (type !== 'string' && type !== 'number')
            throw new Error('invalid argument type.');

        if (type === 'string' && (c as string).length !== 1)
            throw new Error('inalid argument: not a character');

        const code = typeof c === 'string'
            ? c.charCodeAt(0)
            : c as number;

        return (this.HT <= code && code <= this.CR) || code === this.SP;
    }
}