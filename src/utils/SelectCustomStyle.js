
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
        color: '#FFF',
        border: 0,
        borderRadius: 0,
        pending:0,
        boxShadow: 'none',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = "#282828";
      return {
        ...styles,
        backgroundColor: isSelected ? "black" : color,
        color: isSelected ? '#FFF':'#e6e6e6',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
    singleValue: (provided) => ({
      ...provided,
      color: '#e6e6e6'
    })
    
  }
  export default customStyles;