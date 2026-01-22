import Calculator from "./app/Calculator"
import Disclaimer from "./app/Disclaimer"
import FinancialYearSelect from "./app/FinancialYearSelect"
import Header from "./app/Header"
import TaxRateTableForFinancialYear from "./app/TaxRateTableForFinancialYear"
import "./App.css"

function App() {
  return (
    <div className="main">
      <div className="header">
        <Header />
      </div>

      <FinancialYearSelect />

      <div className="content">
        <TaxRateTableForFinancialYear />
        <Calculator />
      </div>

      <Disclaimer />

    </div>
  )
}


export default App
