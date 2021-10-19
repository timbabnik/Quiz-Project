import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const GameHistory = ({gameName, score}) => {
    return (
        <View style={{height: 100, flexDirection: "row", width: "100%", justifyContent: "space-around", backgroundColor: "white", alignItems: "center",  borderTopColor: "lightgrey", borderTopWidth: 1}}>
            <Text style={{fontSize: 20}}>Game: {gameName}</Text>
            <Text style={{fontSize: 20}}>Score: {score}</Text>
        </View>
    )
}

export default GameHistory

const styles = StyleSheet.create({})
