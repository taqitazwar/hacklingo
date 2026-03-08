import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, CourseSection, Lesson, LessonStatus } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import { useProgressStore } from '../../store';
import pythonLanguage from '../../data/curriculum/python';
import SectionHeader from './components/SectionHeader';
import LevelNode from './components/LevelNode';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;
interface Props { navigation: HomeNavigationProp; }

/** Zigzag offsets create the winding Duolingo path */
const ZIGZAG_OFFSETS = [20, 65, 100, 65, 20, -25, -70, -70, -25, 20];

type FlatListItem =
  | { itemType: 'sectionHeader'; section: CourseSection }
  | { itemType: 'lesson'; lesson: Lesson; section: CourseSection; nodeIndex: number };

const buildFlatListData = (sections: CourseSection[]): FlatListItem[] => {
  const items: FlatListItem[] = [];
  for (const section of sections) {
    items.push({ itemType: 'sectionHeader', section });
    section.lessons.forEach((lesson, index) => {
      items.push({ itemType: 'lesson', lesson, section, nodeIndex: index });
    });
  }
  return items;
};

interface TopBarStatProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  value: string | number;
  color: string;
}
const TopBarStat: React.FC<TopBarStatProps> = ({ icon, value, color }) => (
  <View style={styles.statChip}>
    <Ionicons name={icon} size={15} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
  </View>
);

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { totalXp, currentStreak, hearts, getLessonStatus, completedLessons } = useProgressStore();

  const handleLessonPress = useCallback(
    (lesson: Lesson, section: CourseSection) => {
      navigation.navigate('Lesson', {
        lesson,
        sectionTitle: section.title,
        accentColor: section.accentColor,
      });
    },
    [navigation]
  );

  const getSectionCompletedCount = (section: CourseSection) =>
    section.lessons.filter(l => !!completedLessons[l.id]).length;

  const getCurrentLessonId = () => {
    for (const section of pythonLanguage.sections) {
      for (const lesson of section.lessons) {
        if (getLessonStatus(lesson.id) === 'available') return lesson.id;
      }
    }
    return null;
  };

  const currentLessonId = getCurrentLessonId();
  const flatListData = buildFlatListData(pythonLanguage.sections);

  const renderItem = ({ item }: { item: FlatListItem }) => {
    if (item.itemType === 'sectionHeader') {
      return (
        <SectionHeader
          section={item.section}
          completedCount={getSectionCompletedCount(item.section)}
          totalCount={item.section.lessons.length}
        />
      );
    }
    const { lesson, section, nodeIndex } = item;
    const status: LessonStatus = getLessonStatus(lesson.id);
    const offsetX = ZIGZAG_OFFSETS[nodeIndex % ZIGZAG_OFFSETS.length];

    return (
      <View style={styles.nodeRow}>
        <LevelNode
          lesson={lesson}
          status={status}
          sectionId={section.id}
          accentColor={section.accentColor}
          offsetX={offsetX}
          isCurrentLesson={lesson.id === currentLessonId}
          onPress={() => handleLessonPress(lesson, section)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>hacklingo</Text>
        <View style={styles.statsRow}>
          <TopBarStat icon="flame"  value={currentStreak} color={Colors.orange} />
          <TopBarStat icon="flash"  value={totalXp}       color={Colors.yellow} />
          <TopBarStat icon="heart"  value={hearts}        color={Colors.red}    />
        </View>
      </View>

      <FlatList
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={(item) => {
          if (item.itemType === 'sectionHeader') return `sec-${item.section.id}`;
          return `les-${item.lesson.id}`;
        }}
        contentContainerStyle={[styles.listContent, { backgroundColor: Colors.backgroundSecondary }]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  appName: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.brandRed,
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusFull,
  },
  statValue: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.sm,
  },
  listContent: {
    paddingBottom: Spacing.section,
  },
  nodeRow: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
});

export default HomeScreen;
