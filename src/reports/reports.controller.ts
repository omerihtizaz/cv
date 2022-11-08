import {
  Controller,
  Post,
  Body,
  UseGuards,
  Session,
  Param,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { UsersService } from 'src/users/users.service';
import { approveReportDto } from './dtos/approve-report.dto';
import { GenerateEstimateDto } from './dtos/generate-estimate.dto';
@Controller('reports')
export class ReportsController {
  constructor(
    private reportService: ReportsService,
    private userService: UsersService, // private userService: UsersService,
  ) {}
  @Post('/create')
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(@Body() body: CreateReportDto, @Session() session: any) {
    return this.reportService.create(
      body,
      await this.userService.findOne(session.userID),
    );
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  async approveReport(@Param('id') id: number, @Body() body: any) {
    console.log(body.approved);
    return await this.reportService.approveReport(id, body.approved);
  }

  @Get()
  getEstimate(@Query() query: GenerateEstimateDto) {
    return this.reportService.getEstimate(query);
  }

  @Get('remove/:id')
  remove(@Param('id') id: number) {
    this.reportService.remove(id);
  }
}
