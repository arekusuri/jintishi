class Hanzi {
    public zi: string;
    public is_ping: boolean;
    public sisheng: string;
    public category: string;
    constructor(zi: string, is_ping: boolean, sisheng: string, category: string) {
        this.zi = zi;
        this.is_ping = is_ping;
        this.sisheng = sisheng
        this.category = category;
    }
}

export { Hanzi };