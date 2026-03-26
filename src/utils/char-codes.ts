export class CharCodes {

    public static HT = 9;
    
    public static LF = 10;
    
    public static VT = 11;
    
    public static FF = 12;
    
    public static CR = 13;
    
    public static SP = 32;

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