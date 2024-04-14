// 👉 Client
export interface Client {
  address: string
  company: string
  companyEmail: string
  country: string
  contact: string
  name: string
}

// 👉 Invoice
export interface Invoice {
  id: number
  issuedDate: string
  client: Client
  service: string
  total: number
  avatar: string
  invoiceStatus: string
  balance: number
  dueDate: string
}
