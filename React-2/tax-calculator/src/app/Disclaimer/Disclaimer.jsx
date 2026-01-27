import Card from "../../components/Card";
import "./Disclaimer.css"

const Disclaimer = () => (
    <Card content={
    <div className="disclaimer-container">
        <p><span style={{ fontWeight: "bold" }}>Note:</span> This calculator provides estimates based on individual tax rates for residents. It does not include Medicare Levy, HELP/HECS repayments, or other offsets and deductions. Please consult with a tax professional or the ATO for accurate tax advice.</p>
    </div>
    }/>
);

export default Disclaimer;