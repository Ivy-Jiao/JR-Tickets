import Card from "../../components/Card";
import "./FinancialYearSelect.css"

const FinancialYearSelect = () => (
    <Card content={
        <div>
        <p className="financial-year-label">Select Financial Year:</p>
        <div className="financial-year-buttons">
            <button className="financial-year-button is active" type="button">
                FY2023-24</button>
            <button className="financial-year-button" type="button">
                FY2024-25</button>
        </div>
    </div>
    }/>
);

export default FinancialYearSelect;