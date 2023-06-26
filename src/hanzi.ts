class Hanzi {
  constructor(kanji: string) {
      this.kanji = kanji;
  }
  public kanji: string;
  public sisheng: number = 0;
  public category: Array<string> = [];

  add(sisheng: number, category: string) {
      this.sisheng |= sisheng; // 按位或
      this.category.push(category);
  }

  pingzhe = (): string => {
    const punctuations_en = [",", ".", "!", "?"]
    const punctuations_zh = ["，", "。", "？", "！"]
    if (punctuations_en.includes(this.kanji)) {
      return "";
    }
    if (punctuations_zh.includes(this.kanji)) {
      return "";
    }
    const sisheng = this.sisheng
    if ((sisheng & 0b1) == 0b1 && sisheng-1 > 0) {
      return '辨';
    }
    if (sisheng == 1) {
      return '平';
    }
    return '仄';
  }
}

export { Hanzi };