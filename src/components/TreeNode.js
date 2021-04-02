import React, { useState } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

export default function TreeNode({ struct, onSelected, defaultSelected }) {
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  const traverse = (struct) => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onSelected(itemValue);
          }}
        >
          {struct.map((item) => {
            const key = item.key;

            return <Picker.Item key={key} label={item.name} value={item.key} />;
          })}
        </Picker>
      </View>
    );
  };

  return traverse(struct);
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});
