export class Nir {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public type: string,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromJson(json: any): Nir {
    return new Nir(
      json.id,
      json.name,
      json.description,
      json.type,
      json.status,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    );
  }
}
