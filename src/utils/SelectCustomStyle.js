
const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#282828",
      color:"#e6e6e6"
    }),
  
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = "#282828";
      
      return {
        ...styles,
        backgroundColor: isSelected ? "black" : color,
        color: '#e6e6e6',
        border: 0,
        borderRadius: 0,
        pending:0,
        boxShadow: 'none',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
    input: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#e6e6e6'
      };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = "#282828";
      return {
        ...styles,
        backgroundColor: isSelected ? "black" : color,
        color: isSelected ? '#e6e6e6':'#e6e6e6',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
    singleValue: (provided) => ({
      ...provided,
      color: '#e6e6e6'
    })
    
  }
  export default customStyles;