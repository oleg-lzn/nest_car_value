import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve.report.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private ReportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: UserEntity,
  ) {
    const report = await this.ReportsService.create(body, user);
    return report;
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(@Body() body: ApproveReportDto, @Param('id') id: string) {
    const report = await this.ReportsService.approveReport(body.approved, id);
    return report;
  }

  @Get()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async getReports(@CurrentUser() user: UserEntity) {
    const reports = await this.ReportsService.getReports(user);
    return reports;
  }
}
