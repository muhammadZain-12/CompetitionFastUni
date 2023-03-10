import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/header'
import Color from '../../constant/Colors'
import Icon from 'react-native-vector-icons/Ionicons';


function AllStudentsData  ({route,navigation})  {
    let data = route.params

    console.log(data,"dataaaas")

    return (
        <>
        <View style={{
          backgroundColor: Color.backgroundColor,
          height: Dimensions.get('window').height,
          paddingHorizontal:10
        }}>
          <Header navigation={navigation} title='Students' backBtn/>
         <View
              style={{
                width: Dimensions.get('window').width / 1.1,
                borderWidth: 1,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <TextInput
                placeholder="Search"
                style={{width: Dimensions.get('window').width / 1.21, padding: 12}}
              />
              <TouchableOpacity >
                <Text>
                  <Icon name="search" size={25} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
        
        
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
              {data && data.length>0 &&
                data.map((e, i) => {
                  return (
                    <>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate("userprofile",e)}
                      key={i}
                      style={{
                        borderWidth: 0,
                        paddingVertical: 1,
                        alignItems: 'center',
                        borderRadius: 10,
                        marginTop: 10,
                        width: '49%',
                        justifyContent: 'space-between',
                      }}>
                      <Image
                        source={{uri :e.profileDetail.imageUri}}
                        resizeMode={'contain'}
                        style={{
                          width: Dimensions.get('window').width /2.25, height: Dimensions.get('window').height /3.8,
                          borderRadius: 10,
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.4,
                          shadowRadius: 2,
                        }}
                      />
                    <Text style={{fontFamily:'Poppins-Regular', fontSize:18, color:Color.textColor}}>{e.fullName}</Text>
                    </TouchableOpacity>
                    </>
                  )
                })}
            </View>
            </ScrollView>
      </View>
      </>
      )
}
export default AllStudentsData