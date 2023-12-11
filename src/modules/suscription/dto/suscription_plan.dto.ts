import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class SuscriptionPlanResponse {
  @Field()
  counter: number;
}

@InputType({ isAbstract: true })
@InterfaceType({ isAbstract: true })
export class GetSuscriptionPlanInput {
  @Field({ nullable: true })
  counter: number;
}
