import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from '@react-native-community/checkbox';
const TodoList = (props) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.tasks);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const { navigation, route } = props
  const { navigate, goBack } = navigation

 

  const renderItem = ({ item, index }) => {
    return (

      <TouchableOpacity style={styles.container} onPress={()=>navigate('EditDetail',{item})}>
        <View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={[styles.txt, { marginRight: 10 }]}>#{index + 1}</Text>
            <Text style={styles.txt}>{item.name}</Text>
          </View>
          <Text style={styles.txt}>{item.date}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <CheckBox
            disabled={item.done}
            value={item.done}
            style={styles.checkbox}
          />
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row',marginTop:10 }}>
        <View style={{flex:1}}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginVertical: 5, color: 'black', flex: 1 }}>List todo</Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: 'blue', marginHorizontal: 5, paddingVertical: 5,paddingHorizontal:30, borderRadius: 10, marginBottom: 20 }} onPress={() => { navigate('Detail') }}>
          <Text style={{ color: 'white', fontSize: 25, alignSelf: 'center', fontWeight: 'bold' }}>
            Thêm
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e9e9e9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  delete: {
    fontSize: 24,
    color: "red",
  },
  container: {
    flexDirection: 'row',
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 25
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  },
});
