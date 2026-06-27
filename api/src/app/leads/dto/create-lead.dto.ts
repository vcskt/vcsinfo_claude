export class CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  source?: string;
  locale?: string;
}
