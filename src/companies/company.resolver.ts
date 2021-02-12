// import { InvoiceModel } from './../invoice/invoice.model';
// import { InvoiceService } from './../invoice/invoice.service';
// import { CustomerService } from './customer.service';
import { CompanyModel } from './company.model';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Resolver((of) => CompanyModel)
export class CompanyResolver {
  constructor(
    @Inject(CompaniesService) private companiesService: CompaniesService,
  ) {}
  // @Query((returns) => CompanyModel)
  // async customer(@Args('id') id: string): Promise<CompanyModel> {
  //   return await this.customerService.findOne(id);
  // }
  // @ResolveField((returns) => [InvoiceModel])
  // async invoices(@Parent() customer) {
  //   const { id } = customer;
  //   console.log(customer);
  //   return this.invoiceService.findByCustomer(id);
  // }
  @Query((returns) => [CompanyModel])
  async companies(): Promise<CompanyModel[]> {
    return await this.companiesService.findAll();
  }
}
