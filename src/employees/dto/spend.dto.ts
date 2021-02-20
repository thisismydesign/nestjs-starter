import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TaxableSpend {
  @Field()
  thirtyPercentBracket: number;
}

@ObjectType()
export class SpendDto {
  @Field()
  total: number;

  @Field()
  taxFree: number;

  @Field()
  taxable: TaxableSpend;
}
