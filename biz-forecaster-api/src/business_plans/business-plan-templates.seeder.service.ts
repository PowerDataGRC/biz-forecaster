import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessPlanTemplate } from './business-plan-template.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BusinessPlanTemplatesSeederService {
  private readonly logger = new Logger(BusinessPlanTemplatesSeederService.name);

  constructor(
    @InjectRepository(BusinessPlanTemplate)
    private readonly templateRepository: Repository<BusinessPlanTemplate>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    this.logger.log('Starting to seed Business Plan Templates...');

    // We need a user to associate as the creator of the template.
    // In a real scenario, you might have a dedicated system user.
    // Here, we'll just grab the first user we find.
    const adminUser = await this.userRepository.findOne({ where: {} });

    if (!adminUser) {
      this.logger.error('No users found in the database. Cannot seed templates without a creator. Please seed users first.');
      return;
    }

    const standardTemplate = {
      name: 'Standard Startup Plan',
      description: 'A comprehensive business plan template for new ventures.',
      category: 'startup',
      is_global: true,
      is_active: true,
      created_by: adminUser,
      structure: [
        { type: 'executive_summary', title: 'Executive Summary' },
        { type: 'company_description', title: 'Company Description' },
        { type: 'market_analysis', title: 'Market Analysis' },
        { type: 'organization_and_management', title: 'Organization and Management' },
        { type: 'service_or_product_line', title: 'Service or Product Line' },
        { type: 'marketing_and_sales', title: 'Marketing and Sales Strategy' },
        { type: 'financial_projections', title: 'Financial Projections' },
        { type: 'appendix', title: 'Appendix' },
      ],
    };

    const existingTemplate = await this.templateRepository.findOneBy({
      name: standardTemplate.name,
    });

    if (existingTemplate) {
      this.logger.log(`Template "${standardTemplate.name}" already exists. Skipping.`);
    } else {
      this.logger.log(`Creating template: "${standardTemplate.name}"`);
      const newTemplate = this.templateRepository.create(standardTemplate);
      await this.templateRepository.save(newTemplate);
      this.logger.log(`Successfully created template: "${standardTemplate.name}"`);
    }

    this.logger.log('Finished seeding Business Plan Templates.');
  }
}