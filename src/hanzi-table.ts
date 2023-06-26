import { Hanzi } from './hanzi'

class HanziTable {
    public text: string = "";
    public table: Record<string, Hanzi> = {};

    private pathname: string;

    constructor(pathname: string) {
        this.pathname = pathname;
        this.load();
    }

    parse(text: string) {
      const table: Record<string, Hanzi> = {};
      const clean_text = text.replace(/\[[^\[\]]*\]|,|。|、|,/g, "");
      const arr = clean_text.split(/\r?\n/).filter(line => line.trim() !== "");
      for (let i = 0; i < arr.length; i += 2) {
        const category = arr[i];
        const char_list: Array<string> =  Array.from(arr[i + 1]);
        for (var char of char_list) {
          const hanzi = this.getOrCreate(table, char, Hanzi);
          hanzi.add(this.decide_sisheng(category), category);
        }
      }
      return table;
    }

    getOrCreate (record: any, key: string, initialValue: any) {
      record[key] = record[key] || new initialValue(key);
      return record[key];
    }

    decide_sisheng(category: string): number {
      if (category.includes("上平") || category.includes("下平")) {
        return 0b0001;
      } else if (category.includes("上")) {
        return 0b0010;
      } else if (category.includes("去")) {
        return 0b0100;
      } else { // 入
        return 0b1000;
      }
    }

    async load() {
      try {
        const response = await fetch(`${this.pathname}/data/characters.txt`);
        const text = await response.text();
        this.text = text;
        this.table = this.parse(text);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }
};
export { HanziTable };