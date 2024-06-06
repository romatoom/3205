import fs from "fs/promises";
import Item from "../types/item.ts";
import Path from "path";

export default class DataProcessor {
  pathToDataJSON: string;
  data: Item[];
  schema: any;

  constructor({ pathToDataJSON }: { pathToDataJSON: string }) {
    this.pathToDataJSON = pathToDataJSON;
    this.data = [];
  }

  static async init({ pathToDataJSON }: { pathToDataJSON: string }) {
    const instance = new DataProcessor({ pathToDataJSON });
    await instance.loadData();
    await instance.loadSchema();
    return instance;
  }

  async loadData() {
    let data;

    try {
      data = await fs.readFile(this.pathToDataJSON, { encoding: "utf8" });
    } catch (err) {
      console.error("Error reading data file");
      throw new Error("Error reading data file");
    }

    try {
      this.data = JSON.parse(data);
    } catch (err) {
      console.error("Data parsing error");
      throw new Error("Data parsing error");
    }
  }

  async loadSchema() {
    try {
      const filename = Path.parse(this.pathToDataJSON).name;
      const { default: schema } = await import(`../schemas/${filename}.ts`);
      this.schema = schema;
    } catch (err) {
      console.error("Error in schema");
      throw new Error("Error in schema");
    }
  }

  findItems(item: Item) {
    return this.data.filter((el) => {
      for (const key in item) {
        if (item[key as keyof Item] === "") continue;
        if (item[key as keyof Item] !== el[key as keyof Item]) {
          return false;
        }
      }

      return true;
    });
  }

  valide(item: Item) {
    return this.schema.validate(item);
  }
}
