import {invoices} from './invoices.js';
import {plays} from './plays.js';
import { InvoiceUtilities } from './InvoiceUtilities.js';
const invoicesJSON = await JSON.parse(invoices);
const playsJSON = await JSON.parse(plays);
console.log(InvoiceUtilities.printInvoice(invoicesJSON, playsJSON));

