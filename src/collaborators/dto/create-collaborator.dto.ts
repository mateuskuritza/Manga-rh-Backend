import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  readonly name: string;

  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
  readonly cpf: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @Matches(/\(?\d{2,}\)?[ -]?\d{4,}[\-\s]?\d{4}/)
  @Length(15)
  @IsMobilePhone('pt-BR')
  readonly phone: string;

  @IsArray()
  @IsPositive({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  readonly knowledges: number[];
}
