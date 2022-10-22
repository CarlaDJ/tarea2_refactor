export class InvoiceUtilities {
    static printInvoice(invoices, plays) {
        let totalAmount = 0;
        let volumeCredits = 0;
        let result = `Detalle de factura para ${invoices[0].customer}\n`;
        const format = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format;
        for (let perf of invoices[0].performances) {
            const play = plays[perf.playID];
            let thisAmount = 0;
            switch (play.type) {
                case "tragedy":
                    thisAmount = 40000;
                    if (perf.audience > 30) {
                        thisAmount += 1000 * (perf.audience - 30);
                    }
                    break;
                case "comedy":
                    thisAmount = 30000;
                    if (perf.audience > 20) {
                        thisAmount += 10000 + 500 * (perf.audience - 20);
                    }
                    thisAmount += 300 * perf.audience;
                    break;
                default:
                    throw new Error(`Tipo desconocido: ${play.type}`);
            }
            // add volume credits
            volumeCredits += Math.max(perf.audience - 30, 0);
            // add extra credit for every ten comedy attendees
            if ("comedy" === play.type)
                volumeCredits += Math.floor(perf.audience / 5);
            // print line for this order
            result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience} asientos)\n`;
            totalAmount += thisAmount;
        }
        result += `Total a pagar ${format(totalAmount / 100)}\n`;
        result += `Has ganado ${volumeCredits} creditos\n`;
        return result;
    }
}
