import Card from "../../components/Card";
import "./TaxRateTableFinancialYear.css"

const TaxRateTableForFinancialYear = () => (
    <Card content={
        <div >
        <h2 className="tax-title">Tax Rates - FY 2023-24</h2>
        <div className="tax-table-wrapper">
            <table className="tax-table">
                <thead>
                    <tr>
                        <th>Taxable Income</th>
                        <th>Tax Rate</th>
                    </tr>
                    <tr>
                        <td>$0 - $18,200</td>
                        <td>Nil</td>
                    </tr>
                    <tr>
                        <td>$18,201 - $45,000</td>
                        <td>16%</td>
                    </tr>
                    <tr>
                        <td>$45,001 - $120,000</td>
                        <td>30%</td>
                    </tr>
                    <tr>
                        <td>$120,001 - $180,000</td>
                        <td>37%</td>
                    </tr>
                    <tr>
                        <td>$180,001 and above</td>
                        <td>50%</td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    }/> 
);

export default TaxRateTableForFinancialYear;