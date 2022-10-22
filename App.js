import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const request = async(callback) => {
  const response = await fetch('https://covid19-brazil-api.now.sh/api/report/v1');
  const parsed = await response.json();
  callback(parsed.data);
}

export default function App() {
  const [registro,setRegistros] = useState([]);

  useEffect(()=>{
    request(setRegistros);
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Informações da API - Covid 19</Text>
      <StatusBar style="auto" />
      <FlatList
      data={registro}
      keyExtractor={(item)=> item.uid.toString()}
      renderItem={({item})=>
          <Text style={styles.topicos}>
            {item.uf} - {item.state} {'\n'}
            Casos: {item.cases} Mortes: {item.deaths}
            </Text>
      }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicos: {
    fontSize:12,
    flex:1,
    paddingVertical:10,
    margin:10,
    backgroundColor: '#aaa',
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff'
  },
  titulo: {
    fontSize: 30,
    marginVertical: 30
  }
});
