import "./Form.css"

const Form = () => (
    <form className="calculator-form">
        <div className="calculator-field">
            <lable className="calculator-label"Annual Taxable Income></lable>
            <div className="calculator-input-wrap">
                <span className="calculator-currency">$</span>
                <input className="caluculator-input" 
                type="number"
                placeholder="Enter your income"
                min="0"
                step="0.01"
                />
            </div>
        </div>

        <button className="calculator-button" type="button">
            Calculate Tax
        </button>
    </form>
);

export default Form;