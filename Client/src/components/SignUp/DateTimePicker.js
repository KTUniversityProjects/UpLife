class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "1990-06-05",
      format: "YYYY-MM-DD",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  }

  handleChange = newDate => {
    console.log("newDate", newDate);
    return this.setState({ date: newDate });
  };

  render() {
    const { date, format, mode, inputFormat } = this.state;
    return (
      <DateTimeField
        dateTime={date}
        format={format}
        viewMode={mode}
        inputFormat={inputFormat}
        onChange={this.handleChange}
      />
    );
  }
}

export default DateTimePicker;
