
import { FlatList,StyleSheet, Text,Button, View,SafeAreaView,TouchableOpacity } from 'react-native';
import React,{useRef,useState,useEffect} from 'react';
import moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";
import ListItem from "./ListItem";
import Chart from './Chart';
import {getMarketData} from '../assets/data/CryptoServices'




const Coins=()=>{

  const [currentDate, setCurrentDate] = useState('');
  const [currentDate01, setCurrentDate01] = useState('');
  useEffect(() => {
    var date = moment().utcOffset('+05:30').format('hh:mm a');
    var date01 = moment().utcOffset('+05:30').format('  Do MMMM YYYY');
    setCurrentDate(date);
    setCurrentDate01(date01);
  }, []);

  const ListHeader = () => (

    <>
      <View style={styles.titleWrapper}>
      
      <Text style={styles.largeTitle}>{currentDate01}</Text>
          <Text style={styles.largeTitle}>{currentDate}</Text>
        </View>
      <View style={styles.divider} />
    </>
  )
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

  const refRBSheet=useRef();
  const openMod=(item)=>{
      setSelectedCoinData(item);
      refRBSheet.current.open();
  }
  return(
    
    <>
    
    <SafeAreaView style={styles.container}>
    
<FlatList
  keyExtractor={(item) => item.id}
  data={data}
  renderItem={({ item }) => (
    <ListItem
      name={item.name}
      symbol={item.symbol}
      currentPrice={item.current_price}
      priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
      logoUrl={item.image} 
      onPress={()=>openMod(item)}/>
  )}
  ListHeaderComponent={<ListHeader />} />

</SafeAreaView>
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      animationType="fade"
      height= "350"
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        draggableIcon: {
          backgroundColor: "yellow",
          fontweight: "bold",
        },
        container:{
          shadowColor:"black",
          backgroundColor:"#4169e1",
      shadowOffset:{
          width:0,
          height:-4,
      },
      shadowOpacity: 0.25,
      shadowRadius:6,
      elevation:10,
        }
      }}
    >
      
      { selectedCoinData ? (
          <Chart
            currentPrice={selectedCoinData.current_price}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
            sparkline={selectedCoinData.sparkline_in_7d.price}
          />
        ) : null}
    </RBSheet></>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper:{
    marginTop: 5,
    padding:2,
    alignItems: 'center',
    
  },
  largeTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Times'
  },
  divider:{
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#4169e1',
    marginHorizontal: 16,
    marginTop:16,
  },
  bottomSheet:{
      shadowColor:"black",
      shadowOffset:{
          width:0,
          height:-4,
      },
      shadowOpacity: 0.35,
      shadowRadius:4,
      elevation:5,
  },
  tinyLogo02:{
    width:50,
    height:50,
  },
});

export default Coins