import React, { useState, Fragment } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import TreeNode from "./TreeNode";

const findPath = (struct, key) => {
  let res = null;

  dfs(struct, [], key, false);
  function dfs(struct, path, key, isFind) {
    if (isFind || !struct || struct.length <= 0) return;

    for (let i = 0; i < struct.length; i++) {
      let node = struct[i];
      path.push(node.key);
      if (node.key === key) {
        isFind = true;
        let nodes = node.children;
        while (nodes && nodes.length > 0) {
          path.push(nodes[0].key);
          nodes = nodes[0].children;
        }
        res = [...path];
        return;
      }
      dfs(node.children, path, key);
      path.pop();
    }
  }
  return res;
};
export default function Tree({ struct, selected, setSelected }) {
  const path = findPath(struct, selected);

  const traverse = (struct, dep) => {
    if (!struct || struct.length <= 0) return;
    const res = struct.map((item) => {
      let key = item.key;

      if (path.includes(key)) {
        return (
          <Fragment key={key}>{traverse(item.children, dep + 1)}</Fragment>
        );
      }
    });
    return (
      <>
        <Text>{dep}</Text>
        <TreeNode
          selected={path[dep]}
          key={dep}
          onSelected={(val) => {
            setSelected(val);
          }}
          struct={struct}
        />
        {res}
      </>
    );
  };

  return <View style={styles.treeWrapper}>{traverse(struct, 0)}</View>;
}

const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: "row"
  },
  treeItem: {
    paddingLeft: 20
  },
  pickerContainer: {
    flex: 1,
    alignItems: "center"
  }
});
