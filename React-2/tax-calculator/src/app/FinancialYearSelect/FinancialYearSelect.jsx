import Card from "../../components/Card";
import "./FinancialYearSelect.css"

const FinancialYearSelect = () => (
    <Card content={
        <div>
        <p className="label">Select Financial Year:</p>
        <div className="financial-years">
            <button>FY10-19</button>
            <button>FY20-26</button>
        </div>
    </div>
    }/>
);

export default FinancialYearSelect;