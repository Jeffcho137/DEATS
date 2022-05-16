import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export function DateTime() {
    const [date, setDate] = useState(new Date(Date.now()));
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    return (
      <View>
        <Text>selected: {date.toLocaleString()}</Text>
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
        margin: 20,
    }}>
        <Text style={{
            fontSize: 15.5,
            fontWeight: "800",
            marginHorizontal: 15
        }}>Pick {text}:</Text>
        <SetDateTimePicker date={date} mode={mode} onChange={onChange}/>
    </View>
)


const SetDateTimePicker = ({date, mode, onChange}) => (
    <DateTimePicker
    style={{ 
        width: 88,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 50,
    }}
    value={date}
    mode={mode}
    is24Hour={true}
    onChange={onChange}
    minimumDate={new Date(Date.now())}
    />
)
