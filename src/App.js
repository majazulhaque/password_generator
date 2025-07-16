import { useState } from "react";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import usePasswordGenerator from "./hooks/use-password-generator";
import "./styles.css";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", status: false },
    { title: "Include Lowercase Letters", status: false },
    { title: "Include Numbers", status: false },
    { title: "Include Symbols", status: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].status = !updatedCheckboxData[index].status;

    setCheckboxData(updatedCheckboxData);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleGeneratePassword = () => {
    generatePassword(checkboxData, length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <Button
            onClick={handleCopy}
            text={copied ? "Copied" : "Copy"}
            customClass="copyBtn"
          />
        </div>
      )}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkboxes">
        {checkboxData?.map((checkbox, index) => {
          return (
            <Checkbox
              type="checkbox"
              checked={checkbox.status}
              onChange={handleCheckboxChange}
              label={checkbox.title}
              index={index}
            />
          );
        })}
      </div>
      <PasswordStrengthIndicator password={password} />
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <Button
        onClick={handleGeneratePassword}
        text="Generate Password"
        customClass="generateBtn"
      />
    </div>
  );
}
