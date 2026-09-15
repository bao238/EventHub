import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import colors from '../constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.72;

const HomeScreen = ({ onSignOut }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedCategory, setSelectedCategory] = useState('Sports');

  // Drawer animation
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.parallel([
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(drawerAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDrawerOpen(false);
    });
  };

  const categories = [
    { name: 'Sports', color: '#F0635A', iconType: 'material', icon: 'basketball' },
    { name: 'Music', color: '#F59762', iconType: 'feather', icon: 'music' },
    { name: 'Food', color: '#29D697', iconType: 'material', icon: 'silverware-fork-knife' },
    { name: 'Art', color: '#46CDFB', iconType: 'material', icon: 'palette-outline' },
  ];

  const drawerMenuItems = [
    { id: 'profile', title: 'My Profile', image: require('../../assets/images/common/icon_profile.png') },
    { id: 'message', title: 'Massage', image: require('../../assets/images/common/icon_message.png'), badge: 3 },
    { id: 'calendar', title: 'Calender', image: require('../../assets/images/common/icon_calendar.png') },
    { id: 'bookmark', title: 'Bookmark', image: require('../../assets/images/common/icon_bookmark.png') },
    { id: 'contact', title: 'Contact Us', vectorIcon: 'mail' },
    { id: 'settings', title: 'Settings', image: require('../../assets/images/common/icon_settings.png') },
    { id: 'help', title: 'Helps & FAQs', image: require('../../assets/images/common/icon_help.png') },
    { id: 'signout', title: 'Sign Out', image: require('../../assets/images/common/icon_signout.png'), action: onSignOut },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A43EC" />

      {/* Main Screen Content */}
      <ScrollView
        style={styles.mainScrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue Curved Header */}
        <View style={styles.header}>
          {/* Top Bar: Hamburger - Location - Notification */}
          <View style={styles.topBar}>
            {/* Hamburger Button */}
            <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
              <View style={styles.hamburgerBarShort} />
              <View style={styles.hamburgerBarLong} />
              <View style={styles.hamburgerBarMedium} />
            </TouchableOpacity>

            {/* Location Selector */}
            <View style={styles.locationContainer}>
              <View style={styles.locationTitleRow}>
                <Text style={styles.locationTitle}>Current Location</Text>
                <Feather name="chevron-down" size={14} color="rgba(255,255,255,0.7)" />
              </View>
              <Text style={styles.locationText}>New Yourk, USA</Text>
            </View>

            {/* Notification Bell */}
            <TouchableOpacity style={styles.bellButton}>
              <Image
                source={require('../../assets/images/common/icon_bell.png')}
                style={styles.bellIcon}
                resizeMode="contain"
              />
              <View style={styles.bellDot} />
            </TouchableOpacity>
          </View>

          {/* Search Bar with Filters inside Header */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputWrap}>
              <Feather name="search" size={20} color="#FFFFFF" style={styles.searchIcon} />
              <Text style={styles.searchSeparator}>|</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="rgba(255,255,255,0.4)"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Image
                source={require('../../assets/images/common/icon_filters.png')}
                style={styles.filterIconImg}
                resizeMode="contain"
              />
              <Text style={styles.filterText}>Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                onPress={() => setSelectedCategory(cat.name)}
                style={[
                  styles.categoryPill,
                  { backgroundColor: cat.color },
                  isSelected && styles.categoryPillSelected,
                ]}
              >
                {cat.iconType === 'ionicons' && (
                  <Ionicons name={cat.icon} size={18} color="#FFFFFF" style={styles.categoryIcon} />
                )}
                {cat.iconType === 'feather' && (
                  <Feather name={cat.icon} size={17} color="#FFFFFF" style={styles.categoryIcon} />
                )}
                {cat.iconType === 'material' && (
                  <MaterialCommunityIcons name={cat.icon} size={18} color="#FFFFFF" style={styles.categoryIcon} />
                )}
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Section: Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity style={styles.seeAllRow}>
            <Text style={styles.seeAllText}>See All</Text>
            <Feather name="chevron-right" size={16} color="#747688" />
          </TouchableOpacity>
        </View>

        {/* Horizontal Event Cards List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsCardsScroll}
        >
          {/* Card 1: International Band Music */}
          <View style={styles.eventCard}>
            <View style={styles.cardImageWrap}>
              <Image
                source={require('../../assets/images/home/event_hands.png')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              {/* Date Badge */}
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeDay}>10</Text>
                <Text style={styles.dateBadgeMonth}>JUNE</Text>
              </View>
              {/* Bookmark Button */}
              <TouchableOpacity style={styles.bookmarkBadge}>
                <MaterialCommunityIcons name="bookmark" size={16} color="#EB5757" />
              </TouchableOpacity>
            </View>

            {/* Card Content */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                International Band Mu...
              </Text>

              {/* Attendee Avatars */}
              <View style={styles.attendeeRow}>
                <View style={styles.avatarGroup}>
                  <Image
                    source={require('../../assets/images/home/avatar_1.png')}
                    style={[styles.attendeeAvatar, { zIndex: 3 }]}
                  />
                  <Image
                    source={require('../../assets/images/home/avatar_2.png')}
                    style={[styles.attendeeAvatar, { zIndex: 2, marginLeft: -8 }]}
                  />
                  <Image
                    source={require('../../assets/images/home/avatar_3.png')}
                    style={[styles.attendeeAvatar, { zIndex: 1, marginLeft: -8 }]}
                  />
                </View>
                <Text style={styles.attendeeText}>+20 Going</Text>
              </View>

              {/* Location */}
              <View style={styles.locationRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#747688" />
                <Text style={styles.locationCardText} numberOfLines={1}>
                  36 Guild Street London, UK
                </Text>
              </View>
            </View>
          </View>

          {/* Card 2: Jo Malone */}
          <View style={styles.eventCard}>
            <View style={styles.cardImageWrap}>
              <Image
                source={require('../../assets/images/home/event_shoes.png')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              {/* Date Badge */}
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeDay}>10</Text>
                <Text style={styles.dateBadgeMonth}>JUNE</Text>
              </View>
              {/* Bookmark Button */}
              <TouchableOpacity style={styles.bookmarkBadge}>
                <MaterialCommunityIcons name="bookmark-outline" size={16} color="#EB5757" />
              </TouchableOpacity>
            </View>

            {/* Card Content */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                Jo Malone...
              </Text>

              {/* Attendee Avatars */}
              <View style={styles.attendeeRow}>
                <View style={styles.avatarGroup}>
                  <Image
                    source={require('../../assets/images/home/avatar_1.png')}
                    style={[styles.attendeeAvatar, { zIndex: 3 }]}
                  />
                  <Image
                    source={require('../../assets/images/home/avatar_2.png')}
                    style={[styles.attendeeAvatar, { zIndex: 2, marginLeft: -8 }]}
                  />
                  <Image
                    source={require('../../assets/images/home/avatar_3.png')}
                    style={[styles.attendeeAvatar, { zIndex: 1, marginLeft: -8 }]}
                  />
                </View>
                <Text style={styles.attendeeText}>+20 Going</Text>
              </View>

              {/* Location */}
              <View style={styles.locationRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#747688" />
                <Text style={styles.locationCardText} numberOfLines={1}>
                  Radius Gal...
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Invite Friends Banner */}
        <View style={styles.inviteBanner}>
          <View style={styles.inviteTextCol}>
            <Text style={styles.inviteTitle}>Invite your friends</Text>
            <Text style={styles.inviteSubtitle}>Get $20 for ticket</Text>
            <TouchableOpacity style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>INVITE</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/home/invite_banner.png')}
            style={styles.inviteImage}
            resizeMode="contain"
          />
        </View>

        {/* Section: Nearby You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby You</Text>
          <TouchableOpacity style={styles.seeAllRow}>
            <Text style={styles.seeAllText}>See All</Text>
            <Feather name="chevron-right" size={16} color="#747688" />
          </TouchableOpacity>
        </View>

        {/* Nearby Events Horizontal Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsCardsScroll}
        >
          {/* Nearby Card 1 */}
          <View style={styles.eventCard}>
            <View style={styles.cardImageWrap}>
              <Image
                source={require('../../assets/images/home/event_leaves.png')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeDay}>10</Text>
                <Text style={styles.dateBadgeMonth}>JUNE</Text>
              </View>
              <TouchableOpacity style={styles.bookmarkBadge}>
                <MaterialCommunityIcons name="bookmark" size={16} color="#EB5757" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                A Virtual Evening of S...
              </Text>
              <View style={styles.attendeeRow}>
                <View style={styles.avatarGroup}>
                  <Image source={require('../../assets/images/home/avatar_1.png')} style={[styles.attendeeAvatar, { zIndex: 2 }]} />
                  <Image source={require('../../assets/images/home/avatar_2.png')} style={[styles.attendeeAvatar, { zIndex: 1, marginLeft: -8 }]} />
                </View>
                <Text style={styles.attendeeText}>+15 Going</Text>
              </View>
              <View style={styles.locationRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#747688" />
                <Text style={styles.locationCardText} numberOfLines={1}>
                  Lot 13 · Oakland, CA
                </Text>
              </View>
            </View>
          </View>

          {/* Nearby Card 2 */}
          <View style={styles.eventCard}>
            <View style={styles.cardImageWrap}>
              <Image
                source={require('../../assets/images/home/event_balloons.png')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeDay}>12</Text>
                <Text style={styles.dateBadgeMonth}>JUNE</Text>
              </View>
              <TouchableOpacity style={styles.bookmarkBadge}>
                <MaterialCommunityIcons name="bookmark-outline" size={16} color="#EB5757" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                Children's Day Carnival
              </Text>
              <View style={styles.attendeeRow}>
                <View style={styles.avatarGroup}>
                  <Image source={require('../../assets/images/home/avatar_1.png')} style={[styles.attendeeAvatar, { zIndex: 2 }]} />
                  <Image source={require('../../assets/images/home/avatar_3.png')} style={[styles.attendeeAvatar, { zIndex: 1, marginLeft: -8 }]} />
                </View>
                <Text style={styles.attendeeText}>+35 Going</Text>
              </View>
              <View style={styles.locationRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#747688" />
                <Text style={styles.locationCardText} numberOfLines={1}>
                  Central Park, NY
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Spacing for floating bottom bar */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        {/* Explore Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('explore')}
        >
          <Image
            source={require('../../assets/images/common/tab_explore.png')}
            style={[styles.tabIcon, activeTab === 'explore' && styles.tabIconActive]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'explore' && styles.navLabelActive,
            ]}
          >
            Explore
          </Text>
        </TouchableOpacity>

        {/* Events Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('events')}
        >
          <Image
            source={require('../../assets/images/common/tab_events.png')}
            style={[styles.tabIcon, activeTab === 'events' && styles.tabIconActive]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'events' && styles.navLabelActive,
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>

        {/* Center Floating Plus Button */}
        <View style={styles.centerButtonWrap}>
          <TouchableOpacity style={styles.floatingCenterBtn} activeOpacity={0.85}>
            <View style={styles.plusSquareIcon}>
              <Feather name="plus" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Map Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('map')}
        >
          <Image
            source={require('../../assets/images/common/tab_map.png')}
            style={[styles.tabIcon, activeTab === 'map' && styles.tabIconActive]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'map' && styles.navLabelActive,
            ]}
          >
            Map
          </Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <Image
            source={require('../../assets/images/common/tab_profile.png')}
            style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'profile' && styles.navLabelActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dimmed Overlay when Drawer is Open */}
      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View
            style={[
              styles.drawerOverlay,
              {
                opacity: overlayAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.45],
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      {/* Side Drawer Component */}
      <Animated.View
        style={[
          styles.drawerContainer,
          {
            transform: [{ translateX: drawerAnim }],
          },
        ]}
      >
        <ScrollView
          style={styles.drawerScrollView}
          contentContainerStyle={styles.drawerContent}
          showsVerticalScrollIndicator={false}
        >
          {/* User Profile Header */}
          <View style={styles.drawerHeader}>
            <Image
              source={require('../../assets/images/home/drawer_avatar.png')}
              style={styles.drawerAvatar}
            />
            <Text style={styles.drawerName}>Ashfak Sayem</Text>
          </View>

          {/* Drawer Menu Items */}
          <View style={styles.drawerMenuList}>
            {drawerMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.drawerItem}
                onPress={() => {
                  closeDrawer();
                  if (item.action) item.action();
                }}
              >
                <View style={styles.drawerItemIconWrap}>
                  {item.image ? (
                    <Image
                      source={item.image}
                      style={styles.drawerItemIcon}
                      resizeMode="contain"
                    />
                  ) : (
                    <Feather name={item.vectorIcon} size={22} color="#747688" />
                  )}
                  {item.badge !== undefined && (
                    <View style={styles.badgeOrange}>
                      <Text style={styles.badgeOrangeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.drawerItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Upgrade Pro Badge Button */}
          <View style={styles.drawerFooter}>
            <TouchableOpacity style={styles.upgradeProBtn}>
              <FontAwesome5 name="crown" size={16} color="#00F8FF" style={styles.upgradeCrownIcon} />
              <Text style={styles.upgradeProText}>Upgrade Pro</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // Blue Header
  header: {
    backgroundColor: '#4A43EC',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: Platform.OS === 'ios' ? 48 : (StatusBar.currentHeight || 24) + 12,
    paddingHorizontal: 22,
    paddingBottom: 25,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  hamburgerBarShort: {
    width: 14,
    height: 2.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 4,
  },
  hamburgerBarLong: {
    width: 22,
    height: 2.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 4,
  },
  hamburgerBarMedium: {
    width: 18,
    height: 2.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationTitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 2,
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellIcon: {
    width: 17,
    height: 17,
  },
  bellDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00F8FF',
  },
  // Search Row
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchSeparator: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 18,
    marginRight: 8,
    fontWeight: '300',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF',
    paddingVertical: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterIconImg: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  // Categories
  categoriesScroll: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 6,
    gap: 12,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryPillSelected: {
    transform: [{ scale: 1.02 }],
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginTop: 22,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#120D26',
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#747688',
  },
  // Event Cards
  eventsCardsScroll: {
    paddingLeft: 22,
    paddingRight: 10,
    paddingVertical: 6,
  },
  eventCard: {
    width: 237 * scale,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    marginRight: 16,
    shadowColor: '#505588',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImageWrap: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    height: 131 * scale,
    width: '100%',
    backgroundColor: '#F0F2F5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  dateBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBadgeDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EB5757',
    lineHeight: 18,
  },
  dateBadgeMonth: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#EB5757',
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#120D26',
    marginBottom: 8,
  },
  attendeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  attendeeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3F38DD',
    marginLeft: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationCardText: {
    fontSize: 13,
    color: '#747688',
    flex: 1,
  },
  // Invite Banner
  inviteBanner: {
    marginHorizontal: 22,
    marginVertical: 18,
    backgroundColor: '#D6FEF9',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  inviteTextCol: {
    flex: 1,
    zIndex: 2,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#120D26',
    marginBottom: 4,
  },
  inviteSubtitle: {
    fontSize: 13,
    color: '#484D70',
    marginBottom: 12,
  },
  inviteBtn: {
    backgroundColor: '#00F8FF',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  inviteBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inviteImage: {
    position: 'absolute',
    right: -10,
    bottom: -15,
    width: 170,
    height: 120,
    zIndex: 1,
  },
  // Bottom Navigation Bar
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#F0F2F5',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    width: 22,
    height: 22,
    opacity: 0.65,
  },
  tabIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: '#747688',
    marginTop: 3,
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  centerButtonWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCenterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4658FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -28,
    elevation: 8,
    shadowColor: '#4658FB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  plusSquareIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Drawer Overlay & Container
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 998,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerScrollView: {
    flex: 1,
  },
  drawerContent: {
    paddingTop: Platform.OS === 'ios' ? 56 : (StatusBar.currentHeight || 24) + 20,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  drawerHeader: {
    marginBottom: 28,
  },
  drawerAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginBottom: 12,
  },
  drawerName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#120D26',
  },
  drawerMenuList: {
    marginBottom: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  drawerItemIconWrap: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  drawerItemIcon: {
    width: 22,
    height: 22,
  },
  badgeOrange: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#FF8437',
    borderRadius: 8,
    minWidth: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeOrangeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#120D26',
    fontWeight: '500',
  },
  drawerFooter: {
    marginTop: 10,
  },
  upgradeProBtn: {
    backgroundColor: '#E0FFFD',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  upgradeCrownIcon: {
    marginRight: 10,
  },
  upgradeProText: {
    color: '#00F8FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;
