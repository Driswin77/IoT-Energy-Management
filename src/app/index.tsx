import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { database } from '../services/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const screenWidth = Dimensions.get('window').width;

const COLORS = {
  bg: '#F8FAFC',
  cardBg: '#FFFFFF',
  teal: '#0B6B60',
  tealLight: '#E6F4F1',
  textDark: '#1E293B',
  textLight: '#64748B',
  orange: '#F59E0B',
  orangeLight: '#FEF3C7',
  red: '#EF4444',
  redLight: '#FEF2F2',
  green: '#22C55E',
  greenLight: '#DCFCE7',
  blue: '#3B82F6',
  blueLight: '#DBEAFE',
};

export default function DashboardScreen() {
  const [power, setPower] = useState(1388);
  const [occupancy, setOccupancy] = useState(true);
  
  const [acOn, setAcOn] = useState(true);
  const [fridgeOn, setFridgeOn] = useState(true);
  const [wmOn, setWmOn] = useState(false);

  useEffect(() => {
    const powerRef = ref(database, 'live/power');
    const unsubscribePower = onValue(powerRef, (snapshot) => {
      if (snapshot.val()) setPower(snapshot.val());
    });

    const occRef = ref(database, 'live/occupancy');
    const unsubscribeOcc = onValue(occRef, (snapshot) => {
      setOccupancy(snapshot.val() === true);
    });

    return () => {
      unsubscribePower();
      unsubscribeOcc();
    };
  }, []);

  const costPerHour = ((power / 1000) * 7).toFixed(2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ✅ FIXED HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <View style={styles.liveContainer}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.systemsText}>All systems connected</Text>
            </View>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=150&auto=format&fit=crop' }} 
            style={styles.avatar} 
          />
        </View>

        {/* HERO POWER CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroIconBg}>
              <Ionicons name="flash" size={20} color={COLORS.orange} />
            </View>
            <Text style={styles.heroTitle}>Current Power</Text>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>Last 1 Hour</Text>
              <Ionicons name="chevron-down" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.heroMainRow}>
            <View>
              <Text style={styles.heroValue}>
                {power} <Text style={styles.heroUnit}>W</Text>
              </Text>
              <Text style={styles.heroCost}>
                Est. Cost: <Text style={{color: COLORS.orange, fontWeight: 'bold'}}>₹{costPerHour}/hr</Text>
              </Text>
            </View>
            
            <View style={styles.chartContainer}>
               <LineChart
                data={{
                  labels: [],
                  datasets: [{ data: [1000, 1200, 1100, 1800, 1300, 1500, 1388] }]
                }}
                width={120}
                height={70}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                withShadow={true}
                chartConfig={{
                  backgroundColor: COLORS.teal,
                  backgroundGradientFrom: COLORS.teal,
                  backgroundGradientTo: COLORS.teal,
                  color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
                  fillShadowGradient: COLORS.orange,
                  fillShadowGradientOpacity: 0.2,
                  propsForBackgroundLines: { strokeWidth: 0 },
                  propsForDots: { r: '0' }
                }}
                bezier
                style={{ marginLeft: -20, marginRight: 0 }}
              />
            </View>
          </View>
        </View>

        {/* QUICK STATS GRID */}
        <View style={styles.gridRow}>
          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#F2FBF7', borderColor: '#D1FAE5' }]}>
            <View style={[styles.gridIconBg, { backgroundColor: COLORS.greenLight }]}>
              <Ionicons name="person" size={18} color="#059669" />
            </View>
            <View style={styles.gridTextContainer}>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={styles.gridLabel}>Occupancy</Text>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
               </View>
               <Text style={styles.gridValue}>{occupancy ? 'Yes' : 'No'}</Text>
               <Text style={styles.gridSub}>{occupancy ? 'Room is occupied' : 'Room is empty'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' }]}>
            <View style={[styles.gridIconBg, { backgroundColor: COLORS.blueLight }]}>
              <Ionicons name="bar-chart" size={18} color={COLORS.blue} />
            </View>
            <View style={styles.gridTextContainer}>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={styles.gridLabel}>Today's Usage</Text>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
               </View>
               <Text style={styles.gridValue}>
                 12.4 <Text style={{fontSize: 14, fontWeight: 'normal'}}>kWh</Text>
               </Text>
               <Text style={[styles.gridSub, { color: '#059669' }]}>↗ 8% from yesterday</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* APPLIANCE CONTROL */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Appliance Control</Text>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.seeAllText}>Active Appliances (3) </Text>
            <Ionicons name="chevron-forward" size={12} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.applianceScroll} contentContainerStyle={{ paddingRight: 20 }}>
          
          {/* AC Card */}
          <View style={styles.applianceCard}>
            <View style={styles.applianceTop}>
              {/* ✅ USING LOCAL IMAGE */}
              <Image source={require('../../assets/images/ac.png')} style={styles.applianceImage} resizeMode="contain" />
              <Switch 
                value={acOn} 
                onValueChange={setAcOn}
                trackColor={{ false: "#E2E8F0", true: "#0B6B60" }}
                thumbColor={"#fff"}
              />
            </View>
            <Text style={styles.applianceName}>AC</Text>
            <Text style={styles.appliancePower}>{acOn ? '1200 W' : '0 W'}</Text>
            <View style={styles.statusRow}>
              <MaterialCommunityIcons name="snowflake" size={14} color={acOn ? COLORS.blue : COLORS.textLight} />
              <Text style={[styles.statusText, { color: acOn ? COLORS.blue : COLORS.textLight }]}>{acOn ? 'Cooling' : 'Off'}</Text>
            </View>
          </View>

          {/* Fridge Card */}
          <View style={styles.applianceCard}>
            <View style={styles.applianceTop}>
              {/* ✅ USING LOCAL IMAGE */}
              <Image source={require('../../assets/images/fridge.png')} style={styles.applianceImage} resizeMode="contain" />
              <Switch 
                value={fridgeOn} 
                onValueChange={setFridgeOn}
                trackColor={{ false: "#E2E8F0", true: "#0B6B60" }}
                thumbColor={"#fff"}
              />
            </View>
            <Text style={styles.applianceName}>Refrigerator</Text>
            <Text style={styles.appliancePower}>{fridgeOn ? '150 W' : '0 W'}</Text>
            <View style={styles.statusRow}>
              <MaterialCommunityIcons name="snowflake" size={14} color={fridgeOn ? "#059669" : COLORS.textLight} />
              <Text style={[styles.statusText, { color: fridgeOn ? "#059669" : COLORS.textLight }]}>{fridgeOn ? 'Running' : 'Off'}</Text>
            </View>
          </View>

          {/* Washing Machine Card */}
          <View style={[styles.applianceCard, { backgroundColor: '#FAFAFA' }]}>
            <View style={styles.applianceTop}>
              {/* ✅ USING LOCAL IMAGE */}
              <Image source={require('../../assets/images/washer.png')} style={styles.applianceImage} resizeMode="contain" />
              <Switch 
                value={wmOn} 
                onValueChange={setWmOn}
                trackColor={{ false: "#E2E8F0", true: "#0B6B60" }}
                thumbColor={"#fff"}
              />
            </View>
            <Text style={styles.applianceName}>Washing Machine</Text>
            <Text style={styles.appliancePower}>{wmOn ? '450 W' : '0 W'}</Text>
            <View style={styles.statusRow}>
              <Ionicons name="time-outline" size={14} color={wmOn ? COLORS.blue : COLORS.textLight} />
              <Text style={[styles.statusText, { color: wmOn ? COLORS.blue : COLORS.textLight }]}>{wmOn ? 'Running' : 'Off'}</Text>
            </View>
          </View>
        </ScrollView>

        {/* RECOMMENDATION CARD */}
        <View style={styles.recommendationCard}>
          <View style={styles.recLeft}>
            <View style={styles.recIconBg}>
              <Ionicons name="bulb" size={20} color={COLORS.orange} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.recTitle}>Top Recommendation</Text>
              <Text style={styles.recDesc}>
                Shift Washing Machine to 10 PM to save <Text style={{fontWeight: 'bold'}}>₹15</Text>.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.xaiButton}>
            <Text style={styles.xaiBtnText}>Explain (XAI)</Text>
            <Ionicons name="chevron-forward" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ANOMALY ALERT */}
        <TouchableOpacity style={styles.alertCard}>
          <Ionicons name="warning" size={24} color={COLORS.red} style={{ marginRight: 10, marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Fridge power draw is 30% higher than normal.</Text>
            <Text style={styles.alertDesc}>Current: 150 W | Expected: ~115 W</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#FCA5A5" />
        </TouchableOpacity>

        <View style={{ height: 100 }} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { padding: 20, paddingTop: 10 },
  
  // ✅ UPDATED HEADER STYLES
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  headerLeft: { flex: 1, justifyContent: 'center' },
  greeting: { fontSize: 26, color: COLORS.textDark, fontWeight: '800', marginBottom: 6 }, // Made it bigger and darker
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E2E8F0' },
  liveContainer: { flexDirection: 'row', alignItems: 'center' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.green, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 10 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginRight: 4 },
  liveText: { color: '#fff', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
  systemsText: { fontSize: 12, color: COLORS.textLight },

  heroCard: { backgroundColor: COLORS.teal, borderRadius: 20, padding: 20, marginBottom: 20, elevation: 4, shadowColor: COLORS.teal, shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.3, shadowRadius: 10 },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  heroIconBg: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  heroTitle: { color: '#E2E8F0', fontSize: 16, fontWeight: '600', flex: 1 },
  dropdownBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  dropdownText: { color: '#fff', fontSize: 12, marginRight: 4 },
  heroMainRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  heroValue: { color: '#fff', fontSize: 52, fontWeight: '800', letterSpacing: -1 },
  heroUnit: { fontSize: 24, fontWeight: '600', color: '#E2E8F0' },
  heroCost: { color: '#E2E8F0', fontSize: 15, marginTop: 4 },
  chartContainer: { flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', overflow: 'hidden' },

  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  gridCard: { flex: 1, borderRadius: 16, padding: 16, marginHorizontal: 4, borderWidth: 1, elevation: 1, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 4 },
  gridIconBg: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  gridTextContainer: { flex: 1 },
  gridLabel: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  gridValue: { fontSize: 22, fontWeight: '800', color: COLORS.textDark, marginVertical: 4 },
  gridSub: { fontSize: 12, color: COLORS.textLight },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark },
  seeAllText: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  applianceScroll: { marginBottom: 24, overflow: 'visible' },
  applianceCard: { width: 140, backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 14, marginRight: 12, borderWidth: 1, borderColor: '#F1F5F9', elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 6 },
  applianceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  
  // Made the image slightly bigger
  applianceImage: { width: 45, height: 45 }, 
  
  applianceName: { fontSize: 14, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  appliancePower: { fontSize: 13, color: COLORS.textLight, marginBottom: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusText: { fontSize: 12, fontWeight: '600', marginLeft: 4 },

  recommendationCard: { backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 16, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: COLORS.orange, elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 6 },
  recLeft: { flexDirection: 'row', marginBottom: 16 },
  recIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.orangeLight, justifyContent: 'center', alignItems: 'center' },
  recTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  recDesc: { fontSize: 14, color: COLORS.textLight, lineHeight: 20 },
  xaiButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: COLORS.orange, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  xaiBtnText: { color: '#fff', fontSize: 14, fontWeight: '700', marginRight: 4 },

  alertCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.redLight, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#FECACA', marginBottom: 20 },
  alertTitle: { fontSize: 14, fontWeight: '700', color: COLORS.red, marginBottom: 4 },
  alertDesc: { fontSize: 12, color: '#991B1B' },
});