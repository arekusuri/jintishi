
class Character {
    private pathname: string;

    constructor(pathname: string) {
        this.pathname = pathname;
    }

    async parse() {
        fetch(`${this.pathname}/data/characters.txt`)
            .then((response) => response.text())
            .then((text) => {
                console.log(text)
            })
    }
}
export { Character };