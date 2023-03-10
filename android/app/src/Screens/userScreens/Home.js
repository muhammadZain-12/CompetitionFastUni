import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header';
import Color from '../../constant/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation, route}) => {
  let data = route.params;
  const [user, setUser] = useState(true);
  const [studentsData, setStudentsData] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState([]);

  const getStudentsData = async () => {
    let students = await firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        let students = [];
        let majorSubject = [];
        querySnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data();

          if (data.id !== route.params.id) {
            students.push(data);
            majorSubject.push(data?.profileDetail?.subject);
          }
        });

        majorSubject = [...new Set([...majorSubject])];

        let newArray =
          majorSubject &&
          majorSubject.length > 0 &&
          majorSubject.map((e, i) => {
            return {subject: e};
          });

        setStudentsData(students);
        setSubjectCategory(newArray);
      });
  };

  useEffect(() => {
    setSearchCategory(
      studentsData &&
        studentsData.length > 0 &&
        studentsData.filter((e, i) => {
          if (e.fullName.toLowerCase().includes(searchInput.toLowerCase())) {
            return e;
          }
        }),
    );
  }, [searchInput]);

  console.log(subjectCategory, 'subject');
  console.log(studentsData, 'students');

  useEffect(() => {
    getStudentsData();
  }, []);

  const navigateToOtherScreen = name => {
    let firstLetter = name.slice(0, 1);
    firstLetter = firstLetter.toUpperCase();
    let otherLetter = name.slice(1);
    console.log(firstLetter, 'first');
    console.log(name, 'name');
    let fullName = firstLetter + otherLetter;
    navigation.navigate(`${fullName}Screen`);
  };

  const chooseSelectedCategory = item => {
    setSelectedCategory(item);

    setSubjectCategory(
      subjectCategory &&
        subjectCategory.length > 0 &&
        subjectCategory.map((e, i) => {
          if (item.subject == e.subject) {
            return {
              ...e,
              selected: true,
            };
          } else {
            return {
              ...e,
              selected: false,
            };
          }
        }),
    );
  };

  const renderCategoriesItems = ({item}) => {
    return (
      <View style={{paddingHorizontal: 2, marginBottom: 10}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => chooseSelectedCategory(item)}
        >
          <Image
            source={
              item.selected
                ? require('../../Images/ICONMentor.png')
                : require('../../Images/ICONCreator.png')
            }
            resizeMode="contain"
            style={{
              width: Dimensions.get('window').width / 2.6,
              height: Dimensions.get('window').height / 9,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              position: 'absolute',
              top: 25,
              left: 35,
              right: 35,
            }}
          >
            {item.subject}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  console.log(searchInput, 'search');

  const renderStudentsData = ({item}) => {
    if (
      selectedCategory &&
      selectedCategory.subject == item.profileDetail.subject
    ) {
      return (
        <View style={{paddingHorizontal: 5, marginTop: 10, marginBottom: 10}}>
          <TouchableOpacity
            onPress={()=>navigation.navigate("userprofile",item)}
            activeOpacity={0.8}
            style={{
              borderWidth: 0,
              paddingVertical: 1,
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Image
              source={{uri: item?.profileDetail?.imageUri}}
              resizeMode={'cover'}
              style={{
                width: Dimensions.get('window').width / 2.7,
                height: Dimensions.get('window').height / 4,
                borderRadius: 10,
              }}
            />

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                color: Color.textColor,
              }}
            >
              {item.fullName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (
      selectedCategory &&
      selectedCategory.subject == item.profileDetail.subject
    ) {
      return (
        <View style={{paddingHorizontal: 5, marginTop: 10, marginBottom: 10}}>
          <TouchableOpacity
            onPress={()=>navigation.navigate("userprofile",item)}
            activeOpacity={0.8}
            style={{
              borderWidth: 0,
              paddingVertical: 1,
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Image
              source={{uri: item?.profileDetail?.imageUri}}
              resizeMode={'cover'}
              style={{
                width: Dimensions.get('window').width / 2.7,
                height: Dimensions.get('window').height / 4,
                borderRadius: 10,
              }}
            />

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                color: Color.textColor,
              }}
            >
              {item.fullName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (selectedCategory && !Object.keys(selectedCategory).length > 0) {
      return (
        <View style={{paddingHorizontal: 5, marginTop: 10, marginBottom: 10}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("userprofile",item)}
            activeOpacity={0.8}
            style={{
              borderWidth: 0,
              paddingVertical: 1,
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Image
              source={{uri: item?.profileDetail?.imageUri}}
              resizeMode={'cover'}
              style={{
                width: Dimensions.get('window').width / 2.7,
                height: Dimensions.get('window').height / 4,
                borderRadius: 10,
              }}
            />

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                color: Color.textColor,
              }}
            >
              {item.fullName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: Color.backgroundColor,
        height: Dimensions.get('window').height,
        paddingHorizontal: 10,
      }}
    >
      <View style={{marginTop: 10}}>
        <Header
          navigation={navigation}
          user={user}
          Drawer={true}
          Notification
          data={route.params}
        />
      </View>
      {/* Search */}
      <View
        style={{
          width: Dimensions.get('window').width / 1.1,
          borderWidth: 1,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Search students here..."
          placeholderTextColor={Color.black}
          onChangeText={setSearchInput}
          style={{
            width: Dimensions.get('window').width / 1.21,
            padding: 12,
            color: Color.black,
          }}
        />
        <TouchableOpacity>
          <Text>
            <Icon name="search" size={25} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      {/* Categories */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: Color.mainColor,
              fontSize: 22,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            Categories
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={
                user
                  ? () => navigation.navigate('Categories')
                  : () => navigation.navigate('Login')
              }
            >
              <Text
                style={{
                  color: Color.viewAll,
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={subjectCategory}
          renderItem={renderCategoriesItems}
          keyExtractor={item => item.subject}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          borderWidth: 0.2,
          borderColor: Color.viewAll,
          marginVertical: 5,
        }}
      ></View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Creators */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: Color.mainColor,
                fontSize: 22,
                fontFamily: 'Poppins-SemiBold',
              }}
            >
              Students
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('allStudentsData', studentsData)
                }
              >
                <Text
                  style={{
                    color: Color.viewAll,
                    fontSize: 15,
                    fontFamily: 'Poppins-Regular',
                  }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={
              searchCategory && searchCategory.length > 0
                ? searchCategory
                : studentsData
            }
            renderItem={renderStudentsData}
            keyExtractor={item => item?.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View>
          <Text
            style={{
              color: Color.mainColor,
              fontSize: 22,
              fontFamily: 'Poppins-SemiBold',
              marginTop: 20,
            }}
          >
            Annoucement
          </Text>
          <View style={styles.background}>
            <Text style={styles.heading}> Welcome!</Text>
            <Text style={styles.paragraph}>
              FKU is a busy place. Let us help you keep up.
            </Text>
            <Text style={[styles.paragraph, {marginBottom: 10}]}>
              University Announcements that go-to place for university updates.
              Here you’ll find notable announcements, important reminders,
              interesting tidbits and heaps of good-to-knows and FYIs about
              university happenings.
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <Text
            style={{
              color: Color.mainColor,
              fontSize: 22,
              fontFamily: 'Poppins-SemiBold',
              marginTop: 20,
            }}
          >
            Upcoming Events
          </Text>
          <Image
            source={require('../../Images/upcomingEvent.png')}
            style={styles.eventImg}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  eventImg: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width,
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
  paragraph: {
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
  background: {
    elevation: 4,
    shadowOpacity: 0.9,
  },
});
