const Checkbox = ({ type, checked, onChange, label, index }) => {
  return (
    <div key={index}>
      <input type={type} checked={checked} onChange={() => onChange(index)} />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
