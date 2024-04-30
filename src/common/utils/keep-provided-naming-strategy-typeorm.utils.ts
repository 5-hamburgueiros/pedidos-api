import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

// https://github.com/typeorm/typeorm/blob/master/src/naming-strategy/DefaultNamingStrategy.ts
export class KeepProvidedNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : targetName;
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return embeddedPrefixes
      .concat(customName ? customName : propertyName)
      .join('');
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return propertyName;
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return relationName + referencedColumnName;
  }
}
