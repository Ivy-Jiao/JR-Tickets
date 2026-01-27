import Card from "../../components/Card";
import Form from "./components/Form/Form";
import Result from "./components/Result";
import "./Calculator.css"

const Calculator = () => (
    <Card content={<div >
        <h2 className="calculator-title">Calculate Tax</h2>
        <Form />
        <Result />
    </div>}/>
);

export default Calculator;