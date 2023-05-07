class Hanzi {
    public sisheng: number = 0;
    public category: Array<string> = [];

    add(sisheng: number, category: string) {
        this.sisheng |= sisheng; // 按位或
        this.category.push(category);
    }
}

export { Hanzi };