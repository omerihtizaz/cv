import { Expose } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(100000)
  price: number;
  @IsLatitude()
  lat: number;
  @IsLongitude()
  lng: number;
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;
  @IsString()
  model: string;
  @IsString()
  make: string;
  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage: number;
}
