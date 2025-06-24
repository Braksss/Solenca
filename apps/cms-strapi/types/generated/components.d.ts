import type { Schema, Struct } from '@strapi/strapi';

export interface DescriptionFeatures extends Struct.ComponentSchema {
  collectionName: 'components_description_features';
  info: {
    displayName: 'features';
  };
  attributes: {
    included: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'description.features': DescriptionFeatures;
    }
  }
}
