import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';
export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  mileage: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userID: number;
  @Expose()
  approved: boolean;
}
