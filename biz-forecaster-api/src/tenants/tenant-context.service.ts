import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  private _schema: string | undefined;

  set schema(schema: string) {
    this._schema = schema;
  }

  get schema(): string {
    return this._schema || 'public'; // Default to public schema
  }
}