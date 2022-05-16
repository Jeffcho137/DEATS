import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View } from 'react-native';

export function DateTime({date, setDate}) {
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
  
    return (
      <View>
        <DateTimePickerView text="date" date={date} mode="date" onChange={onChange}/>
        <DateTimePickerView text="time" date={date} mode="time" onChange={onChange}/>
      </View>
    );
  }

  const DateTimePickerView = ({text, date, mode, onChange}) => (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    }}>
        <Text style={{
            fontSize: 15.5,
            fontWeight: "800",
            marginHorizontal: 15
        }}>Choose {text}:</Text>
        <SetDateTimePicker date={date} mode={mode} onChange={onChange}/>
    </View>
)


const SetDateTimePicker = ({date, mode, onChange}) => (
    <DateTimePicker
    style={{ 
        width: 88,
        backgroundColor: 'green',
        alignSelf: 'center',
    }}
    value={date}
    mode={mode}
    is24Hour={true}
    onChange={onChange}
    minimumDate={new Date(Date.now())}
    />
)
