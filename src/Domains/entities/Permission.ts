import SchemaChecker from '@conglicorp/schema-checker';

export default class Permission {
  private _mandatoryFields: Record<string, any> = {
    id: 'string',
    name: 'string',
    description: 'string',
  };
  private _schemaChecker: SchemaChecker;
  private _className = 'PERMISSION';
  private _id: string;
  private _name: string;
  private _description: string;

  constructor(payload: any) {
    this._schemaChecker = new SchemaChecker(this._mandatoryFields);
    this._verifyPayload(payload);

    const {id, name, description} = payload;
    this._id = id;
    this._name = name;
    this._description = description;
  }

  private _verifyPayload(payload: any) {
    try {
      this._schemaChecker.isHavePayload(payload);
      this._schemaChecker.isPayloadHaveMandatoryField(payload);
      this._schemaChecker.isPayloadHaveAppropriateSchema(payload);
    } catch (err) {
      throw new Error(`${this._className}.${(err as Error).message}`);
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }
}
