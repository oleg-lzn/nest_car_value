import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsEntity } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsEntity) private repo: Repository<ReportsEntity>,
  ) {}

  create(reportDto: CreateReportDto, user: UserEntity) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async approveReport(approved: boolean, id: string) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;

    return this.repo.save(report);
  }

  async getReports(user?: UserEntity) {
    return this.repo.find({
      where: { user: { id: user?.id } },
      relations: ['user'],
    });
  }
}
