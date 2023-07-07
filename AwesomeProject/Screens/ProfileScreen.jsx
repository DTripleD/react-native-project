// import { Ionicons } from "@expo/vector-icons";

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const Profile = () => {
//   const navigation = useNavigation();

//   return (
//     <ImageBackground
//       source={require("../images/bg-photo.png")}
//       style={styles.backImg}
//     >
//       {/* <ScrollView> */}
//       <ScrollView>
//         <View style={{ width: "100%", height: 150 }} />
//         <View style={styles.form}>
//           <View style={styles.photoContainer}>
//             <Image
//               source={require("../images/user.png")}
//               style={{ height: "100%", width: "100%" }}
//             />
//             <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
//               <Ionicons name="add-circle" size={26} color="#E8E8E8" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.title}>Natali Romanova</Text>

//           <View style={styles.postContainer}>
//             <Image
//               source={require("../images/postImage.png")}
//               style={styles.postPhoto}
//             />
//             <Text style={styles.postTitle}>Ліс</Text>
//             <View style={styles.locationWrapper}>
//               <View style={{ flexDirection: "row", gap: 24 }}>
//                 <TouchableOpacity
//                   style={styles.locationInfo}
//                   activeOpacity={0.5}
//                   onPress={() => navigation.navigate("CommentsScreen")}
//                 >
//                   <Ionicons name="chatbubble-sharp" size={24} color="#FF6C00" />
//                   <Text style={styles.commentsCount}>8</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.locationInfo}
//                   activeOpacity={0.5}
//                   onPress={() => navigation.navigate("CommentsScreen")}
//                 >
//                   <Ionicons
//                     name="thumbs-up-outline"
//                     size={24}
//                     color="#FF6C00"
//                   />
//                   <Text style={styles.commentsCount}>153</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 style={styles.locationInfo}
//                 activeOpacity={0.5}
//                 onPress={() => navigation.navigate("MapScreen")}
//               >
//                 <Ionicons name="location-outline" size={24} color="#BDBDBD" />
//                 <Text style={styles.location}>Ukraine</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.postContainer}>
//             <Image
//               source={require("../images/postImage2.png")}
//               style={styles.postPhoto}
//             />
//             <Text style={styles.postTitle}>Старий будиночок у Венеції</Text>
//             <View style={styles.locationWrapper}>
//               <View style={{ flexDirection: "row", gap: 24 }}>
//                 <TouchableOpacity
//                   style={styles.locationInfo}
//                   activeOpacity={0.5}
//                   onPress={() => navigation.navigate("CommentsScreen")}
//                 >
//                   <Ionicons name="chatbubble-sharp" size={24} color="#FF6C00" />
//                   <Text style={styles.commentsCount}>3</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.locationInfo}
//                   activeOpacity={0.5}
//                   onPress={() => navigation.navigate("CommentsScreen")}
//                 >
//                   <Ionicons
//                     name="thumbs-up-outline"
//                     size={24}
//                     color="#FF6C00"
//                   />
//                   <Text style={styles.commentsCount}>200</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 style={styles.locationInfo}
//                 activeOpacity={0.5}
//                 onPress={() => navigation.navigate("MapScreen")}
//               >
//                 <Ionicons name="location-outline" size={24} color="#BDBDBD" />
//                 <Text style={styles.location}>Ukraine</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.postContainer}>
//             <Image
//               source={require("../images/postImage3.png")}
//               style={styles.postPhoto}
//             />
//             <Text style={styles.postTitle}>Старий будиночок у Венеції</Text>
//             <View style={styles.locationWrapper}>
//               <View style={{ flexDirection: "row", gap: 24 }}>
//                 <TouchableOpacity
//                   style={styles.locationInfo}
//                   activeOpacity={0.5}
//                   onPress={() => navigation.navigate("CommentsScreen")}
//                 >
//                   <Ionicons name="chatbubble-sharp" size={24} color="#FF6C00" />
//                   <Text style={styles.commentsCount}>50</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.locationInfo}
//                   activeOpacity={0.5}
//                   onPress={() => navigation.navigate("CommentsScreen")}
//                 >
//                   <Ionicons
//                     name="thumbs-up-outline"
//                     size={24}
//                     color="#FF6C00"
//                   />
//                   <Text style={styles.commentsCount}>200</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 style={styles.locationInfo}
//                 activeOpacity={0.5}
//                 onPress={() => navigation.navigate("MapScreen")}
//               >
//                 <Ionicons name="location-outline" size={24} color="#BDBDBD" />
//                 <Text style={styles.location}>Italy</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* </ScrollView> */}
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     alignItems: "",
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },

//   photoContainer: {
//     marginTop: -90,
//     height: 120,
//     width: 120,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//   },

//   addbutton: {
//     marginTop: "-35%",
//     left: "90%",
//     height: 25,
//     width: 25,
//     transform: [{ rotate: "45deg" }],
//     // pointerEvents: "auto",
//     // backgroundColor: "#FFFFFF",
//     // borderWidth: 1,
//     // borderColor: "#BDBDBD",
//     // borderRadius: 50,
//     // alignItems: "center",
//     // justifyContent: "center",
//     // alignContent: "center",
//   },
//   title: {
//     fontWeight: "500",
//     fontSize: 30,
//     marginTop: 32,
//     lineHeight: 35,
//   },

//   backImg: {
//     flex: 1,
//     resizeMode: "cover",
//     width: "100%",
//     justifyContent: "flex-end",
//   },
//   form: {
//     // position: "relative",
//     backgroundColor: "#fff",
//     alignItems: "center",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     paddingTop: 32,
//     // marginBottom: 144,
//     paddingLeft: 16,
//     paddingRight: 16,
//     paddingBottom: 43,
//   },

//   postPhoto: { borderRadius: 8 },
//   postTitle: { fontWeight: 500, fontSize: 16, color: "#212121", marginTop: 8 },
//   locationWrapper: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     marginTop: 8,
//   },
//   locationInfo: { flexDirection: "row", alignItems: "center", gap: 6 },
//   commentsCount: {
//     fontWeight: 400,
//     fontSize: 16,
//     color: "#BDBDBD",
//   },
//   location: {
//     fontWeight: 400,
//     fontSize: 16,
//     color: "#212121",
//     textDecorationLine: "underline",
//   },
//   postContainer: { marginTop: 32 },
// });

// export default Profile;
