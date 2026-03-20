import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../contexts/auth-context';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const username = user?.username ?? 'John Doe';
  const email = `${username.toLowerCase().replace(/\s+/g, '.')}@example.com`;

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}>
          <Text style={styles.headerIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.8}>
          <Text style={styles.headerIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {username
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            </View>
            <View style={styles.avatarEditBadge}>
              <Text style={styles.avatarEditText}>✎</Text>
            </View>
          </View>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.handle}>@johndoe_official</Text>
          <View style={styles.premiumPill}>
            <Text style={styles.premiumText}>PREMIUM MEMBER</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Account Details</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.editText}>Edit Details</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <View style={styles.emailBox}>
            <Text style={styles.emailValue}>{email}</Text>
          </View>

          <Text style={styles.label}>FIRST NAME</Text>
          <Text style={styles.fieldValue}>John</Text>

          <Text style={styles.label}>LAST NAME</Text>
          <Text style={styles.fieldValue}>Doe</Text>

          <Text style={styles.label}>AGE</Text>
          <Text style={styles.fieldValue}>28</Text>
        </View>

        <TouchableOpacity
          style={[styles.card, styles.actionRow]}
          activeOpacity={0.85}>
          <View style={styles.actionLeft}>
            <View style={styles.actionIconBox}>
              <Text style={styles.actionIcon}>🛍</Text>
            </View>
            <Text style={styles.actionText}>Order History</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.actionRow]}
          onPress={() => {
            logout();
            navigation.replace('SignIn');
          }}
          activeOpacity={0.85}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIconBox, styles.logoutIconBox]}>
              <Text style={styles.logoutIcon}>↪</Text>
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    height: 64,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1e2636',
  },
  headerIconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: '#1e2636',
  },
  content: {
    padding: 14,
    gap: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 1,
  },
  avatarWrap: {
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f1ad8e',
    borderWidth: 4,
    borderColor: '#d9d2c9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#223349',
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#14d7e6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarEditText: {
    color: '#0f2437',
    fontWeight: '800',
    fontSize: 13,
  },
  name: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    color: '#1e2636',
  },
  handle: {
    textAlign: 'center',
    color: '#616e82',
    marginTop: 2,
    fontSize: 23,
  },
  premiumPill: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#e6f2f3',
  },
  premiumText: {
    color: '#08cdd2',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: '#1e2636',
  },
  editText: {
    color: '#08cdd2',
    fontWeight: '600',
    fontSize: 14,
  },
  label: {
    marginTop: 14,
    color: '#9ba7b7',
    letterSpacing: 0.6,
    fontSize: 13,
    fontWeight: '600',
  },
  emailBox: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d2d8e1',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fb',
  },
  emailValue: {
    color: '#66758a',
    fontSize: 14,
  },
  fieldValue: {
    marginTop: 6,
    fontSize: 18,
    color: '#1e2636',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: '#f0f3f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 18,
    color: '#1e2636',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 26,
    color: '#c0c8d3',
    lineHeight: 26,
  },
  logoutIconBox: {
    backgroundColor: '#ffeef0',
  },
  logoutIcon: {
    color: '#ff5a5f',
    fontSize: 18,
    fontWeight: '800',
  },
  logoutText: {
    color: '#ff4d52',
    fontSize: 18,
    fontWeight: '500',
  },
});

export { ProfileScreen };
