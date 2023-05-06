
import { Hanzi } from './hanzi'

class Characters {
    private pathname: string;
    public text: string = "";

    constructor(pathname: string) {
        this.pathname = pathname;
        this.load();
    }

    parse() {
      const text = this.text;
      const dict: Record<string, Hanzi> = {};
      const clean_text = text.replace(/\[[^\[\]]*\]|,|。|、|,/g, "");
      const arr = clean_text.split(/\r?\n/).filter(line => line.trim() !== "");
      for (let i = 0; i < arr.length; i += 2) {
        const info = arr[i]
        const list =  Array.from(arr[i + 1]);
        for (var c of list) {
          dict[c] = new Hanzi(c, info.includes('平'), this.decide_sisheng(info), info)
        }
      }
      return dict;
    }

    decide_sisheng(category: string): string {
      if (category.includes("上平") || category.includes("下平")) {
        return "平";
      } else if (category.includes("上")) {
        return "上";
      } else if (category.includes("去")) {
        return "去";
      } else {
        return "入";
      }

    }

    async load() {
      try {
        const response = await fetch(`${this.pathname}/data/characters.txt`);
        const text = await response.text();
        this.text = text;
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }
}
export { Characters };