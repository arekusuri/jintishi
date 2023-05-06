class Hanzi {
    public zi: string;
    public is_ping: boolean;
    public category: string;
    constructor(zi: string, is_ping: boolean, category: string) {
        this.zi = zi;
        this.is_ping = is_ping;
        this.category = category;
    }
}

export { Hanzi };