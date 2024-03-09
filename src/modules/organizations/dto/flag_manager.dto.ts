import { IsNotEmpty, IsString } from 'class-validator';

export class FindFlagManagerDTO {
  @IsNotEmpty()
  @IsString()
  clientId: string;
  @IsNotEmpty()
  @IsString()
  key: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}
