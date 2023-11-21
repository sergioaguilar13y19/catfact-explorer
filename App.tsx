import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FACT_API_URL, PREFIX_API_CAT } from "./src/tests/Api";

export default function App() {
  const [facts, setFacts] = React.useState("");
  const [imageCat, setImageCat] = React.useState();
  
  React.useEffect(() => {
    fetch(FACT_API_URL)
      .then((res) => res.json())
      .then((data) => {
        const { text } = data;
        setFacts(text);
      });
  }, []);

  React.useEffect(() => {
    if (!facts) return;
    const firtWord = facts.split(" ").slice(-2).join(' ');
    console.log(firtWord)
    const API_IMG_URL = `/cat/says/${firtWord}?json=true`;
    fetch(PREFIX_API_CAT + API_IMG_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const { url } = data;
        setImageCat(url);
      })
      .catch((err) => console.log(err));
  }, [facts]);

  return (
    <View style={styles.container}>
      {facts && <Text>{facts}</Text>}
      {imageCat && (
        <Image
          source={{ uri: PREFIX_API_CAT + imageCat }}
          style={{ width: 400, height: 400 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontSize: 29,
    fontWeight: 'bold',
    color: 'blue'
  }
});
