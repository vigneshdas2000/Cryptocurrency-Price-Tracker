import React,{useState,useEffect,onPress} from 'react';
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native';
import { LineChart } from 'react-native-wagmi-charts'; 


const Chart=({currentPrice,logoUrl,name,symbol,priceChangePercentage7d,sparkline})=>{
    console.log(currentPrice);

    const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30';

    console.log(sparkline);
    try{
    return(
      
      
    <View style={styles.chartWrapper}>

        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <Text style={styles.subtitle}>{name}({symbol.toUpperCase()})</Text>
            </View>
            <Text style={styles.subtitle}>7d</Text>
          </View>
          <View style={styles.lowerTitles}>
            <Text style={styles.boldTitle}>₹{(currentPrice * 75.79).toLocaleString('en-IN', { currency: 'INR' })}</Text>
            <Text style={[styles.title, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>
        <LineChart.Provider data={sparkline}>
        <LineChart width={352} height={250}>
    <LineChart.Path color="white"/>
    <LineChart.CursorCrosshair color="yellow">
      <LineChart.Tooltip/>
    </LineChart.CursorCrosshair>
  </LineChart>
  </LineChart.Provider>
      </View>
    )
  }
  catch(error){
    console.log(error);
  }
}


const styles = StyleSheet.create({
    chartWrapper: {
      marginVertical: 16
    },
    titlesWrapper: {
      marginHorizontal: 16
    },
    upperTitles: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    upperLeftTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 26,
      height: 26,
      marginRight: 4,
    },
    subtitle: {
      fontSize: 16,
      color: '#fff',
      fontFamily:'monospace'
    },
    lowerTitles: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    boldTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    chartLineWrapper: {
      marginTop: 40,
    },
  });

export default Chart