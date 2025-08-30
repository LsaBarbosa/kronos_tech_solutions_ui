 

export interface EmployeeResponse {
  employeeId: string;
  fullName: string;
  maskedCpf: string;
  jobPosition: string;
  email: string;
  salary: number;
  phone: string;
  address: AddressResponse;
  companyId: string;
}

export interface AddressResponse {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  state: string;
}