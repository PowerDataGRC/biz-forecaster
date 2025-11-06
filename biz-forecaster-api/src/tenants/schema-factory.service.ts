import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

@Injectable()
export class SchemaFactoryService {
  /**
   * Generates a database-safe schema name based on specific business rules.
   * Rules:
   * - Prefixed with 'ORG_'.
   * - Based on the first three characters of the company name.
   * - Spaces and special characters are removed.
   * - If a space is the second character (e.g., "A B C Corp"), the third character becomes 'X'.
   * - If the name is less than 3 characters, it's padded with 'X'.
   * @param companyName The raw company name from the registration form.
   * @returns The generated schema name (e.g., 'ORG_ACM', 'ORG_AXX').
   */
  generateSchemaName(companyName: string): string {
    // Rule: Check if a space exists as the second character of the raw name.
    const spaceRuleApplies = companyName.length > 1 && companyName[1] === ' ';

    // Clean the company name by removing all non-alphanumeric characters and converting to uppercase.
    const cleanedName = companyName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    let baseName = '';

    if (cleanedName.length === 0) {
      baseName = 'XXX';
    } else if (cleanedName.length < 3) {
      // Rule: Pad with 'X' if the cleaned name is less than 3 chars (e.g., "A" -> "AXX", "AX" -> "AXX").
      baseName = cleanedName.padEnd(3, 'X');
    } else {
      // Base case: take the first three characters of the cleaned name.
      baseName = cleanedName.substring(0, 3);
    }

    // Apply the special space rule after the base name has been determined.
    if (spaceRuleApplies && baseName.length === 3) {
      baseName = baseName.substring(0, 2) + 'X';
    }

    return `org_${baseName.toLowerCase()}`;
  }

  /**
   * Creates the required tables in a tenant's schema
   * @param queryRunner The TypeORM query runner to use
   * @param schemaName The name of the schema to create tables in
   */
  async createTenantTables(queryRunner: QueryRunner, schemaName: string): Promise<void> {
    try {
      // Create users table
      await queryRunner.query(`
        CREATE TABLE "${schemaName}".users (
          user_id UUID PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          username VARCHAR(255) NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Add other tenant-specific tables here...

    } catch (error) {
      throw new Error(`Failed to create tenant tables: ${error.message}`);
    }
  }
}