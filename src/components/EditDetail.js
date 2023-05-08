import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask,editTask } from "../redux/taskSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from '@react-native-community/checkbox';

function dateFormater(date, separator) {
  var day = date.getDate();

  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return day + separator + month + separator + year;
}

const EditDetail = (props) => {

  const dispatch = useDispatch();
  const {navigation,route}=props
  const {navigate,goBack}=navigation

  const [toggleCheckBox, setToggleCheckBox] = useState(route.params.item.done)
  const [dates, setDates] = useState(route.params.item.date);
  const [description,setDescription] =useState(route.params.item.description)
  const [title,setTitle] =useState(route.params.item.name)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDates(dateFormater(date, '/'));
    hideDatePicker();
  };

  const onSubmitTask = () => {
    if (title.trim().length === 0) {
      Alert.alert("You need to enter a task");
      setTitle("");
      return;
    }

    dispatch(
      editTask({
        id:route.params.item.id,
        task: title,
        description:description,
        dateDo:dates,
        done:toggleCheckBox
      })
    );
    setTitle("");
    setDescription("");
    setDates("");
    setToggleCheckBox(false);
  };

  const saveitem=()=>{
    onSubmitTask();
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10, color: 'black' }}>Detail</Text>
      <View>

        <Text style={styles.txt}>Title</Text>
        <TextInput style={styles.textInput}
          value={title}
          onChangeText={setTitle}>
          </TextInput>

        <Text style={styles.txt}>Description</Text>
        <TextInput style={styles.textInput}
          value={description}
          onChangeText={setDescription}>
          </TextInput>

        <Text style={styles.txt}>Time</Text>
        <Text style={[styles.textInput,
          {paddingVertical:10,paddingLeft:5}]}>
          {dates}
        </Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.txt}>Mask as done</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
        </View>
      </View>
      <TouchableOpacity style={{height:53,width:320,position:'absolute',left:20,top:310}} onPress={showDatePicker}></TouchableOpacity>
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity style={{ backgroundColor: 'blue', marginHorizontal: 50, paddingVertical: 10, borderRadius: 10, marginBottom: 20 }} onPress={saveitem}>
        <Text style={{ color: 'white', fontSize: 25, alignSelf: 'center', fontWeight: 'bold' }}>
          Save
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditDetail;

const styles = StyleSheet.create({
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    fontSize: 25,
    color: 'black',
    marginBottom: 15
  }
});
