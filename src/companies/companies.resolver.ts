// import { InvoiceModel } from './../invoice/invoice.model';
// import { InvoiceService } from './../invoice/invoice.service';
// import { CustomerService } from './customer.service';
import { Company } from './company.entity';
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

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(
    @Inject(CompaniesService) private companiesService: CompaniesService,
  ) {}
  // @Query((returns) => Company)
  // async customer(@Args('id') id: string): Promise<Company> {
  //   return await this.customerService.findOne(id);
  // }
  // @ResolveField((returns) => [InvoiceModel])
  // async invoices(@Parent() customer) {
  //   const { id } = customer;
  //   console.log(customer);
  //   return this.invoiceService.findByCustomer(id);
  // }
  @Query((returns) => [Company])
  async companies(): Promise<Company[]> {
    return await this.companiesService.findAll();
  }
}
