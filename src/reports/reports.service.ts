import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GenerateEstimateDto } from './dtos/generate-estimate.dto';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(dto: CreateReportDto, user: User) {
    const report = this.repo.create(dto);
    // console.log(user);
    report.user = user;
    return this.repo.save(report);
  }
  async findOne(id: number) {
    if (!id) {
      return null;
    }
    console.log('Number: ', id);
    // id = 1;
    console.log(await this.repo.find());
    console.log(Equal(id));
    var report = await this.repo.findOneBy({ id: Equal(id) });
    console.log(report);
    return report;
  }

  async update(id: number, attrs: Partial<Report>) {
    var report = await this.repo.findOneBy({ id: Equal(id) });
    if (!report) {
      throw new Error('No report found with id: ' + id);
    }
    Object.assign(report, attrs);
    console.log(attrs);
    return this.repo.save(report);
  }

  async remove(id: number) {
    var report = await this.repo.findOneBy({ id: Equal(id) });
    if (!report) {
      throw new Error('No report found with id: ' + id);
    }
    return this.repo.remove(report);
  }

  async approveReport(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: id } });
    if (!report) {
      throw new NotFoundException('Report Not Found with ID: ' + id);
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  getEstimate({ make, model, lng, lat, year, mileage }: GenerateEstimateDto) {
    console.log(make, model, lng, lat, year, mileage);
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .andWhere('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng- :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat- :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year- :year BETWEEN -3 and 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage- :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawMany();
  }
}
